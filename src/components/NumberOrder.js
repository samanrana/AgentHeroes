import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {card, Card, withTheme} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import i18n from '../../src/i18n/i18n';

const NumberOrders = ({text,colorIcon,lastCard,IconName,metaData,IconType,theme,item,navigation}) => {
  const {colors,fonts}= theme;

  return (
      <View style={{flex:1}}>
           <TouchableOpacity onPress={()=>{navigation.navigate("ViewPreviousOrder",
           {customerLng:item.customer_lng,
           customerLat:item.customer_lat,
           shopLat:item.shop_lat,shopLng:item.shop_lng,
           shop_name:item.shop_name,
           customer_address:item.customer_address,
           shop_address:item.shop_address,
           customer_name:item.customer.name,
           customer_email:item.customer.email,
           created_at:item.customer.created_at,
           cart:item.cart,
          
          })}}>
           <Card  style={{backgroundColor:colors.cards,elevation:10,margin:hp("2"),borderRadius:10}}>
           <Text
                style={{
                fontSize: wp('4.5'),
                width: wp('70'),
                // fontWeight: 'bold',
                color: colors.primary,
                marginHorizontal:wp("4%"),
                marginVertical:hp("1%"),
                fontFamily:fonts.regular.fontFamily

                }}>
                {i18n.t('from')}
            </Text>

            <Text
                style={{
                fontSize: wp('4'),
                width: wp('70'),
                color: colors.text,
                marginHorizontal:wp("4%"),
                marginVertical:hp("1%"),
                fontFamily:fonts.regular.fontFamily
                }}>
                {item.shop_name}
            </Text>
           
            <Text
                style={{
                fontSize: wp('3'),
                width: wp('70'),
                color: colors.text,
                marginHorizontal:wp("4%"),
                fontFamily:fonts.regular.fontFamily
                }}>
                {item.shop_address}
            </Text>
            <View style={{borderBottomWidth:0.9,width:hp("43%"),borderColor:colors.background,marginVertical:hp('1'),marginHorizontal:wp('2')}}></View>
           
            <Text
                style={{
                fontSize: wp('4.5'),
                width: wp('70'),
                // fontWeight: 'bold',
                color: colors.primary,
                marginHorizontal:wp("4%"),
                marginVertical:hp("1%"),
                fontFamily:fonts.regular.fontFamily
                }}>
                {i18n.t('to')}
            </Text>
            <Text
                style={{
                width: wp('70'),
                fontSize: wp('4%'),
                // fontWeight: 'bold',
                color: colors.text,
                marginHorizontal:wp("4%"),
                marginVertical:hp("1%"),
                fontFamily:fonts.regular.fontFamily
                }}>
                {item.customer.name}
            </Text>
            <Text
                style={{
                fontSize: wp('3%'),
                width: wp('70'),
                color: colors.text,
                marginHorizontal:wp("4%"),
                fontFamily:fonts.regular.fontFamily
                }}>
                {item.customer_address}
            </Text>
            <Text
                style={{
                fontSize: wp('3%'),
                width: wp('70'),
                color: colors.primary,
                marginTop:hp("1%"),
                marginHorizontal:wp("4%"),
                fontFamily:fonts.regular.fontFamily,
                bottom:-7
                }}>
                {item.created_at}
            </Text>
            {/* </Card> */}
            <FontAwesome style={{alignSelf:"flex-end",marginHorizontal:wp("3%"),bottom:hp("2%")}} name="eye" size={20} color={colors.primary}/>
            </Card>
         </TouchableOpacity>
      </View>

  );
};
const styles = StyleSheet.create({
 
  iconstyle: {
    alignSelf: 'center',
  },
});
export default withTheme(withNavigation(NumberOrders));
