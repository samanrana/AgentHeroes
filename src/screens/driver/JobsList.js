import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Alert,
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

const JobsList = ({item, alljob, navigation, refresh, theme}) => {
  const {colors, fonts} = theme;
  const {
    baseUrl,
    storeShopShopTypeId,
    storeDriverToken,
    driverId,
    driverToken,
    driverShopTypeId,
  } = useContext(AppContext);
  const [extra_amount, setExtra_amount] = useState('');
  const [error, setError] = useState('');
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [extraAmount, setExtraAmount] = useState('');
  const getPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setError('');
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (e) => setError(e.message),
    );
  };
  //////////////////////////////////distance customer and shop  /////////////////////
  const getShopDistance = () => {
    var pdis = getPreciseDistance(
      {latitude: position.latitude, longitude: position.longitude},
      {latitude: item.shop_lat, longitude: item.shop_lng},
    );
    // alert(`Precise Distance\n${pdis} Meter\nor\n${pdis / 1000} KM`);
    return (pdis / 1000).toFixed(1);
  };
  const getShopToCustomerDistance = () => {
    var pdis = getPreciseDistance(
      {latitude: item.shop_lat, longitude: item.shop_lng},
      {latitude: item.customer_lat, longitude: item.customer_lng},
    );
    // alert(`Precise Distance\n${pdis} Meter\nor\n${pdis / 1000} KM`);
    return (pdis / 1000).toFixed(1);
  };
  /////////////////////////////////////////////
  const getDriverToCustomerDistance = () => {
    var pdis = getPreciseDistance(
      {latitude: position.latitude, longitude: position.longitude},
      {latitude: item.customer_lat, longitude: item.customer_lng},
    );
    // alert(`Precise Distance\n${pdis} Meter\nor\n${pdis / 1000} KM`);
    return (pdis / 1000).toFixed(1);
  };

  const AcceptSingleJob = async () => {
    console.log(item.id);
    console.log(driverShopTypeId);
    console.log(driverId);
    console.log(item.customer_id);

    const response = await RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/driver/acceptsinglejob`,
      {
        Authorization: `Bearer ${driverToken}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'order_id', data: item.id + ''},
        {name: 'shop_type_id', data: driverShopTypeId + ''},
        {name: 'driver_id', data: driverId + ''},
        {name: 'customer_id', data: item.customer_id + ''},
      ],
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        ////////////////////////////////////////////////
        if (response.hasOwnProperty('already')) {
          
            Alert.alert('Oopsss....This Job has already been accepted');
          }
          else if (response.hasOwnProperty('no more')) {
            
              Alert.alert('you cannot accept more than three jobs at a time');
            
        } else refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [updateamountBtn, setUpdateAmountBtn] = useState(`${i18n.t('update')}`);
  const [amount, setAmount] = useState('');
  const [amountUpdateLoading, setAmountUpdateLoading] = useState(false);

  const updateAmount = async () => {
    setAmountUpdateLoading(true);
    const response = await RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/driver/updateamount`,
      {
        Authorization: `Bearer ${driverToken}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'order_id', data: item.id + ''},
        {name: 'amount', data: amount + ''},
        {name: 'extra_amount', data: item.extra_amount + ''},
      ],
    )
      .then((response) => response.json())
      .then((response) => {
        setAmountUpdateLoading(false);
        console.log(response);
        setUpdateAmountBtn(`${i18n.t('updated')}`);
        navigation.navigate('MyJobs');
      })
      .catch((error) => {
        setAmountUpdateLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getPosition();

    // getShopDistance();
    // getShopToCustomerDistance();
  }, []);
  return (
    <Card
      style={{
        // height:hp('2 5'),
        width: wp('95%'),
        backgroundColor: colors.cards,
        alignSelf: 'center',
        borderRadius: wp('2'),
        elevation: wp('1.5'),
        marginVertical: hp('1'),
        // opacity: wp('50%'),
        // marginHorizontal:30
      }}>
      {/* rest */}
      {item.shop_type_id == 1 ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: wp('4'),
              marginHorizontal: wp('3'),
            }}>
            {/* <Image style={{
                    height:wp('12'),
                    width:wp('12'),
                    borderRadius:wp('50'),
                    borderColor:'#1B1B1B',
                    borderWidth:wp('0.2')}}
                source={item.image}/> */}

            <View style={{marginHorizontal: wp('4')}}>
              <Text
                style={{
                  fontSize: wp('4'),
                  width: wp('70'),
                  fontFamily: fonts.regular.fontFamily,
                  color: colors.text,
                }}>
                {item.shop_name}
              </Text>
              <Text
                style={{
                  width: wp('70'),
                  fontSize: wp('3'),
                  color: colors.text,
                  fontFamily: fonts.regular.fontFamily,
                  marginTop: hp('1'),
                }}>
                {item.shop_address}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginVertical: hp('1'),
              marginHorizontal: wp('9%'),
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Ionicons
                name="location-sharp"
                size={wp('6')}
                color={colors.primary}
              />
              <Text
                style={{
                  fontSize: wp('3'),
                  color: colors.primary,
                  fontFamily: fonts.regular.fontFamily,
                }}>
                {i18n.t('you')}
              </Text>
            </View>
            <Text
              style={{
                marginVertical: hp('1'),
                color: colors.primary,
                fontFamily: fonts.regular.fontFamily,
              }}>
              - - - -{getShopDistance()} KM- - - -
            </Text>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Ionicons
                name="location-sharp"
                size={wp('6')}
                color={colors.primary}
              />
              <Text
                style={{
                  fontSize: wp('3'),
                  color: colors.primary,
                  fontFamily: fonts.regular.fontFamily,
                }}>
                {i18n.t('pick_up')}
              </Text>
            </View>
            <Text
              style={{
                marginVertical: hp('1'),
                color: colors.primary,
                fontFamily: fonts.regular.fontFamily,
              }}>
              - - - -{getShopToCustomerDistance()} KM- - - -
            </Text>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Ionicons
                name="location-sharp"
                size={wp('6')}
                color={colors.primary}
              />
              <Text
                style={{
                  fontSize: wp('3'),
                  color: colors.primary,
                  fontFamily: fonts.regular.fontFamily,
                }}>
                {i18n.t('drop')}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: wp('4'),
              marginHorizontal: wp('4'),
            }}>
            {/* <Image style={{
                    height:wp('12'),
                    width:wp('12'),
                    borderRadius:wp('50'),
                    borderColor:'#1B1B1B',
                    borderWidth:wp('0.2')}}
                source={item.image}/> */}

            <View
              style={{
                flexDirection: 'row',
                marginBottom: hp('1'),
              }}>
              <MaterialCommunityIcons
                name="map-marker-multiple"
                size={wp('5')}
                style={{
                  marginHorizontal: wp('2'),
                }}
              />
              <Text
                style={{
                  width: wp('70'),
                  fontSize: wp('3'),
                  color: 'grey',
                }}>
                {item.customer_address}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginVertical: hp('1'),
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Ionicons
                name="location-sharp"
                size={wp('6')}
                color={colors.green}
              />
              <Text
                style={{
                  fontSize: wp('3'),
                }}>
                {i18n.t('you')}
              </Text>
            </View>
            <Text
              style={{
                marginVertical: hp('1'),
              }}>
              - - - - - - - - {getDriverToCustomerDistance()} KM - - - - - - - -
            </Text>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Ionicons
                name="location-sharp"
                size={wp('6')}
                color={colors.orange}
              />
              <Text
                style={{
                  fontSize: wp('3'),
                }}>
                {i18n.t('drop')}
              </Text>
            </View>
          </View>
        </View>
      )}
      {alljob == 0 ? (
        <View>
          <View style={{flexDirection: 'row'}}>
            <Button
              onPress={() => {
                navigation.navigate('ViewJob', {
                  order_id: item.id,
                  currentPosition: position,
                  shopLat: item.shop_lat,
                  shopLong: item.shop_lng,
                  customerLat: item.customer_lat,
                  customerLong: item.customer_lng,
                });
              }}
              mode="contained"
              style={{
                height: hp('4'),
                width: wp('40'),
                justifyContent: 'center',
                // alignItems: 'center',
                marginVertical: hp('1.5'),
                alignSelf: 'stretch',
                marginLeft: wp('5'),
                backgroundColor: colors.primary,
                borderRadius: hp('1%'),
              }}>
              {i18n.t('view')}
            </Button>
            {item.status === 'complete' || item.status === 'receive' ? (
              <Button
                disabled
                mode="contained"
                style={{
                  height: hp('4'),
                  width: wp('40'),
                  justifyContent: 'center',
                  marginVertical: hp('1.5'),
                  marginLeft: wp('5'),
                  borderRadius: hp('1%'),
                }}>
                {i18n.t('chat')}
              </Button>
            ) : (
              <Button
                onPress={() => {
                  navigation.navigate('ChatScreen', {
                    conversation_id: item.conversation.id,
                  });
                }}
                mode="contained"
                style={{
                  height: hp('4'),
                  width: wp('40'),
                  justifyContent: 'center',
                  // alignItems: 'center',
                  marginVertical: hp('1.5'),
                  // alignSelf: 'stretch',
                  marginLeft: wp('5'),
                  backgroundColor: colors.primary,
                  borderRadius: hp('1%'),
                }}>
                {i18n.t('chat')}
              </Button>
            )}
          </View>
          {item.status === 'complete' || item.status === 'receive' ? null : (
            <View
              style={{
                marginHorizontal: wp('4'),
                marginVertical: hp('2%'),
              }}>
              <TextInput
                style={{
                  height: hp('4'),
                  width: wp('85'),
                  borderTopRightRadius: 0,
                }}
                placeholder="Amount"
                keyboardType="number-pad"
                theme={{
                  colors: {text: colors.text, placeholder: colors.primary},
                }}
                onChangeText={(text) => {
                  setAmount(text);
                }}
              />
              <Text
                style={{
                  fontFamily: fonts.regular.fontFamily,
                  color: colors.primary,
                }}>
                Delivery Charges : {item.extra_amount} SAR
              </Text>
              {/* <TextInput
                style={{
                  height: hp('4'),
                  width: wp('85'),
                  borderTopRightRadius: 0,
                  marginVertical: hp('1%'),
                }}
                placeholder="Extra Amount"
                keyboardType="number-pad"
                theme={{
                  colors: {text: colors.text, placeholder: colors.primary},
                }}
                onChangeText={(text) => {
                  setExtraAmount(item.extra_amount);
                }}
              /> */}
            </View>
          )}
          {item.status === 'complete' || item.status === 'receive' ? null : (
            <Button
              loading={amountUpdateLoading}
              onPress={() => {
                Alert.alert(
                  '',
                  `${i18n.t('amount')} ${amount}?`,
                  [
                    {
                      text: `${i18n.t('no')}`,
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: `${i18n.t('yes')}`,
                      onPress: () => {
                        setAmountUpdateLoading(true);
                        updateAmount();
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}
              style={{
                height: hp('4'),
                // width: wp('3'),
                justifyContent: 'center',
                borderRadius: 3,
                marginHorizontal: hp('2.5%'),
              }}
              mode="contained">
              {updateamountBtn}
            </Button>
          )}

          <View style={{alignItems: 'center', marginVertical: hp('1')}}>
            {item.status === 'complete' || item.status === 'receive' ? (
              <Text
                style={{
                  // fontWeight: 'bold',
                  color: colors.green,
                  fontFamily: fonts.regular.fontFamily,
                }}>
                {i18n.t('completed')}
              </Text>
            ) : (
              <Text
                style={{
                  // fontWeight: 'bold',
                  color: colors.green,
                  fontFamily: fonts.regular.fontFamily,
                }}>
                {i18n.t('inProgress')}
              </Text>
            )}
          </View>
        </View>
      ) : (
        <Button
          onPress={() => {
            Alert.alert(
              '',
              `${i18n.t('accept_job')}`,
              [
                {
                  text: `${i18n.t('no')}`,
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: `${i18n.t('yes')}`, onPress: () => AcceptSingleJob()},
              ],
              {cancelable: false},
            );
          }}
          mode="contained"
          style={{
            alignSelf: 'stretch',
            marginVertical: hp('1.5'),
            marginHorizontal: wp('4'),
            height: hp('4'),
            justifyContent: 'center',
            backgroundColor: colors.primary,
            borderRadius: hp('1%'),
            color: colors.primary,
          }}>
          {i18n.t('accept')}
        </Button>
      )}
    </Card>
  );
};
export default withTheme(withNavigation(JobsList));
