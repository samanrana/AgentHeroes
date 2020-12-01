import React,{useState, useContext} from 'react';
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
import ImagePicker from 'react-native-image-picker';
import NavbarWithBackButton from '../../components/navbars/NavbarWithBackButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'react-native-fetch-blob';
import AppContext from '../../context/AppContext';
import { AlertMsg } from '../../helpers/MyAlert';
import i18n from '../../i18n/i18n';
import ShopTabbarComponent from '../../components/TabBar/ShopsTabbarComponent';
import DefaultNavbar from '../../components/navbars/DefaultNavbar';


const AddEmployee = () => {

  const {baseUrl,shopToken,shopid,shopTypeId} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationBtnText, setRegistrationBtnText] = useState(`${i18n.t('register')}`);
  const [employeeName, setEmployeeName ] = useState('Employee');
  const [employeeEmail, setEmployeeEmail ] = useState('employee3@system.com');
  const [employeePassword, setEmployeePassword ] = useState('password');
  const [carImage, setCarImage ] = useState('')
    
  const options = {
    title: 'Select',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const [imagesType, setImagesTypes ] = useState('');
  const [imagesName, setImagesName] = useState('')
  const [txtCarImage, setTextCarimage] = useState(`${i18n.t('upload_car_image')}`);
  const [CarImagePath, setCarImagePath] = useState('');

  const getCarImagePath = (imagePath) => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setTextCarimage(`${i18n.t('car_image_selected')}`);
        if (Platform.OS === 'ios') {
          setCarImagePath(response.uri.replace('file://', ''));
        } else {
          setCarImagePath(response.path);
        }
        setImagesTypes(response.type);
        setImagesName(response.fileName);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  const addEmployee = () => {
        console.log(shopToken);
        console.log(shopid)
  RNFetchBlob.fetch('POST', `${baseUrl}/api/shop/employee/store`, {
    Authorization : `Bearer ${shopToken}`,
    Accept: 'Application/json',
    'Content-Type': 'multipart/form-data',
  }, [
    // append field data from file path
    {
      name: 'car_image',
      filename: imagesName+'driver_car' ,
      type: imagesType,
      data: RNFetchBlob.wrap(CarImagePath),
    },

    
    { name : 'name', data : employeeName+''},
    { name : 'email', data : employeeEmail+''},
    { name : 'password', data : employeePassword+''},
    { name : 'companyid', data : shopid+''},
    { name : 'shop_type_id', data : shopTypeId+''},
  ])
  .uploadProgress((written, total) => {
    console.log('uploaded ' + (written / total).toFixed(1));
    setRegistrationBtnText(
      `${i18n.t('registration')} ${(written / total).toFixed(1) * 100} %`,
    );
  })
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    // console.log(response.message)
    if(response.reg=="yes")
    {
      AlertMsg(`${i18n.t('success')}`,`${i18n.t('employee_created')}`,null);  
    }else{
      AlertMsg(`${i18n.t('sorry')}`,`${i18n.t('employee_not_created')}`,null);  
    }
    setIsLoading(false);
  }).catch((error) => {
    console.log(error)
    setIsLoading(false);
  })

  }
    return(  
      <View style={{flex:2}}>
    <View style={{flex: 1}}>
        <DefaultNavbar/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card
            style={{
              marginHorizontal: wp('4'),
              elevation: wp('2'),
              height: hp('60'),
              width: wp('92'),
              marginVertical: hp('10'),
              borderRadius: wp('1'),
            }}>
            <Text
              style={{
                fontSize: hp('5'),
                fontWeight: 'bold',
                alignSelf: 'center',
                marginVertical: hp('2'),
              }}>
              {i18n.t('add_employee')}
            </Text>
            <TextInput
              label={i18n.t('name')}
              value={employeeName}
              onChangeText={(text)=>{setEmployeeName(text)}}
              mode="outlined"
              style={styles.textinputStyle}
            />
            <TextInput
              label={i18n.t('email')}
              mode="outlined"
              value={employeeEmail}
              onChangeText={(text)=>{setEmployeeEmail(text)}}
              style={styles.textinputStyle}
            />
            <TextInput
              label={i18n.t('password')}
              mode="outlined"
              value={employeePassword}
              onChangeText={(text)=>{setEmployeePassword(text)}}
              secureTextEntry={true}
              style={styles.textinputStyle}
            />
            
          <TouchableOpacity
            onPress={() => {
              getCarImagePath();
            }}
            style={{marginHorizontal: wp('10'), marginVertical: wp('3')}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="upload"
                size={wp('7')}
                color="#1B1B1B"
              />
              <Text style={{fontWeight: 'bold', marginRight: 10}}>
                {txtCarImage}
              </Text>
            </View>
            </TouchableOpacity>
            <Button
              mode="contained"
              loading={isLoading}
              style={styles.buttonStyle}
              onPress={()=>{addEmployee()
              setIsLoading(true)}}>
              {registrationBtnText}
            </Button>
            </Card>
        </ScrollView>
    </View>
<ShopTabbarComponent/>
  </View>
    )
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
})

export default AddEmployee;