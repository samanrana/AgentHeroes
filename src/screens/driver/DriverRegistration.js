import React, {useState} from 'react';
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
import {withTheme, Card, TextInput, Button} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import NavbarWithBackButton from '../../components/navbars/NavbarWithBackButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import {AlertMsg} from '../../helpers/MyAlert';
import i18n from '../../i18n/i18n';
import DefaultNavbar from '../../components/navbars/DefaultNavbar';
const DriverRegistration = ({navigation, theme}) => {
  const {colors,fonts} = theme;
  const [signupLoading, setSignupLoading] = useState(false);
  const [name, setName] = useState('imran');
  const [email, setEmail] = useState('driver@system.com');
  const [password, setPassword] = useState('password');
  const [phone, setPhone] = useState('923136476240');
  const [txtDriverImage, setTextDriverimage] = useState(
    `${i18n.t('upload_driver_image')}`,
  );
  const [driverImagePath, setDriverImagePath] = useState('');
  const [txtDriverLicenseImage, setTextDriverLicenseImage] = useState(
    `${i18n.t('upload_driver_license')}`,
  );
  const [driverLicensePath, setDriverLicensePath] = useState('');
  const [txtDriverIdImage, setTextDriverIdImage] = useState(
    `${i18n.t('upload_driver_id')}`,
  );
  const [driverIDPath, setDriverIDPath] = useState('');
  const [txtDriverPlateImage, setTextDriverPlateImage] = useState(
    `${i18n.t('upload_number_plate')}`,
  );
  const [driverPlatePath, setDriverPlatePath] = useState('');
  const [imagesType, setImagesTypes] = useState('');
  const [imagesName, setImagesName] = useState('');
  const [registerBtnText, setRegisterBtnText] = useState(
    `${i18n.t('register')}`,
  );

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
        setTextDriverimage(`${i18n.t('uploaded_driver_image')}`);
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
        setTextDriverLicenseImage(`${i18n.t('uploaded_driver_license')}`);
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
        setTextDriverIdImage(`${i18n.t('uploaded_driver_id')}`);
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
        setTextDriverPlateImage(`${i18n.t('uploaded_number_plate')}`);
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

  const driverSignup = () => {
    RNFetchBlob.fetch(
      'POST',
      'https://www.heroesksa.com/api/driver/register',
      {
        Accept: 'Application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
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
      .uploadProgress((written, total) => {
        console.log('uploaded ' + (written / total).toFixed(1));
        let progress = (written / total).toFixed(1);
        if (progress <= 20) {
        } else if (progress <= 20) {
          setRegisterBtnText(
            `Registering ${(written / total).toFixed(1) * 100} %`,
          );
        } else if (progress <= 40) {
          setRegisterBtnText(
            `Uploading ${(written / total).toFixed(1) * 100} %`,
          );
        } else if (progress <= 70) {
          setRegisterBtnText(
            `Scanning ${(written / total).toFixed(1) * 100} %`,
          );
        } else if (progress <= 100) {
          setRegisterBtnText(
            `Verifying ${(written / total).toFixed(1) * 100} %`,
          );
        }
      })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.hasOwnProperty('reg')) {
          if (resp.reg === 'yes') {
            AlertMsg(
              `${i18n.t('congrats')}`,
              `${i18n.t('registered_and_under_review')}`,
            );
          } else {
            AlertMsg(`${i18n.t('sorry')}`, `${i18n.t('not_registered')}`);
          }
        }

        setSignupLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSignupLoading(false);
      });
  };

  return (
    <View style={{flex: 1,backgroundColor:colors.background}}>
      <DefaultNavbar/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card
          style={{
            marginHorizontal: wp('4'),
            marginTop: hp('6'),
            elevation: wp('2'),
            backgroundColor:colors.cards,
            opacity:5,
            elevation:20
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
            {i18n.t('driver_registration')}
          </Text>
          <TextInput
            label={i18n.t('driver_name')}
            mode="outlined"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
            style={styles.textinputStyle}
            theme={{ colors: { text: colors.primary ,placeholder:colors.primary} }}

          />
          <TextInput
            label={i18n.t('driver_email')}
            mode="outlined"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            style={styles.textinputStyle}
            theme={{ colors: { text: colors.primary,placeholder:colors.primary } }}

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
            theme={{ colors: { text: colors.primary,placeholder:colors.primary } }}

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
                color={colors.primary}
              />
              <Text style={{fontFamily:fonts.regular.fontFamily, marginRight: 10, color:colors.primary}}>
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
                color={colors.primary}
              />
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

          <Button
            mode="contained"
            loading={signupLoading}
            onPress={() => {
              setSignupLoading(true);
              if (name === '') {
                AlertMsg(
                  `${i18n.t('important')}`,
                  `${i18n.t('name_required')}`,
                  null,
                );
                setSignupLoading(false);
              } else if (email === '') {
                AlertMsg(
                  `${i18n.t('important')}`,
                  `${i18n.t('email_required')}`,
                  null,
                );
                setSignupLoading(false);
              } else if (password === '') {
                AlertMsg(
                  `${i18n.t('important')}`,
                  `${i18n.t('password_required')}`,
                  null,
                );
                setSignupLoading(false);
              } else if (phone === '') {
                AlertMsg(
                  `${i18n.t('important')}`,
                  `${i18n.t('phone_required')}`,
                  null,
                );
                setSignupLoading(false);
              } else if (driverImagePath === '') {
                AlertMsg(
                  `${i18n.t('important')}`,
                  `${i18n.t('driver_image_required')}`,
                  null,
                );
                setSignupLoading(false);
              } else if (driverLicensePath === '') {
                AlertMsg(
                  `${i18n.t('important')}`,
                  `${i18n.t('license_required')}`,
                  null,
                );
                setSignupLoading(false);
              } else if (driverIDPath === '') {
                AlertMsg(
                  `${i18n.t('important')}`,
                  `${i18n.t('id_required')}`,
                  null,
                );
                setSignupLoading(false);
              } else if (driverPlatePath === '') {
                AlertMsg(
                  `${i18n.t('important')}`,
                  `${i18n.t('no_plate_required')}`,
                  null,
                );
                setSignupLoading(false);
              } else {
                driverSignup();
              }
            }}
            style={styles.buttonStyle}>
            {registerBtnText}
          </Button>
        </Card>
        
        <TouchableOpacity
          onPress={() => {
            navigation.replace('Login');
          }}
          style={{alignSelf: 'center', marginVertical: hp('3')}}>
          <Text style={{color:colors.primary,fontFamily:fonts.regular.fontFamily}}>{i18n.t('already_have_acc_login')}</Text>
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
    marginHorizontal: wp('4%'),
    marginVertical: hp('2'),
    // backgroundColor:colors.primary
  },
});
export default withTheme(withNavigation(DriverRegistration));
