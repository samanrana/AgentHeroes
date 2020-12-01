import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View,Animated, Easing,} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Card, withTheme} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';

const CircleComponent = ({name, text, iconcolor, theme, textcolor}) => {
  const {colors,fonts} = theme;

  return (
    <View style={styles.iconcontainer}>

        {/* <Animated.View style={animatedStyles} > */}

       <Ionicons
        name={name}
        size={wp('7')}
        color={iconcolor}
        style={styles.iconstyle}
      /> 
      {/* </Animated.View> */}
      {/* <Text style={{alignSelf: 'center', fontSize: wp('3'), color: `${textcolor}`,fontFamily:fonts.regular.fontFamily}}>{text}</Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  iconcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6D4AF',
    borderRadius:wp('50'),
    height: wp('15'),
    width: wp('15'),
    position:'relative',
    bottom:10,
    elevation:4,
    marginHorizontal:wp('3'),
  },
  iconstyle: {
    alignSelf: 'center',
  },
});
export default withTheme( withNavigation(CircleComponent));
