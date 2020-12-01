import React,{useState,useContext,useEffect} from 'react';
import {View, StyleSheet, Text,FlatList,ScrollView,TouchableOpacity,Image} from 'react-native';
import {Card,TextInput, Button, withTheme} from 'react-native-paper';
import RestaurantDriversTabbarComponent from '../../components/TabBar/RestaurantDriversTababarComponent';
import DefaultNavbar from '../../components/navbars/DefaultNavbar';
import ImagePicker from 'react-native-image-picker';
import i18n from '../../i18n/i18n';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNFetchBlob from 'react-native-fetch-blob';
import AppContext from '../../context/AppContext';
import { AlertMsg } from '../../helpers/MyAlert';

const DriverProfile = ({theme}) => {
  const {colors,fonts}= theme;
const {
  baseUrl,
  storeShopShopTypeId,
  storeDriverToken,
  driverToken,
  driverShopTypeId,
  driverId,
  
} = useContext(AppContext);

  const [isUpdate, setIsUpdate] = useState(false);

    
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [txtDriverImage, setTextDriverimage] = useState(`${i18n.t('update_driver_image')}`);
  const [driverImagePath, setDriverImagePath] = useState('');
  const [txtDriverLicenseImage, setTextDriverLicenseImage] = useState(
    `${i18n.t('update_driver_license')}`,
  );
  const [driverLicensePath, setDriverLicensePath] = useState('');
  const [txtDriverIdImage, setTextDriverIdImage] = useState(`${i18n.t('update_driver_id')}`);
  const [driverIDPath, setDriverIDPath] = useState('');
  const [txtDriverPlateImage, setTextDriverPlateImage] = useState(
    `${i18n.t('update_number_plate')}`,
  );
  const [driverPlatePath, setDriverPlatePath] = useState('');
  const [imagesType, setImagesTypes] = useState('');
  const [imagesName, setImagesName] = useState('');
  // const [registerBtnText, setRegisterBtnText] = useState('Register');

  const options = {
    title: 'Select',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const getDriverImagePath = (imagePath) => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setTextDriverimage(`${i18n.t('driver_image_updated')}`);
        if (Platform.OS === 'ios') {
          setDriverImagePath(response.uri.replace('file://', ''));
        } else {
          setDriverImagePath(response.path);
        }
        setImagesTypes(response.type);
        setImagesName(response.fileName);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  const getDriverLicensePath = (imagePath) => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setTextDriverLicenseImage(`${i18n.t('driver_license_updated')}`);
        if (Platform.OS === 'ios') {
          setDriverLicensePath(response.uri.replace('file://', ''));
        } else {
          setDriverLicensePath(response.path);
        }

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };
  const getDriverIdPath = (imagePath) => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setTextDriverIdImage(`${i18n.t('driver_id_updated')}`);
        if (Platform.OS === 'ios') {
          setDriverIDPath(response.uri.replace('file://', ''));
        } else {
          setDriverIDPath(response.path);
        }
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };
  const getDriverNumberPlatePath = (imagePath) => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setTextDriverPlateImage(`${i18n.t('number_plate_updated')}`);
        if (Platform.OS === 'ios') {
          setDriverPlatePath(response.uri.replace('file://', ''));
        } else {
          setDriverPlatePath(response.path);
        }
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

 
  const DriverProfile = () => {
    console.log(driverId)
    const response = RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/driver/profile/show`,
      {
        Authorization: `bearer ${driverToken}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data,octet-stream',
      },
      [{name: 'driver_id', data: driverId+ ''}],
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setName(response.driver.name);
        setEmail(response.driver.email);
        setPassword(response.driver.password);
        setPhone(response.driver.phone);
      })
      .catch((error) => {
        setIsUpdate(false);
        console.log(error);
      });
  };

  const UpdateDriverProfile = () => {
    const response = RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/driver/profile/update`,
      {
        Authorization: `bearer ${driverToken}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data,octet-stream',
      },
      [
        {name: 'driver_id', data: driverId + ''},
        {name: 'name', data: name + ''},
        {name: 'email', data: email + ''},
        {name: 'password', data: password + ''},
        {name: 'phone', data: phone + ''},
        {
          name: 'image',
          filename: imagesName + 'driverImage',
          type: imagesType,
          data: RNFetchBlob.wrap(driverImagePath),
        },
        {
          name: 'licence',
          filename: imagesName + 'license',
          type: imagesType,
          data: RNFetchBlob.wrap(driverLicensePath),
        },
        {
          name: 'id_card',
          filename: imagesName + 'id_card',
          type: imagesType,
          data: RNFetchBlob.wrap(driverIDPath),
        },
        {
          name: 'number_plate',
          filename: imagesName + 'number_plate',
          type: imagesType,
          data: RNFetchBlob.wrap(driverPlatePath),
        },

      ],
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setIsUpdate(false);
        if (response.success) {
          AlertMsg('Congrats!', 'Profile Updated Successfully', null);
        } else {
          AlertMsg('Oops!', 'Profile not Updated', null);
        }
      })
      .catch((error) => {
        setIsUpdate(false);
        console.log(error);
      });
  };

  useEffect(() => {
    DriverProfile();
    
  }, []);

    return(    
      
        <View style={{flex:1,backgroundColor:colors.background}}>
        
        <DefaultNavbar/>
     <ScrollView showsVerticalScrollIndicator={false}>
        <Card
          style={{
            marginHorizontal: wp('4'),
            marginVertical: hp('3'),
            elevation: wp('2'),
            backgroundColor:colors.cards
          }}>
          <Text
            style={{
              fontSize: hp('5'),
              // fontWeight: 'bold',
              alignSelf: 'center',
              marginVertical: hp('2'),
              color:colors.primary,
              fontFamily:fonts.regular.fontFamily

            }}>
            {i18n.t('profile')}
          </Text>
          <TextInput
            label={i18n.t('driver_name')}
            mode="outlined"
            value={name}
            color={colors.primary}
            onChangeText={(text) => {
              setName(text);
            }}
            style={styles.textinputStyle}
            theme={{ colors: { text: colors.primary,placeholder:colors.primary } }}
            

          />
          <TextInput
            label={i18n.t('driver_email')}
            mode="outlined"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            style={styles.textinputStyle}
            theme={{ colors: { text: colors.primary,placeholder:colors.primary}}}
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
            theme={{ colors: { text: colors.primary,placeholder:colors.primary } }}
          />

          <TextInput
            label={i18n.t('driver_phone')}
            mode="outlined"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
            }}
            style={styles.textinputStyle}
            theme={{ colors: { text: colors.primary ,placeholder:colors.primary} }}
          />

          <TouchableOpacity
            onPress={() => {
              getDriverImagePath();
            }}
            style={{marginHorizontal: wp('10'), marginVertical: wp('3')}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="upload"
                size={wp('7')}
                color={colors.primary}              />
              <Text style={{fontFamily:fonts.regular.fontFamily, marginRight: 10,color:colors.primary}}>
                {txtDriverImage}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              getDriverLicensePath();
            }}
            style={{marginHorizontal: wp('10'), marginVertical: wp('3')}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="upload"
                size={wp('7')}
                color={colors.primary}
              />
              <Text style={{fontFamily:fonts.regular.fontFamily, marginRight: 10,color:colors.primary}}>
                {txtDriverLicenseImage}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              getDriverIdPath();
            }}
            style={{marginHorizontal: wp('10'), marginVertical: wp('3')}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="upload"
                size={wp('7')}
                color={colors.primary}              />
              <Text style={{fontFamily:fonts.regular.fontFamily, marginRight: 10,color:colors.primary}}>
                {txtDriverIdImage}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              getDriverNumberPlatePath();
            }}
            style={{marginHorizontal: wp('10'), marginVertical: wp('3')}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="upload"
                size={wp('7')}
                color={colors.primary}
              />
              <Text style={{fontFamily:fonts.regular.fontFamily, marginRight: 10,color:colors.primary}}>
                {txtDriverPlateImage}
              </Text>
            </View>
          </TouchableOpacity>
            <Button onPress={()=>{
              UpdateDriverProfile();
              setIsUpdate(true)
            }}
            loading={isUpdate}
            mode='contained'
            style={styles.buttonStyle}>
              {i18n.t('update')}
            </Button>
        </Card>
        </ScrollView>
        
        
        <RestaurantDriversTabbarComponent/>
        
      </View>
    )
};

const styles = StyleSheet.create({
  textinputStyle: {
    marginHorizontal: wp('4'),
    marginVertical: hp('1'),
    height: hp('7'),
    fontSize: hp('1.9'),
    // backgroundColor:"transparent"
  },
  buttonStyle: {
    marginHorizontal: wp('4'),
    marginVertical: hp('2'),
  },
});

export default withTheme(DriverProfile);