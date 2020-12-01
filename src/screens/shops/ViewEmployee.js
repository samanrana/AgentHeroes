import React,{useContext,useState,useEffect} from 'react';
import {View, StyleSheet, Text,FlatList, ActivityIndicator} from 'react-native';
import NavbarWithBackButton from '../../components/navbars/NavbarWithBackButton';
import RNFetchBlob from 'react-native-fetch-blob';
import AppContext from '../../context/AppContext';
import ViewEmployeeCardComponent from '../../components/ViewEmployeeCardComponent';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import ShopsTabbarComponent from '../../components/TabBar/ShopsTabbarComponent';
import DefaultNavbar from '../../components/navbars/DefaultNavbar';

const ViewEmployee = () => {

  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);


  const {baseUrl,
    storeShopId,
    storeShopToken,
    shopToken,
    shopid} = useContext(AppContext);

  const [allDrivers, setAllDrivers ] = useState([]);
  
  const ViewEmployees = async () => {
    const response = await RNFetchBlob.fetch('POST',`${baseUrl}/api/shop/employee/view`, {
      Authorization : `Bearer ${shopToken}`,
      Accept: 'application/json',
    'Content-Type' : 'multipart/form-data',
    }, [
      { name : 'companyid', data : shopid+''},
    ]).then((response)=> response.json())
    .then((response) => {
      
      console.log(response.drivers)
      storeShopId(response.companyid)
      storeShopToken(shopToken)  
      setAllDrivers(response.drivers)
      setIsLoadingEmployees(false);
    }).catch((error) => {
      console.log(error);
    })
  }

  
useEffect(()=>{
  ViewEmployees();
  setIsLoadingEmployees(true);
},[] )   



  return (
<View style={{flex:2}}>
    <View style={{flex:1}}>
      <DefaultNavbar/>
      {isLoadingEmployees ? (
        <ActivityIndicator color="#000" style={{marginTop: 5}} />
      ) : null}
      <FlatList style={{
        marginVertical:hp('0.5')
      }}
      showsVerticalScrollIndicator={false}
            data= {allDrivers}
            renderItem={({item}) => {
                return (
                    <ViewEmployeeCardComponent item= {item}/>
                  )}}
                  numColumns={2}

      />
                  </View>
                  <ShopsTabbarComponent/>
                  </View>
  );
};

export default ViewEmployee;