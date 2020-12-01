import React, { useEffect, useState } from 'react';
import {TouchableOpacity, View, Text, StyleSheet,ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SquareComponent from './SquareComponent';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../i18n/i18n';
import { withTheme } from 'react-native-paper';

const RestaurantDriversTabbarComponent = ({navigation,theme}) => {
  const {colors} = theme;
  const [btnHome, setBtnHome] = useState('0');
  const [btnMyOrders, setBtnMyOrders] = useState('0');
  const [btnProfile, setBtnProfile] = useState('0');
  const [btnEarnings, setBtnEarnings] = useState('0');
  const [btnLogout, setBtnLogout] = useState('0');

  const storeSelectedBtn= async (
    asyncHome,
    asyncMyOrders,
    asyncEarnings,
    asyncProfile,
    asyncLogout,
  ) => {
    try {
      await AsyncStorage.setItem('Home', asyncHome);
      await AsyncStorage.setItem('MyOrders', asyncMyOrders);
      await AsyncStorage.setItem('Earnings', asyncEarnings);
      await AsyncStorage.setItem('Profile', asyncProfile);
      await AsyncStorage.setItem('Logout', asyncLogout);
    } catch (e) {
      // saving error
    
  };
  }
  const getSelectedBtn = async() => {
 try {
      const Home = await AsyncStorage.getItem('Home');
      const MyOrders = await AsyncStorage.getItem('MyOrders');
      const Earnings = await AsyncStorage.getItem('Earnings');
      const Profile = await AsyncStorage.getItem('Profile');
      const Logout = await AsyncStorage.getItem('Logout');

      if (Home !== null) {
        setBtnHome(Home);
        setBtnMyOrders(MyOrders);
        setBtnEarnings(Earnings);
        setBtnProfile(Profile);
        setBtnLogout(Logout);

      }
    } catch (e) {
      // error reading value
    }
  }

  useEffect(()=>{
  console.log('navbar loaded');
    getSelectedBtn();
  },[]);
 
  return (
    <View style={{flexDirection:'row',backgroundColor:colors.text}}>
      
        <TouchableOpacity onPress={()=>{
       
       storeSelectedBtn('1','0','0','0','0');
       navigation.replace('AllJobs')

        }}>
          {btnHome=='0' ? 
          <SquareComponent name="home" text="Home" iconcolor= '#d3d3d3' textcolor='#d3d3d3'/>:
          <SquareComponent name="home" text="Home" iconcolor= '#253938' textcolor='#253938'/>} 
          </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
       storeSelectedBtn('0','1','0','0','0');
       navigation.replace('NumberOfJobs')
      }}>
          {btnMyOrders=='0' ? 
          <SquareComponent name="md-briefcase-sharp" text="Home" iconcolor= '#d3d3d3' textcolor='#d3d3d3'/>:
          <SquareComponent name="md-briefcase-sharp" text="Home" iconcolor= '#253938' textcolor='#253938'/>} 
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          storeSelectedBtn('0','0','1','0','0');
          navigation.replace('Earning')
        }}>
        {btnEarnings=='0' ? 
          <SquareComponent name="cash" text="Home" iconcolor= '#d3d3d3' textcolor='#d3d3d3'/>:
          <SquareComponent name="cash" text="Home" iconcolor= '#253938' textcolor='#253938'/>} 
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=>{
          storeSelectedBtn('0','0','0','1','0');
          navigation.replace('DriverProfile')
            }}>
        {btnProfile=='0' ? 
          <SquareComponent name="person-circle" text="Home" iconcolor= '#d3d3d3' textcolor='#d3d3d3'/>:
          <SquareComponent name="person-circle" text="Home" iconcolor= '#253938' textcolor='#253938'/>} 
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            .then(() => {
              console.log('success');
              storeSelectedBtn('0','0','0','0','1');
              navigation.replace('DriverLogin');
             });
        }}>
        <SquareComponent 
        name="md-log-out-sharp" 
        text={i18n.t('logout')}
        iconcolor='#d3d3d3'/>
        </TouchableOpacity>
    
    </View>
  );
};
const styles = StyleSheet.create({});
export default withTheme( withNavigation(RestaurantDriversTabbarComponent));

