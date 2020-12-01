import React, { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity,FlatList} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
import Geolocation from '@react-native-community/geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const PreviousOrders = ({
  text,
  colorIcon,
  lastCard,IconName,
  metaData,IconType,
  theme,
  shop_name,
  shop_address,
  customer_address,
  customer_name,
  customer_email,
  created_at,
  cart
  // customer_address
}) => {
  const {colors,fonts}= theme;

const {
    baseUrl,
    storeShopShopTypeId,
    storeDriverToken,
    driverId,
    driverToken,
    driverShopTypeId,
  } = useContext(AppContext);
  const [position_lat,setPosition_Lat] = useState("");
  const [position_Long,setPosition_Long] = useState("");

  Geolocation.getCurrentPosition( 
            (position) => { 
                setPosition_Lat(position.coords.latitude);
                setPosition_Long(position.coords.longitude); 
                }, ); 
 



  return (
       <Card style={{marginVertical:hp("2%"),backgroundColor:colors.cards,elevation:wp('2'),width:wp('92'),marginHorizontal:wp('4'),borderRadius:hp('1')}}>
              
               <Text
                style={{
                fontSize: wp('5%'),
                color: colors.text,
                margin:hp("1%"),
                alignSelf:"center",
                marginTop:hp("2%"),
                fontFamily:fonts.regular.fontFamily

                }}>{shop_name}
                </Text>

                {/* <Text
                style={{
                fontSize: wp('5%'),
                // width: wp('70'),
                fontWeight: 'bold',
                color: colors.purple,
                margin:hp("1%"),
                alignSelf:"center",
                marginTop:hp("2%")
                }}>
                {item_names}
                </Text> */}

               {/* <View style={{flexDirection:"row"}}> */}
               {/* <FontAwesome name="shopping-cart" size={hp("3%")} color={colors.purple}/> */}
                 

                <View style={{flexDirection:"row",marginHorizontal:hp("2"),alignItems:'center'}}>
                <FontAwesome name="user-circle-o" size={hp("2.2%")} color={colors.primary}/>
                <Text
                style={{
                fontSize: wp('4'),
                width: wp('70'),
                color: colors.text,
                marginHorizontal:hp("1.5%"),
                fontFamily:fonts.regular.fontFamily

                }}>{customer_name}
                </Text> 
                </View>
               
               <View style={{flexDirection:"row",marginHorizontal:hp("2"),alignItems:'center',marginBottom:hp('2')}}>
               <MaterialCommunityIcons size={hp("2.2%")} name="email" color={colors.primary}/>
               <Text
                style={{
                fontSize: wp('4'),
                width: wp('70'),
                color: colors.text,
                marginHorizontal:hp("1.5%"),
                fontFamily:fonts.regular.fontFamily,
                

                }}>{customer_email}
                </Text>
               </View>
               {/* <FlatList
                    data={cart}
                    renderItem={({item}) => {
                      console.log(item);
                    return (<Text
                      style={{
                      fontSize: wp('4%'),
                      // width: wp('70'),
                      color: colors.text,
                      marginHorizontal:hp("5%"),
                      // alignSelf:"center",
                      marginTop:hp("2%"),
                      fontFamily:fonts.regular.fontFamily

                      }}>{item.item}</Text>);
                    }}
                    />
               
               <Text
                style={{
                fontSize: wp('2.5'),
                // width: wp('70'),
                color: colors.primary,
                marginHorizontal:hp("1.5%"),
                alignSelf:"flex-end",
                // justifyContent:"center",
                flexDirection:"row",
                fontFamily:fonts.regular.fontFamily,
                marginBottom:hp('1')
                // marginRight:hp("10%")
                //  alignItems:"flex-end"
                }}>{created_at}
                </Text>
                 */}
                </Card>

  );
};
const styles = StyleSheet.create({
 
  iconstyle: {
    alignSelf: 'center',
  },
});
export default withTheme(withNavigation(PreviousOrders));
