import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Card, withTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppContext from '../../context/AppContext';

const ViewOrder = ({theme,item}) => {
    const {colors,fonts}= theme;
  const {baseUrl, token, userid} = useContext(AppContext);

  
  return (
      <View >
    <View
    style={{
   
      marginVertical: hp("1%"),
      marginHorizontal: wp('4'),
      flexDirection: 'row',
      alignItems:'center'
    }}>
    {item.item_picture !== null ? (
      <Image
        style={{
          height: wp('10'),
          width: wp('10'),
          borderRadius: wp('50'),
          marginHorizontal:hp("1%")
        }}
        source={{uri: `${baseUrl}/storage/${item.item_picture}`}}
      />
    ) : (
      <MaterialCommunityIcons name="cart" size={wp('6')} color={colors.priary} />
    )}
    <Text
      style={{
        marginHorizontal: wp('2'),
        color:colors.text,
        fontFamily:fonts.regular.fontFamily
      }}>
      {item.item}
    </Text>
    
    
  </View>
 

  <View style={{alignSelf:"flex-end", marginHorizontal: wp('4')}}>
              
  <Text
      style={{
        marginHorizontal: wp('2'),
        marginVertical:hp('1'),
        color:colors.primary,
        fontSize:hp("1.3%"),
        fontFamily:fonts.regular.fontFamily
      }}>
      {item.created_at}
    </Text>
    </View>
    <View style={{borderBottomWidth:0.9,width:hp("43%"),borderColor:colors.background,marginVertical:hp('1'),marginHorizontal:wp('7')}}></View>
  
  </View>
  );
};

export default withTheme(ViewOrder);
