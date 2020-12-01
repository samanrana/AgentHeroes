import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import DriverSquareComponent from './DriverSquareComponent';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../i18n/i18n';

const ShopDriverTabbarComponent = ({navigation}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.replace('AllJobs');
        }}>
        <DriverSquareComponent 
        name="car-sport-sharp" 
        text={i18n.t('jobs')}  />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.replace('MyJobs');
        }}>
        <DriverSquareComponent 
        name="md-briefcase-sharp" 
        text={i18n.t('my_jobs')} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.replace('Earnings');
        }}>
        <DriverSquareComponent name="person-circle" text="Earnings" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          AsyncStorage.getAllKeys()
            .then((keys) => AsyncStorage.multiRemove(keys))
            .then(() => {
              console.log('success');
              navigation.replace('Home');
            });
        }}>
        <DriverSquareComponent 
        name="md-log-out-sharp" 
        text={i18n.t('logout')} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({});
export default withNavigation(ShopDriverTabbarComponent);
