import React,{useState,useEffect,useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {withTheme, Card, Title, Paragraph} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DefaultNavbar from '../../components/navbars/DefaultNavbar';
import { withNavigation } from 'react-navigation';
import i18n from '../../i18n/i18n';
import ShopsTabbarComponent from '../../components/TabBar/ShopsTabbarComponent';
import AppContext from '../../context/AppContext';
import RNFetchBlob from 'react-native-fetch-blob';


const ShopDashboard = ({theme,navigation}) => {
  const {colors} = theme;
  const {baseUrl,
        shopid,
        shopToken} = useContext(AppContext);
  
const [numOfEmp, setNumOfEmp ] = useState('');

const NumberOfEmployees = () => {
  const response =  RNFetchBlob.fetch('POST',`${baseUrl}/api/shop/numberOfEmployees`, {
    Authorization : `Bearer ${shopToken}`,
    Accept: 'application/json',
  'Content-Type' : 'multipart/form-data',
  }, [
    { name : 'shop_id', data :   shopid+""},
  ]).then((response)=> response.json())
  .then((response) => {
    console.log(response.employees_count);
    setNumOfEmp(response.employees_count);
  }).catch((error) => {
    console.log(error);
  })
};


useEffect(()=>{
  NumberOfEmployees();
  },[] );
  return (
  <View style={{flex:1}}>
  <DefaultNavbar/>
      <ScrollView showsVerticalScrollIndicator={false}>
        
          <Card
            style={{
              marginHorizontal: wp('10'),
              marginVertical: hp('4'),
              elevation: wp('1'),
              borderRadius: wp('2'),
              height: hp('30'),
            }}>
            <Text
              style={{
                fontSize: wp('6'),
                fontWeight: 'bold',
                alignSelf: 'center',
                color: colors.black,
                marginVertical:hp('5')
              }}>
              Number of employees
            </Text>
            <View style={{
              flexDirection:'row',
              alignSelf:'center',
              alignItems:'center'
            }}>
            <Ionicons
              name="person"
              size={wp('8')}
              style={{ marginRight:wp('2')}}
            />
              {/* <Text style={{
              fontSize:wp('6')
            }}>
            {numOfEmp}
            </Text> */}
          </View> 
          </Card>
        </ScrollView>
      <ShopsTabbarComponent/>
    </View>
  );
};

export default withTheme(withNavigation( ShopDashboard));
