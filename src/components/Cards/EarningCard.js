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
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import Earnings from '../../screens/driver/Earnings';

const EarningCard = ({name,text,colorIcon,lastCard,IconName,metaData,IconType,theme,totalOrders}) => {
  const {colors,fonts}= theme;

  const[ tabColor, setTabColor ] = useState({
    iconcolor:{colorIcon},
    backgroundColor:'white'
})
const [coloricons,setColor] = useState(`${colorIcon}`);
  return (
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
        
        {(IconName=="delivery-dining")?
        <MaterialCommunityIcons
          name="truck-delivery"
          size={wp('9')}
          color={colors.primary}
          style={styles.iconstyle}
        />:
        <MaterialIcons
          name={IconName}
          size={wp('9')}
          color={colors.primary}
          style={styles.iconstyle}
        />
        }
        {/* <MaterialCommunityIcon
          name={IconName}
          size={wp('9')}
          color={coloricons}
          style={styles.iconstyle}
        /> */}
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

  );
};
const styles = StyleSheet.create({
 
  iconstyle: {
    alignSelf: 'center',
  },
});
export default withTheme(withNavigation(EarningCard));
