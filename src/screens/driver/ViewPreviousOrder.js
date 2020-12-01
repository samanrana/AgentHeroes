import React, { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity,FlatList, Alert,Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fantisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ActivityIndicator, card, Card, withTheme} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import NumberOrder from '../../components/NumberOrder';
import DefaultNavbar from '../../components/navbars/DefaultNavbar';
import NavbarWithBackButton from '../../components/navbars/NavbarWithBackButton';
import AppContext from '../../context/AppContext';
import RNFetchBlob from 'react-native-fetch-blob';
import MapView, { Marker } from 'react-native-maps';
import ViewOrder from '../../components/Cards/ViewOrder';
import PreviousOrders from '../../components/Cards/PreviousOrders';
import i18n from '../../i18n/i18n';
import { ScrollView } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
const ViewPreviousOrder = ({text,colorIcon,lastCard,IconName,metaData,IconType,theme,navigation}) => {
    const {colors, fonts}= theme;
    const customerLng = navigation.state.params.customerLng;
    const customerLat = navigation.state.params.customerLat;
    const shopLat = navigation.state.params.shopLat;
    const shopLng = navigation.state.params.shopLng;
    const shop_name = navigation.state.params.shop_name;
    const shop_address = navigation.state.params.shop_address;
    const customer_address = navigation.state.params.customer_address;
    const customer_name = navigation.state.params.customer_name;
    const customer_email = navigation.state.params.customer_email;
    const created_at = navigation.state.params.created_at;
    const cart= navigation.state.params.cart;
    
    
const [orders,setOrder] = useState("");
const [position_lat,setPosition_Lat] = useState("");
const [position_Long,setPosition_Long] = useState("");
const [name,setName] = useState("");
const {
    baseUrl,
    storeShopShopTypeId,
    storeDriverToken,
    driverId,
    driverToken,
    driverShopTypeId,
  } = useContext(AppContext);

  const GOOGLE_MAPS_APIKEY ='AIzaSyAvMMw7qsDdMpxnS8ibDaLUJIR6TaVEPyI';
  const coordinates = [{
    latitude:parseFloat(shopLat),longitude:parseFloat(shopLng)
  },
  {
    latitude:parseFloat(customerLat),longitude:parseFloat(customerLng)
  },
]


// const coordinate = [{
//   latitude:parseFloat(position_lat),longitude:parseFloat(position_Long)
// },
// {
//   latitude:parseFloat(shopLat),longitude:parseFloat(shopLng)
// },
// ]



    const Orders = async () => {
     const response = await RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/driver/mycompletedjobs`,
      {
        Authorization: `Bearer ${driverToken}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.order);
        setOrder(response.orders);
        setName(response.cart.item)
      })
      .catch((error) => {
        console.log(error);
      });
  };


const updateLocation = () => {

    Geolocation.getCurrentPosition(
      (position) => {

        console.log(position, 'show pos');
        // Alert.alert(`${position.coords.latitude}`);
        // Alert.alert(`${position.coords.longitude}`);
        setPosition_Lat(position.coords.latitude);
        setPosition_Long(position.coords.longitude);

        // this.setState({
        //   lat: position.coords.latitude,
        //   longt: position.coords.longitude,
        // })

      })}

 


  useEffect(() => {
    Orders();
    updateLocation();


  }, []);
  return (
    <View style={{flex:1,backgroundColor:colors.background}}>
      <NavbarWithBackButton />
      <ScrollView>
            <Text
                  style={{
                  alignSelf: 'center',
                  marginVertical: hp('2'),
                  fontSize: wp('10'),
                  // fontWeight: 'bold',
                  color:colors.text,
                  fontFamily:fonts.regular.fontFamily

                   }}>
                     {i18n.t('orderDetails')}
              </Text>
                  <Text style={{color:colors.primary,fontFamily:fonts.regular.fontFamily,alignSelf:'flex-end',marginHorizontal:wp('6')}}>{created_at}</Text>
              <MapView
            userLocationPriority="high"
            userLocationUpdateInterval={1000}
            userLocationFastestInterval={1000}
            // showsUserLocation={true}
            // followsUserLocation={true}
            // showsMyLocationButton={true}

            // showsTraffic={true}
            // showsIndoors={true}
             style={styles.map}
             region={{
               latitude: parseFloat(shopLat),
               longitude: parseFloat(shopLng),
               latitudeDelta: 0.015,
               longitudeDelta: 0.0121,
                  }}>
               
                {/* <Marker
                 key={1}
                 coordinate={{ latitude: position_lat, longitude: position_Long}}>
                  <MaterialCommunityIcons name="map-marker" size={38} color={colors.orange}/>
                </Marker> */}

                <Marker
                 key={1}
                 coordinate={{ latitude: parseFloat(shopLat), longitude: parseFloat(shopLng)}}>
                  {/* <Fantisto name="shopping-store" size={wp('5')} color={colors.cards}/> */}
                  <Image
            style={{width: wp('9'), height: wp('12'), tintColor: colors.cards}}
            source={{
              uri:
                'https://cdn4.iconfinder.com/data/icons/commerce-2/500/Map_marker_gps_location_map_store-512.png',
            }}
          />
                </Marker>

                 <Marker
                 key={1}
                 coordinate={{ latitude: parseFloat(customerLat), longitude: parseFloat(customerLng)}}>
                  <MaterialIcons name="person-pin-circle" size={30} color={colors.cards}/>
                </Marker> 

                

                <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="green"
                  />

               {/* <MapViewDirections
                    origin={coordinate[0]}
                    destination={coordinate[1]}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="green"
                  /> */}

                  </MapView>
        <PreviousOrders  created_at={created_at} customer_email={customer_email} shop_name={shop_name} shop_address={shop_address} customer_address={customer_address} shop_address={shop_address} customer_name={customer_name}/>
        <Card style={{backgroundColor:colors.cards,
                  margin:hp("2%"),
                  borderRadius:hp("1%"),
                  elevation:wp('2'),
                  opacity:60
                  }}>
                    <Text style={{color:colors.white,fontFamily:fonts.regular.fontFamily,fontSize:wp('7'),alignSelf:'center',marginVertical:hp('1')}}>
                      Cart
                    </Text>
              <FlatList
          // showsVerticalScrollIndicator={false}
          data={cart}
          renderItem={({item}) => {
            return (<ViewOrder item={item}/>);
          }}
        />
      </Card>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
 
  iconstyle: {
    alignSelf: 'center',
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    margin:10,
    height:hp("35%"),
    width:wp("90%"),
    alignSelf:"center",
  },
});
export default withTheme(withNavigation(ViewPreviousOrder));
