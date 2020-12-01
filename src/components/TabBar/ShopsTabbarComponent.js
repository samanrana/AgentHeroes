import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet,ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SquareComponent from './SquareComponent';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../i18n/i18n';

const ShopsTabbarComponent = ({navigation}) => {

  return (
    <View>
      <ScrollView 
      horizontal={true} 
      showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={()=>{
          navigation.replace('ShopsDashboard')}}>
        <SquareComponent 
        name="home" 
        text={i18n.t('home')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          navigation.replace('AddEmployee')}}>
        <SquareComponent 
        name="person-add" 
        text={i18n.t('add_employee')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          navigation.replace('ViewEmployee')}}>
        <SquareComponent 
        name="person" 
        text={i18n.t('view_employee')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          navigation.replace('ShopProfile')}}>
        <SquareComponent 
        name="person-circle" 
        text={i18n.t('profile')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            .then(() => {
              console.log('success');
              navigation.replace('Home');
             });
        }}>
        <SquareComponent 
        name="md-log-out-sharp" 
        text={i18n.t('logout')}/>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({});
export default withNavigation(ShopsTabbarComponent);

