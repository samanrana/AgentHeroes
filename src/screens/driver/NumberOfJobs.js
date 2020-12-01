import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {Card, Button, TextInput, withTheme} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Geolocation from '@react-native-community/geolocation';
import {getPreciseDistance} from 'geolib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'react-native-fetch-blob';
import AppContext from '../../context/AppContext';
import {AlertMsg} from '../../helpers/MyAlert';
import {withNavigation} from 'react-navigation';
import i18n from '../../i18n/i18n';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NumberOfOrdersCard from '../../components/Cards/NumberOfOrdersCard';
import DefaultNavbar from '../../components/navbars/DefaultNavbar';
import RestaurantDriversTababarComponent from '../../components/TabBar/RestaurantDriversTababarComponent';

const NumberOfJobs = ({navigation, theme}) => {
    const {colors, fonts} = theme;
    const {
      baseUrl,
      storeShopShopTypeId,
      storeDriverToken,
      driverId,
      driverToken,
      driverShopTypeId,
    } = useContext(AppContext);
    const [isLoadingJobs, setIsLoadingJobs] = useState(false);
    const [driverJobs, setDriverJobs ] = useState(0);
    let [onGoingJobsCount,setOnGoingJobsCount ] = useState(0);
    let [completedJobsCount,setCompletedJobsCount ] = useState(0);

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
            
          response.myjobs.map((singleJob)=>{
                if(singleJob.status=="accept")
                {
                    
                    setOnGoingJobsCount(++onGoingJobsCount);    
                }else if(singleJob.status=="complete")
                {
                    setCompletedJobsCount(++completedJobsCount);    
                }
          });

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
   
    return(
        <View style={{flex: 1, backgroundColor: colors.background}}>
        <DefaultNavbar />
  
        <ScrollView>
          {isLoadingJobs ? (
         <ActivityIndicator
         color={colors.primary}
         style={{marginTop: hp('3%')}}
       />
     ) : null}
          <TouchableOpacity onPress={()=>{navigation.navigate('MyJobs')}}>
           <NumberOfOrdersCard IconName="truck-delivery" text="Ongoing Orders" totalOrders={onGoingJobsCount!=0?onGoingJobsCount:'0'}/>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>{navigation.navigate('CompletedJobs')}}>
           <NumberOfOrdersCard IconName="truck-check" text="Completed Orders" totalOrders={completedJobsCount!=0?completedJobsCount:'0'}/>
           </TouchableOpacity>
        
          
        </ScrollView>
        <RestaurantDriversTababarComponent/>
      </View>
    
    )
}
export default withTheme(withNavigation(NumberOfJobs));