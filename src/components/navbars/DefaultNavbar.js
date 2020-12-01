import React from 'react';
import {Text, Platform, View} from 'react-native';
import {Appbar, withTheme} from 'react-native-paper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const DefaultNavbar = ({name,theme}) => {
  const {colors, fonts} = theme;
  return Platform.OS == 'ios' ? (
    <View style={{height: hp('10'), justifyContent: 'center',alignItems:'center',backgroundColor:colors.backgroundColor}}>
      <Text
        style={{
          color: colors.text,
          marginTop: 30,
          fontFamily:fonts.regular.fontFamily,
          fontSize: 14,
        }}>
        Heroes - Agent
      </Text>
    </View>
  ) : (
    <View style={{justifyContent: 'center',alignItems:'center',backgroundColor:colors.background}}>
      <Text
        style={{
          color: colors.text,
          marginTop: 30,
          fontFamily:fonts.regular.fontFamily,
          fontSize: 14,
        }}>
        Heroes - Agent
      </Text>
    </View>
  );
};

export default withTheme( DefaultNavbar);
