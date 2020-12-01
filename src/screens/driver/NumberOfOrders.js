import React, { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity,FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ActivityIndicator, card, Card, withTheme} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import NumberOrder from '../../components/NumberOrder';
import DefaultNavbar from '../../components/navbars/DefaultNavbar';
import NavbarWithBackButton from '../../components/navbars/NavbarWithBackButton';
import AppContext from '../../context/AppContext';
import RNFetchBlob from 'react-native-fetch-blob';
import PreviousOrders from '../../components/Cards/PreviousOrders';
import i18n from '../../i18n/i18n';

const NumberOfOrders = ({name,text,colorIcon,lastCard,IconName,metaData,IconType,theme}) => {
  const {colors, fonts}= theme;

const [orders,setOrder] = useState([]);
const [totalOrders,setTotalOrder] = useState(0);
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
        // console.log(response.orders);
        setOrder(response.orders);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Orders();
    // getShopDistance();
    // getShopToCustomerDistance();
  }, []);
  return (
      <View style={{flex:1,backgroundColor:colors.background}}>
        <NavbarWithBackButton/>
        <Text
                  style={{
                  alignSelf: 'center',
                  marginVertical: hp('2'),
                  fontSize: wp('10'),
                  // fontWeight: 'bold',
                  color:colors.primary,
                  fontFamily:fonts.regular.fontFamily

                   }}>
                     {i18n.t('previousOrders')}
              </Text>
               <FlatList
                    // showsVerticalScrollIndicator={false}
                    data={orders}
                    renderItem={({item}) => {
                      console.log(item.cart[0]);
                        return (<NumberOrder item={item}/>);
                    }}
                    />          
             </View>

        


  );
};
const styles = StyleSheet.create({
 
  iconstyle: {
    alignSelf: 'center',
  },
});
export default withTheme(withNavigation(NumberOfOrders));
