import * as React from 'react';
import {Appbar, withTheme} from 'react-native-paper';
import {Platform, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {withNavigation} from 'react-navigation';
const NavbarWithBackButton = ({theme, navigation}) => {
  const {colors,fonts} = theme;
  const height = Platform.OS == 'ios' ? 100 : 70;
  return (
    <View
      style={{
        backgroundColor: colors.background,
        height: height,
        paddingTop: 30,
      }}>
      <TouchableOpacity
        style={{marginLeft: 15}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="arrow-left-box" size={32} color={colors.primary} solid />
        {/* <FontAwesome name="menu" size={22} color={colors.white} /> */}
      </TouchableOpacity>
    </View>
  );
};

export default withTheme(withNavigation(NavbarWithBackButton));
