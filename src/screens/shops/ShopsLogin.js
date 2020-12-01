import React, {useState, useContext,useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput, Card, Button} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import NavbarWithBackButton from '../../components/navbars/NavbarWithBackButton';
import AppContext from '../../context/AppContext';
import AsyncStorage from '@react-native-community/async-storage';
import {AlertMsg} from '../../helpers/MyAlert';
import RNFetchBlob from 'react-native-fetch-blob';
import i18n from '../../i18n/i18n';


const ShopLogin = ({navigation, theme}) => {
  const colors = {theme};
  const [email, setEmail] = useState('shop1@system.com');
  const [password, setPassword] = useState('password');
  const [signinLoading, setSigninLoading] = useState(false);
  const {baseUrl,
    storeShopId,
    storeShopToken,
    storeShopEmail,
    storeShopAvatar,
    storeShopShopTypeId,
    storeShopCr,
    storeShopName} = useContext(AppContext);
  const storeData = async (
    userid,
    asyncEmail,
    shop_type_id,
    asyncToken,
    login,
    
  ) => {
    try {
      await AsyncStorage.setItem('suserid', userid);
      await AsyncStorage.setItem('semail', asyncEmail);
      await AsyncStorage.setItem('shop_type_id', shop_type_id);
      await AsyncStorage.setItem('stoken', asyncToken);
      await AsyncStorage.setItem('slogin', login);
    } catch (e) {
      // saving error
    }
  };
  const isShopLogin = async () => {
    try {
      const userIdExists = await AsyncStorage.getItem('suserid');
      const emailExists = await AsyncStorage.getItem('semail');
      const shopTypeIdExists = await AsyncStorage.getItem('shop_type_id');      
      const tokenExists = await AsyncStorage.getItem('stoken');
      const loginExists = await AsyncStorage.getItem('slogin');
      console.log(userIdExists)
      console.log(emailExists)
      console.log(shopTypeIdExists)
      console.log(tokenExists)
      
      console.log(loginExists)

      if (loginExists !== null) {
        if (loginExists == '1') {
          storeShopId(userIdExists);
          storeShopEmail(emailExists);
          storeShopShopTypeId(shopTypeIdExists);
          storeShopToken(tokenExists);
          navigation.replace('ShopsDashboard');
        } else {
          console.log('not reached');
        }
      }
    } catch (e) {
      // error reading value
    }
  };

 

  const shopLogin = (em, ps) => {
    RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/shop/login`,
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
        console.log(response);
        if (response.hasOwnProperty('error')) {
          setSigninLoading(false);
          AlertMsg(`${i18n.t('oops')}`,`${i18n.t('unauthroized')}` , null);
        } else {
          storeShopId(response.shop.id)
          storeShopEmail(response.shop.email)
          storeShopToken(response.access_token)
          storeShopAvatar(response.shop.avatar)
          storeShopShopTypeId(response.shop.shop_type_id)
          storeShopCr(response.shop.cr)
          storeShopName(response.shop.name)
          storeData(
            response.shop.id + '',
            em+'',
            response.shop.shop_type_id+'',
            response.access_token+'',
            '1',
          );
          setSigninLoading(false);
          navigation.replace('ShopsDashboard');
          
        }
      })
      .catch((err) => {
        console.log(" is my error");
        setSigninLoading(false);
      });
  };

  useEffect(() => {
    isShopLogin();
  }, []);


  return (
    <View style={{flex: 1}}>
      <NavbarWithBackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card
          style={{
            marginHorizontal: wp('4'),
            elevation: wp('2'),
            height: hp('43'),
            width: wp('92'),
            marginTop: hp('15'),
            borderRadius: wp('1'),
          }}>
          <Text
            style={{
              fontSize: hp('5'),
              fontWeight: 'bold',
              alignSelf: 'center',
              marginVertical: hp('2'),
            }}>
            {i18n.t('shop_login')}
          </Text>
          <TextInput
            onChangeText={(text) => {
              setEmail(text);
            }}
            label={i18n.t('shop_email')}
            mode="outlined"
            value={email}
            style={styles.textinputStyle}
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
          />
          <Button
            mode="contained"
            loading={signinLoading}
            onPress={() => {
              setSigninLoading(true);
              if (email == '') {
                AlertMsg(`${i18n.t('important')}`, `${i18n.t('email_required')}`, null);
              } else if (password == '') {
                AlertMsg(`${i18n.t('important')}`, `${i18n.t('password_required')}`, null);
              } else {
                shopLogin(email, password);
              }
            }}
            style={styles.buttonStyle}>
            {' '}
            {i18n.t('login')}{' '}
          </Button>

        </Card>
        
        <TouchableOpacity
            onPress={() => {
              navigation.navigate('ShopsRegistration');
            }}>
            <Text
              style={{color: colors.black, textAlign: 'center', marginTop: hp('6')}}>
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
export default withNavigation(ShopLogin);
