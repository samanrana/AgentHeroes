import React,{useContext,useEffect,useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet,ScrollView} from 'react-native';
import {Card, TextInput, Button} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import DefaultNavbar from '../../components/navbars/DefaultNavbar';
import ShopsTabbarComponent from '../../components/TabBar/ShopsTabbarComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import {AlertMsg} from '../../helpers/MyAlert';
import AppContext from '../../context/AppContext';
import {Select, Option} from 'react-native-select-lists';
import i18n from '../../i18n/i18n';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ShopProfile = ({navigation}) => {
  const {baseUrl,
        shopid,
      shopToken} = useContext(AppContext);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  const [updateBtnText, setUpdateBtnText] = useState(`${i18n.t('update')}`);

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
  const ShopProfile = () => {
    RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/shop/profile/show`,
      {
        Authorization : `Bearer ${shopToken}`,
        Accept: 'Application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'shop_id', data: shopid + ''}
      ],
    )
      
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setName(resp.shop.name);
        setEmail(resp.shop.email)
        setPassword(resp.shop.password)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ShopProfileUpdate = () => {
    RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/shop/profile/update`,
      {
        Authorization : `Bearer ${shopToken}`,
        Accept: 'Application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'shop_id', data: shopid + ''},
        {name: 'name', data: name + ''},
        {name: 'email', data: email + ''},
        {name: 'password', data: password + ''},
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
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        // if (resp.success) {
          AlertMsg('Congrats!', 'Profile Updated Successfully', null);
        // } else {
          // AlertMsg('Oops!', 'Profile not Updated', null);
        // }
        setUpdateLoading(false);
        setUpdateBtnText('Updated')
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
     ShopProfile();
    
  }, []);

  return (
    <View style={{flex:2}}>
    <View style={{flex:1}}>
      <DefaultNavbar/>
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
            {i18n.t('profile')}
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
            loading={updateLoading}
            onPress={() => {
              setUpdateLoading(true);
              ShopProfileUpdate();
              }}
            style={styles.buttonStyle}>
            {updateBtnText}
          </Button>
        </Card>
      </ScrollView>
   
                  </View>
                  <ShopsTabbarComponent/>
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
export default withNavigation(ShopProfile);

