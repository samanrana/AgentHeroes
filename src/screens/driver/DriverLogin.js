import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withTheme, TextInput, Card, Button} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import NavbarWithBackButton from '../../components/navbars/NavbarWithBackButton';
import AppContext from '../../context/AppContext';
import AsyncStorage from '@react-native-community/async-storage';
import {AlertMsg} from '../../helpers/MyAlert';
import RNFetchBlob from 'react-native-fetch-blob';
import i18n from '../../i18n/i18n';
import DefaultNavbar from '../../components/navbars/DefaultNavbar';
import messaging from '@react-native-firebase/messaging';
import * as firebase from '../../utils/firebase';

const DriverLogin = ({navigation, theme}) => {
  const {colors, fonts} = theme;
  const [email, setEmail] = useState('driver1@system.com');
  const [password, setPassword] = useState('password');
  const [signinLoading, setSigninLoading] = useState(false);

  const {
    baseUrl,
    storeDriverId,
    storeDriverToken,
    storeDriverEmail,
    storeDriverShopTypeId,
    storeDriverName,
    storeDriverPhone,
    driverId
  } = useContext(AppContext);
  const storeData = async (
    userid,
    asyncEmail,
    phone,
    shop_type_id,
    asyncToken,
    login,
  ) => {
    try {
      await AsyncStorage.setItem('duserid', userid);
      await AsyncStorage.setItem('demail', asyncEmail);
      await AsyncStorage.setItem('dphone', phone);
      await AsyncStorage.setItem('dshop_type_id', shop_type_id);
      await AsyncStorage.setItem('dtoken', asyncToken);
      await AsyncStorage.setItem('dlogin', login);
    } catch (e) {
      // saving error
    }
  };
  const storeSelectedBtn = async (
    asyncHome,
    asyncMyOrders,
    asyncProfile,
    asyncLogout,
  ) => {
    try {
      await AsyncStorage.setItem('Home', asyncHome);
      await AsyncStorage.setItem('MyOrders', asyncMyOrders);
      await AsyncStorage.setItem('Profile', asyncProfile);
      await AsyncStorage.setItem('Logout', asyncLogout);
    } catch (e) {
      // saving error
    }
  };

  const isDriverLogin = async () => {
    try {
      const userIdExists = await AsyncStorage.getItem('duserid');
      const emailExists = await AsyncStorage.getItem('demail');
      const phoneExists = await AsyncStorage.getItem('dphone');
      const drivershopTypeIdExists = await AsyncStorage.getItem(
        'dshop_type_id',
      );
      const tokenExists = await AsyncStorage.getItem('dtoken');
      const loginExists = await AsyncStorage.getItem('dlogin');
      console.log(userIdExists);
      // console.log(emailExists)
      // console.log(drivershopTypeIdExists)

      // console.log(loginExists)

      if (loginExists !== null) {
        if (loginExists == '1') {
          storeDriverId(userIdExists);
          storeDriverEmail(emailExists);
          storeDriverPhone(phoneExists);
          storeDriverShopTypeId(drivershopTypeIdExists);
          storeDriverToken(tokenExists);
          navigation.replace('AllJobs');
        } else {
          console.log('not reached');
        }
      }
    } catch (e) {
      // error reading value
    }
  };

  const driverLogin = (em, ps) => {
    RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/driver/login`,
      {
        Accept: 'Application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'email', data: em + ''},
        {name: 'password', data: ps + ''},
      ],
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.hasOwnProperty('error')) {
          setSigninLoading(false);
          AlertMsg('Oops!', 'You are unauthroized', null);
        } else {
          storeDriverId(response.customer.id);
          storeDriverEmail(response.customer.email);
          storeDriverPhone(response.customer.phone);
          storeDriverShopTypeId(response.customer.shop_type_id);
          storeDriverToken(response.access_token);
          storeDriverName(response.customer.name);

          storeData(
            response.customer.id + '',
            em + '',
            response.customer.phone + '',
            response.customer.shop_type_id + '',
            response.access_token + '',
            '1',
          );
          setSigninLoading(false);
          navigation.replace('AllJobs');
          console.log(response);
        }
      })
      .catch((err) => {
        console.log('hello');
        setSigninLoading(false);
      });
  };
  // const fcmToken = async () => {
  //   const response = await RNFetchBlob.fetch(
  //     'POST', 
  //     `${baseUrl}/api/driver/fcmTokenUpdate`,
  //     {
  //       Authorization: `Bearer ${driverToken}`,
  //       Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     [
  //       {name: 'customer_id', data: driverId + ''},
  //       {name: 'fcm_token', data:  + ''},
  //     ]
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);

  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };


  // // getting firebase token
  // const _checkPermission = async () => {
  //   const enabled = await messaging().hasPermission();
  //   if (enabled) {
  //     const device = await messaging().getToken();
  //     console.log(device);
  //   } else this._getPermission();
  // };

  // const _getPermission = async () => {
  //   messaging()
  //     .requestPermission()
  //     .then(() => {
  //       _checkPermission();
  //     })
  //     .catch((error) => {
  //       // User has rejected permissions
  //     });
  // };

  useEffect(() => {
    isDriverLogin();
    storeSelectedBtn('1', '0', '0', '0', '0');

  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      {/* <NavbarWithBackButton /> */}
      <DefaultNavbar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card
          style={{
            marginHorizontal: wp('4'),
            elevation: 5,
            height: hp('43'),
            width: wp('92'),
            marginTop: hp('15'),
            borderRadius: wp('1'),
            backgroundColor: colors.cards,
          }}>
          <Text
            style={{
              fontSize: hp('5'),
              // fontWeight: 'bold',
              alignSelf: 'center',
              marginVertical: hp('2'),
              color: colors.text,
              fontFamily: fonts.regular.fontFamily,
            }}>
            {i18n.t('driver_login')}
          </Text>
          <TextInput
            onChangeText={(text) => {
              setEmail(text);
            }}
            label={i18n.t('driver_email')}
            mode="outlined"
            value={email}
            style={styles.textinputStyle}
            theme={{
              colors: {text: colors.primary, placeholder: colors.primary},
            }}
          />
          <TextInput
            onChangeText={(pass) => {
              setPassword(pass);
            }}
            label={i18n.t('password')}
            mode="outlined"
            secureTextEntry={true}
            value={password}
            style={styles.textinputStyle}
            theme={{
              colors: {text: colors.primary, placeholder: colors.primary},
            }}
          />
          <Button
            mode="contained"
            loading={signinLoading}
            onPress={() => {
              setSigninLoading(true);
              if (email == '') {
                AlertMsg(
                  `${i18n.t('important')}`,
                  `${i18n.t('email_required')}`,
                  null,
                );
              } else if (password == '') {
                AlertMsg(
                  `${i18n.t('important')}`,
                  `${i18n.t('password_required')}`,
                  null,
                );
              } else {
                driverLogin(email, password);
              }
            }}
            style={{
              marginHorizontal: wp('4'),
              marginVertical: hp('2'),
            }}>
            {' '}
            {i18n.t('login')}{' '}
          </Button>
        </Card>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DriverRegistration');
          }}>
          <Text
            style={{
              color: colors.black,
              textAlign: 'center',
              marginTop: hp('6'),
              color: colors.primary,
              fontFamily: fonts.regular.fontFamily,
            }}>
            {i18n.t('dont_have_acc')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textinputStyle: {
    marginHorizontal: wp('4'),
    marginVertical: hp('1'),
    height: hp('7'),
    fontSize: hp('1.9'),
  },
  buttonStyle: {
    marginHorizontal: wp('4'),
    marginVertical: hp('2'),
  },
});
export default withTheme(withNavigation(DriverLogin));
