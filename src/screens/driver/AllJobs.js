import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import RestaurantDriversTabbarComponent from '../../components/TabBar/RestaurantDriversTababarComponent';
import DefaultNavbar from '../../components/navbars/DefaultNavbar';
import JobsList from './JobsList';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNFetchBlob from 'react-native-fetch-blob';
import AppContext from '../../context/AppContext';
import ShopDriversTabbarComponent from '../../components/TabBar/ShopDriversTabbarComponent';
import {withTheme} from 'react-native-paper';
import i18n from '../../i18n/i18n';
import messaging from '@react-native-firebase/messaging';
import * as firebase from '../../utils/firebase';


const AllJobs = ({theme}) => {
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const {colors, fonts} = theme;

  const {
    baseUrl,
    storeShopShopTypeId,
    storeDriverToken,
    driverId,
    driverToken,
    driverShopTypeId,
  } = useContext(AppContext);
  const [allJobs, setAllJobs] = useState([]);
  const Jobs = async () => {
    console.log(driverShopTypeId);
    const response = await RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/driver/alljobs`,
      {
        Authorization: `Bearer ${driverToken}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [{name: 'shop_type_id', data: driverShopTypeId + ''}],
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        setAllJobs(response.alljobs);
        setIsLoadingJobs(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fcmTokenUpdate = async (fcmToken) => {
      console.log(`TOKEN : ${fcmToken}`);
    const response = await RNFetchBlob.fetch(
      'POST', 
      `${baseUrl}/api/driver/fcmTokenUpdate`,
      {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'driver_id', data: driverId + ''},
        {name: 'fcm_token', data:  fcmToken+ ''},
      ]
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

      })
      .catch((error) => {
        console.log(error);
      });
  };


  // getting firebase token
  const _checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      const devicee = await messaging().getToken();
      console.log(devicee);
      fcmTokenUpdate(devicee);
      
    } else this._getPermission();
  };

  const _getPermission = async () => {
    messaging()
      .requestPermission()
      .then(() => {
        _checkPermission();
      })
      .catch((error) => {
        // User has rejected permissions
      });
  };


  useEffect(() => {
    _getPermission();
    Jobs();
    setIsLoadingJobs(true);
    
  
  }, []);
  return (
      <View style={{flex: 1, backgroundColor:colors.background}}>
        <DefaultNavbar />
        <ScrollView showsVerticalScrollIndicator={false}>

        {isLoadingJobs ? (
          <ActivityIndicator
            color={colors.primary}
            style={{marginTop: hp('3%')}}
          />
        ) : null}
        {allJobs.length != 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginTop: hp('1')}}
            data={allJobs}
            renderItem={({item}) => {
              return (
                <JobsList
                  item={item}
                  alljob={1}
                  refresh={() => {
                    Jobs();
                  }}
                />
              );
            }}
          />
        ) : (
          <Text
            style={{
              alignSelf: 'center',
              marginTop: hp('2'),
              color: colors.text,
              fontFamily:fonts.regular.fontFamily
            }}>
            {i18n.t('NoJobsToDisplay')}
          </Text>
        )}
      </ScrollView>
      
        {/* {driverShopTypeId == 1 ? ( */}
          <RestaurantDriversTabbarComponent />
        {/* ) : (
          <ShopDriversTabbarComponent />
        )} */}
    
    </View>
  );
};

export default withTheme(AllJobs);
