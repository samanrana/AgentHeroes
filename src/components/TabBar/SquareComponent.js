import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {card, Card, withTheme} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RestaurantDriversTabbarComponent from './RestaurantDriversTababarComponent';
import {withNavigation} from 'react-navigation';

const SquareComponent = ({name,text,iconcolor,theme}) => {
  const {colors} = theme;
  return (
      <View style={{      
        alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
      height: wp('16'),
      width: wp('20'),
    
      }}>
        <Ionicons
          name={name}
          size={wp('7')}
          color={iconcolor}
          style={styles.iconstyle}
        />
        {/* <Text numberOfLines={1} style={{textAlign:'center',fontSize:wp('3'),color:`${colorIcon}`}}>{text}</Text> */}
      </View>

  );
};
const styles = StyleSheet.create({
 
  iconstyle: {
    alignSelf: 'center',
  },
});
export default withTheme(withNavigation(SquareComponent));
