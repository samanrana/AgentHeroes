import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Card, withTheme} from 'react-native-paper';
import RestaurantDriversTabbarComponent from '../../components/TabBar/RestaurantDriversTababarComponent';
import DefaultNavbar from '../../components/navbars/DefaultNavbar';
import RNFetchBlob from 'react-native-fetch-blob';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppContext from '../../context/AppContext';
import ShopDriversTabbarComponent from '../../components/TabBar/ShopDriversTabbarComponent';
import EarningCard from '../../components/Cards/EarningCard';
import i18n from '../../i18n/i18n';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';

const Earnings = ({theme, navigation}) => {
  const {colors, fonts} = theme;
  const [isLoadingEarnings, setIsLoadingEarnings] = useState(false);
  const [allJobs, setAllJobs] = useState('');
  const [orders, setOrder] = useState([]);
  const [totalOrders, setTotalOrder] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalReview, setTotalReview] = useState(0);

  const {
    baseUrl,
    storeShopShopTypeId,
    storeDriverToken,
    driverId,
    driverToken,
    driverShopTypeId,
  } = useContext(AppContext);

  const Orders = async () => {
    const response = await RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/driver/mycompletedjobs`,
      {
        Authorization: `Bearer ${driverToken}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [{name: 'driver_id', data: driverId + ''}],
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.total_rders);
        setTotalOrder(response.total_orders);
        setIsLoadingEarnings(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Delivery = async () => {
    const response = await RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/driver/myearnedrevenue`,
      {
        Authorization: `Bearer ${driverToken}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [{name: 'driver_id', data: driverId + ''}],
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.myrevenue);
        setTotalRevenue(response.myrevenue);
        setIsLoadingEarnings(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Reviews = async () => {
    const response = await RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/driver/myrating`,
      {
        Authorization: `Bearer ${driverToken}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [{name: 'driver_id', data: driverId + ''}],
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.totalrating);
        setTotalReview(response.totalrating);
        setIsLoadingEarnings(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Orders();
    Delivery();
    Reviews();
    setIsLoadingEarnings(true);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <DefaultNavbar />

      <ScrollView>
        {isLoadingEarnings ? (
          <ActivityIndicator
            color={colors.primary}
            style={{marginTop: hp('3%')}}
          />
        ) : null}
        {/* <EarningCard text={`${i18n.t('accountbalance')}`}IconName= 'account-balance-wallet'  metaData="10.7 SAR"     colorIcon="#FFBB00"/> */}
        <EarningCard
          text={`${i18n.t('totalDeliveryRevenue')}`}
          IconName="delivery-dining"
          totalOrders={totalRevenue}
          colorIcon="#FFBB00"
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NumberOfOrders');
          }}>
          <EarningCard
            text={`${i18n.t('numberOfOrders')}`}
            totalOrders={totalOrders}
            IconName="directions-car"
            metaData="27 Orders"
            colorIcon="#FFBB00"
          />
        </TouchableOpacity>
        {/* <EarningCard
          text={`${i18n.t('serviceReviews')}`}
          totalOrders={totalReview}
          IconName="star"
          metaData="2"
          colorIcon="#FFBB00"
        /> */}
      </ScrollView>
      {driverShopTypeId == 1 ? (
        <RestaurantDriversTabbarComponent />
      ) : (
        <ShopDriversTabbarComponent />
      )}
    </View>
  );
};

export default withNavigation(withTheme(Earnings));
