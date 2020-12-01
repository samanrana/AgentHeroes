import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {Card, Button, withTheme} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNFetchBlob from 'react-native-fetch-blob';
import AppContext from '../../../context/AppContext';
import {withNavigation} from 'react-navigation';
import NavbarWithBackButton from '../../../components/navbars/NavbarWithBackButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE ,Polyline,Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';
import ViewOrder from '../../../components/Cards/ViewOrder';
import i18n from '../../../i18n/i18n';


const ViewScreen = ({navigation,theme}) => {
  

  
  const {colors, fonts}= theme;
  const order_id = navigation.state.params.order_id;
  const shop_Long = navigation.state.params.shopLong;
  const shop_Lat = navigation.state.params.shopLat;
  const customer_Lat = navigation.state.params.customerLat
  const customer_Long= navigation.state.params.customerLong
  const currentPositionsLat = navigation.state.params.currentPosition.latitude;
  const currentPositionsLng = navigation.state.params.currentPosition.longitude;
  const origin = { latitude: shop_Lat, longitude: shop_Long };
  const destination = { latitude: currentPositionsLat, longitude: currentPositionsLng };
  const GOOGLE_MAPS_APIKEY ='AIzaSyAvMMw7qsDdMpxnS8ibDaLUJIR6TaVEPyI';
  // const coordinates = [{
  //   latitude:currentPositionsLat+"",longitude:currentPositionsLng+""
  // },{
  //   latitude:shop_Lat+"",longitude:shop_Long+""
  // }]
  const coordinates = [{
    latitude:currentPositionsLat+"",longitude:currentPositionsLng+""
  },
  {
    latitude:parseFloat(customer_Lat),longitude:parseFloat(customer_Long)
  },
  // {
  //   latitude:parseFloat(shop_Lat),longitude:parseFloat(shop_Long)
  // }
]

const coordinateshop = [{
  latitude:currentPositionsLat+"",longitude:currentPositionsLng+""
},
{
  latitude:parseFloat(shop_Lat),longitude:parseFloat(shop_Long)
}
]


var markers = [
  {
    latitude:currentPositionsLat,
    longitude:currentPositionsLng,
    title: 'Foo Place',
    subtitle: '1234 Foo Drive'
  }
];
  console.log(shop_Long);
  console.log(shop_Lat);
  console.log(currentPositionsLat);
  console.log(currentPositionsLng);

  const [cart, setCart] = useState([]);
  const {baseUrl, driverToken} = useContext(AppContext);

  const ViewSingleJob = async () => {
    const response = await RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/driver/viewsinglejob`,
      {
        Authorization: `Bearer ${driverToken}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [{name: 'order_id', data: order_id + ''}],
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.cart);
        setCart(response.cart);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    ViewSingleJob();
    console.log(shop_Lat);
    console.log(shop_Long);
    console.log(currentPositionsLat);
    console.log(currentPositionsLng);
  }, []);

  return (
    <View style={{flex:1,backgroundColor:colors.background}}>
      <NavbarWithBackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text
                  style={{
                  alignSelf: 'center',
                  marginVertical: hp('2'),
                  fontSize: wp('10'),
                  color:colors.text,
                  fontFamily:fonts.regular.fontFamily
                // backgroundColor: colors.cards,
                // color:colors.purple
                   }}>
                     {i18n.t('orderDetails')}
              </Text>
      <Card
        style={{
          width: wp('90'),
          height:hp("50"),
          backgroundColor: colors.cards,
          alignSelf: 'center',
          borderRadius: hp('1%'),
          elevation: wp("2%"),
          marginVertical: hp('4'),
          marginHorizontal: wp('3'),
        }}>
       
        <MapView
            userLocationPriority="high"
            userLocationUpdateInterval={1000}
            userLocationFastestInterval={1000}
            // showsUserLocation={true}
            // followsUserLocation={true}
            // showsMyLocationButton={true}
            // annotations={markers}

            // showsTraffic={true}
            // showsIndoors={true}
             style={styles.map}
             region={{
               latitude: currentPositionsLat,
               longitude: currentPositionsLng,
               latitudeDelta: 0.015,
               longitudeDelta: 0.0121,
                  }}>
                    {/* <Marker onPress={()=>{
                        { coordinate= {customer_Lat,customer_Long}, position= {currentPositionsLat,currentPositionsLng} }
                    }} >
                      <View style={{backgroundColor: "red", padding: 10}}>
                        <Text>SF</Text>
                      </View>
                     </Marker> */}
                
                
                <Marker
                 key={1}
                 coordinate={{ latitude: currentPositionsLat, longitude: currentPositionsLng }}>
          <Image
            style={{width: wp('9'), height: wp('12'), tintColor: colors.cards}}
            source={{
              uri:'https://static.thenounproject.com/png/331565-200.png'
            }}
          />              
            </Marker>

                 <Marker
                 key={2}
                 coordinate={{ latitude: parseFloat(customer_Lat), longitude: parseFloat(customer_Long) }}>
                <View>
                <MaterialIcons name="person-pin-circle" size={30} color={colors.cards}/>
                <Text style={{color:colors.cards}}>Customer</Text>
                </View>
                </Marker>

                <Marker
                 key={3}
                 coordinate={{ latitude: parseFloat(shop_Lat), longitude: parseFloat(shop_Long) }}>
            <Image
            style={{width: wp('9'), height: wp('12'), tintColor: colors.cards}}
            source={{
              uri:
                'https://cdn4.iconfinder.com/data/icons/commerce-2/500/Map_marker_gps_location_map_store-512.png',
            }}
          />
                </Marker>

                 <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="green"
                  />
                    <MapViewDirections
                    origin={coordinateshop[0]}
                    destination={coordinateshop[1]}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="green"
                  />
            </MapView>
      </Card>


                <Card style={{backgroundColor:colors.cards,
                  margin:hp("2%"),
                  borderRadius:hp("1%"),
                  elevation:wp('2'),
                  opacity:60
                  }}>
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
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

export default withTheme(withNavigation(ViewScreen));
