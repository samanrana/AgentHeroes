import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {card, Card, withTheme} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import RestaurantDriversTabbarComponent from './RestaurantDriversTababarComponent';
import {withNavigation} from 'react-navigation';

const NumberOfOrdersCard = ({navigation,theme,IconName,text,totalOrders}) => {
    const {colors,fonts} = theme;
    return(
        <View style={{    
            alignItems: 'center',
            justifyContent:'center',
            backgroundColor:colors.cards,
            height: hp('20'),
            // width: wp('45'),
            marginHorizontal:wp('4'),
            borderRadius:hp("1%"),
            elevation:10,
            marginBottom:hp('3'),
            marginTop:hp('3')
            
          }}>
            
            <MaterialCommunityIcons
              name={IconName}
              size={wp('9')}
              color={colors.primary}
              style={{alignSelf:'center'}}
            />

            <Text numberOfLines={1} 
                style={{textAlign:'center',
                      fontSize:wp('4'),
                      color:colors.primary,
                      fontFamily:fonts.regular.fontFamily,
                      marginVertical:hp('1')}}>
              {text}
              </Text>
          <Text style={{textAlign:'center',fontSize:wp('3'),color:colors.text}}>{totalOrders}</Text>
          </View>
    
    )
}
export default withTheme(withNavigation(NumberOfOrdersCard));