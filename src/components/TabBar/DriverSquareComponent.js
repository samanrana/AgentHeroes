import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';

const DriverSquareComponent = ({name, text}) => {
  const [tabColor, setTabColor] = useState({
    iconcolor: '#1B1B1B',
    backgroundColor: '#FFFFFFFF',
  });
  return (
    <Card
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFFFF',
        height: wp('20'),
        width: wp('25'),
      }}>
      <Ionicons
        name={name}
        size={wp('7')}
        color={tabColor.iconcolor}
        style={styles.iconstyle}
      />
      <Text style={{alignSelf: 'center', fontSize: wp('3')}}>{text}</Text>
    </Card>
  );
};
const styles = StyleSheet.create({
  iconcontainer: {
    height: wp('16'),
    width: wp('20'),
    // borderColor:'#D3D3D3',
    // borderTopWidth:wp('0.2'),
    // borderLeftWidth:wp('0.2'),
    backgroundColor: '#FFFFFFFF',
    // borderRadius:hp('9%'),
    // marginHorizontal: wp('1'),
    // marginVertical: hp('1'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconstyle: {
    alignSelf: 'center',
  },
});
export default withNavigation(DriverSquareComponent);
