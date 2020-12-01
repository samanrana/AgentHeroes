import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Card, TextInput, Button} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import NavbarWithBackButton from '../../components/navbars/NavbarWithBackButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import {AlertMsg} from '../../helpers/MyAlert';
import AppContext from '../../context/AppContext';
import {Select, Option} from 'react-native-select-lists';
import i18n from '../../i18n/i18n';

const ShopRegistration = ({navigation, theme}) => {
  // const {colors} = theme;
  const {baseUrl} = useContext(AppContext);
  const [signupLoading, setSignupLoading] = useState(false);
  const [name, setName] = useState('Shop');
  const [email, setEmail] = useState('Shop@system.com');
  const [password, setPassword] = useState('password');
  const [shopType, setShopType] = useState(0);
  const [txtShopImage, setTextShopimage] = useState(`${i18n.t('upload_shop_image')}`);
  const [ShopImagePath, setShopImagePath] = useState('');

  const [txtShopCrImage, setTextShopCrImage] = useState(
    `${i18n.t('upload_cr_letter')}`
  );
  const [ShopCrPath, setShopCrPath] = useState('');

  const [imagesType, setImagesTypes] = useState('');
  const [imagesName, setImagesName] = useState('');
  const [allShopTypes, setAllShopTypes] = useState([{id: 0, value: ''}]);
  const [registerBtnText, setRegisterBtnText] = useState(`${i18n.t('register')}`);

  const options = {
    title: 'Select',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const getShopImagePath = (imagePath) => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setTextShopimage(`${i18n.t('shop_image_selected')}`);
        if (Platform.OS === 'ios') {
          setShopImagePath(response.uri.replace('file://', ''));
        } else {
          setShopImagePath(response.path);
        }
        setImagesTypes(response.type);
        setImagesName(response.fileName);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  const getShopCrPath = (imagePath) => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setTextShopCrImage(`${i18n.t('cr_selected')}`);
        if (Platform.OS === 'ios') {
          setShopCrPath(response.uri.replace('file://', ''));
        } else {
          setShopCrPath(response.path);
        }

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  const ShopSignup = () => {
    RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/shop/register`,
      {
        Accept: 'Application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'name', data: name + ''},
        {name: 'email', data: email + ''},
        {name: 'password', data: password + ''},
        {name: 'shop_type_id', data: shopType + ''},
        {
          name: 'avatar',
          filename: imagesName + 'ShopImage',
          type: imagesType,
          data: RNFetchBlob.wrap(ShopImagePath),
        },
        {
          name: 'cr',
          filename: imagesName + 'Cr',
          type: imagesType,
          data: RNFetchBlob.wrap(ShopCrPath),
        },
      ],
    )
      .uploadProgress((written, total) => {
        console.log('uploaded ' + (written / total).toFixed(1));
        setRegisterBtnText(
          `${i18n.t('registration')} ${(written / total).toFixed(1) * 100} %`,
        );
      })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        if (resp.hasOwnProperty('reg')) {
          if (resp.reg === 'yes') {
            AlertMsg(`${i18n.t('congrats')}`, `${i18n.t('registered_and_under_review')}`);
          } else {
            AlertMsg(`${i18n.t('oops')}`, `${i18n.t('not_registered')}`);
          }
        }
        setSignupLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSignupLoading(false);
      });
  };

  const getShopTypes = () => {
    RNFetchBlob.fetch('GET', `${baseUrl}/api/shop_types`, {
      Accept: 'Application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setAllShopTypes(resp.shop_types);
      })
      .catch((err) => {
        console.log(err);
        setSignupLoading(false);
      });
  };

  useEffect(() => {
    getShopTypes();
  }, []);

  return (
    <View style={{flex: 1}}>
      <NavbarWithBackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card
          style={{
            marginHorizontal: wp('4'),
            marginVertical: hp('6'),
            elevation: wp('2'),
          }}>
          <Text
            style={{
              fontSize: hp('5'),
              fontWeight: 'bold',
              alignSelf: 'center',
              marginVertical: hp('2'),
            }}>
            {i18n.t('shop_registration')}
          </Text>
          <TextInput
            label={i18n.t('shop_name')}
            mode="outlined"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
            style={styles.textinputStyle}
          />
          <TextInput
            label={i18n.t('shop_email')}
            mode="outlined"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            style={styles.textinputStyle}
          />
          <TextInput
            label={i18n.t('password')}
            mode="outlined"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
            style={styles.textinputStyle}
          />
          <Text style={{marginHorizontal: 18, marginVertical: 5}}>
          {i18n.t('shop_type')}
          </Text>
          <Select
            selectStyle={{
              height: 60,
              marginHorizontal: 18,
              borderWidth: 1,
              borderColor: '#000',
              backgroundColor: '#FFFFFF',
            }}
            onSelect={(value) => {
              setShopType(value);
              console.log(value);
            }}
            caret="down"
            caretColor="#000">
            {allShopTypes.map((item) => {
              if (item.id === 1) {
              } else {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.type}
                  </Option>
                );
              }
            })}
          </Select>

          <TouchableOpacity
            onPress={() => {
              getShopImagePath();
            }}
            style={{marginHorizontal: wp('10'), marginVertical: wp('3')}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="upload"
                size={wp('7')}
                color="#1B1B1B"
              />
              <Text style={{fontWeight: 'bold', marginRight: 10}}>
                {txtShopImage}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              getShopCrPath();
            }}
            style={{marginHorizontal: wp('10'), marginVertical: wp('3')}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="upload"
                size={wp('7')}
                color="#1B1B1B"
              />
              <Text style={{fontWeight: 'bold', marginRight: 10}}>
                {txtShopCrImage}
              </Text>
            </View>
          </TouchableOpacity>
          <Button
            mode="contained"
            loading={signupLoading}
            onPress={() => {
              setSignupLoading(true);
              if (name === '') {
                AlertMsg(`${i18n.t('important')}`, `${i18n.t('name_required')}`, null);
                setSignupLoading(false);
              } else if (email === '') {
                AlertMsg(`${i18n.t('important')}`,`${i18n.t('email_required')}`, null);
                setSignupLoading(false);
              } else if (password === '') {
                AlertMsg(`${i18n.t('important')}`,`${i18n.t('password_required')}`, null);
                setSignupLoading(false);
              } else if (ShopImagePath === '') {
                AlertMsg(`${i18n.t('important')}`, `${i18n.t('shop_image_required')}`, null);
                setSignupLoading(false);
              } else if (ShopCrPath === '') {
                AlertMsg(`${i18n.t('important')}`, `${i18n.t('shop_cr_required')}`, null);
                setSignupLoading(false);
              } else if (shopType === 0) {
                AlertMsg(`${i18n.t('important')}`, `${i18n.t('shop_type')}`, null);
              } else {
                ShopSignup();
              }
            }}
            style={styles.buttonStyle}>
            {registerBtnText}
          </Button>
        </Card>
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
    marginVertical: hp('1'),
  },
});
export default withNavigation(ShopRegistration);
