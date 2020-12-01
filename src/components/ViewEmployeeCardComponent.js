import React,{useState, useContext} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Image
  } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {withTheme, TextInput, Card, Button} from 'react-native-paper';
import {withNavigation} from 'react-navigation';

const ViewEmployeeCardComponent = ({item}) => {
    return(
        <View >
            <Card
            style={{
                height:hp('30'),
                width:wp('47'),
                marginLeft:wp('2'),
                marginVertical:hp('0.6'),
                elevation:wp('1'),
                
            }}>
                <Image 
                style={{height:wp('25'),
                width:wp('25'),
                borderRadius:wp('50'),
                marginVertical:hp('2'),
                alignSelf:'center',
                borderColor:'#1B1B1B',
                borderWidth:wp('0.2')}}
                source={{uri: item.car_image}}/>
                <Text style={{
                    alignSelf:'center',
                    fontWeight:'bold',
                    marginHorizontal:wp('2')

                }}>
                    {item.name}
                </Text>
                <Text style={{
                    alignSelf:'center',
                    color:'grey',
                    marginHorizontal:wp('2'),
                    marginVertical:hp('1')
                }}>
                 {item.email}
                </Text>
            </Card>
        </View>
    )
};

export default ViewEmployeeCardComponent;