import React,{useEffect,useState,useContext} from 'react';
import {View, StyleSheet, Text,FlatList,ScrollView, ActivityIndicator} from 'react-native';
import RestaurantDriversTabbarComponent from '../../../components/TabBar/RestaurantDriversTababarComponent';
import DefaultNavbar from '../../../components/navbars/DefaultNavbar';
import JobsList from '../JobsList';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import AppContext from '../../../context/AppContext';
import RNFetchBlob from 'react-native-fetch-blob';
import ShopDriversTabbarComponent from '../../../components/TabBar/ShopDriversTabbarComponent';
import { withTheme } from 'react-native-paper';
import i18n from '../../../i18n/i18n';
import NavbarWithBackButton from '../../../components/navbars/NavbarWithBackButton';


const MyJobs = ({navigation,theme}) => {
  const {colors,fonts}= theme;
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const {
    baseUrl,
    storeDriverToken,
    driverToken,
    driverShopTypeId,
    driverId,
    storeShopShopTypeId
  } = useContext(AppContext);
 
const [driverJobs, setDriverJobs ] = useState([]);
    const MyJobs = async () => {

      const response = await RNFetchBlob.fetch('POST',`${baseUrl}/api/driver/myjobs`, {
        Authorization : `Bearer ${driverToken}`,
        Accept: 'application/json',
      'Content-Type' : 'multipart/form-data',
      }, [
        { name : 'shop_type_id', data : driverShopTypeId+''},
        { name : 'driver_id', data : driverId+''},
      ]).then((response)=> response.json())
      .then((response) => {
        console.log(response.myjobs);
        storeDriverToken(driverToken)
        setDriverJobs(response.myjobs)
        setIsLoadingJobs(false)

      }).catch((error) => {
        console.log(error);
      })
    };
    

    
useEffect(()=>{
  MyJobs();
  setIsLoadingJobs(true)

  },[] );
  return (
      <View style={{flex:1, backgroundColor:colors.background}}>
      
            <NavbarWithBackButton/>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text
                  style={{
                  alignSelf: 'center',
                  marginVertical: hp('2'),
                  fontSize: wp('10'),
                  // fontWeight: 'bold',
                  color:colors.text,
                  fontFamily:fonts.regular.fontFamily

                   }}>
                    Ongoing Jobs
              </Text>
  
            {isLoadingJobs ? (
              <ActivityIndicator color={colors.primary} style={{marginTop: 5}} />
              
            ) : 
           null
            }
             {driverJobs.length != 0 ? (
            <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginTop:hp('1')}}
                  data= {driverJobs}
                  renderItem={({item}) => {
                if(item.status=='accept'){
                  return (
                
                  <JobsList item={item} alljob={0}/>
                  
              )}}}/>
             ):(
              <Text
              style={{
                alignSelf: 'center',
                marginTop: hp('2'),
                color:colors.text,
                fontFamily:fonts.regular.fontFamily

              }}>
              {i18n.t('NoJobsToDisplay')}
            </Text>
             )}
            </ScrollView>
            
            {driverShopTypeId==1?
            <RestaurantDriversTabbarComponent/>
            : <ShopDriversTabbarComponent/>}
      
    </View>
  );
};

export default withTheme(withNavigation(MyJobs));