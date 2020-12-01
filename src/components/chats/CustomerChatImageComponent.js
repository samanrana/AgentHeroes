import React, {useContext,useState} from 'react';
import {View, Text, Image, TouchableOpacity,Modal,StyleSheet} from 'react-native';
import {Card, withTheme,Button} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppContext from '../../context/AppContext';
import ImageViewer from 'react-native-image-zoom-viewer';
import {withNavigation} from 'react-navigation';
import i18n from '../../i18n/i18n';
import ImageZoom from 'react-native-image-pan-zoom';

const CustomerChatImageComponent = ({item, navigation,theme}) => {
  const {baseUrl} = useContext(AppContext);
  const {colors,fonts} = theme;
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');

  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: hp('1'),
        width: wp('70'),
        alignItems: 'center',
      }}>
      <FontAwesome5 style={{marginHorizontal: 10}} name="user-alt" size={32} color={colors.primary}/>
      <Card
        style={{
          borderRadius: wp('2'),
          marginRight: wp('1'),
          backgroundColor:colors.primary,
          elevation:wp('2.5')
        }}>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('ImageZoom', {
              image_uri: `${baseUrl}/storage/${item.image}`,
            });
          }}> */}
          
        <TouchableOpacity onPress={()=>{
              setModalVisible(true);
              setImage(`${baseUrl}/storage/${item.image}`)
              }}>
         
          <Image
            style={{height: 250, width: wp('70%')}}
            source={{uri: `${baseUrl}/storage/${item.image}`}}
          />
        {/* </TouchableOpacity> */}
        </TouchableOpacity>
               <View style={styles.centeredView}>
                
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {setModalVisible(false) }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      
                    <ImageZoom cropWidth={wp('85')}
                       cropHeight={hp('85')}
                       imageWidth={wp('100%')}
                       imageHeight={hp('100%')}>
                    <Image
                      style={{
                        width: wp('85'),
                        height: hp('85'),
                        marginVertical:hp('7'),
                        marginHorizontal:wp('1'),
                        alignSelf:'center',
                        borderRadius:wp('3')
                      }}
                      source={{uri: image}}
                      
                    />
                    </ImageZoom>
          
                      <Button
                      mode='contained'
                      style={{marginHorizontal:wp('1'),marginBottom:hp('0.5'),borderRadius:wp('3')}}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                      >
                        {i18n.t('close')}
                      </Button>
                    </View>
                  </View>
                </Modal>
          
               </View>
              
        <Text
          style={{
            marginHorizontal: wp('2'),
            color:colors.cards,
            fontFamily:fonts.regular.fontFamily
          }}>
          {item.message}
        </Text>

        <Text
          style={{
            fontSize: wp('2.5'),
            margin: hp('1'),
            textAlign: 'right',
            color: colors.cards,
            fontFamily:fonts.regular.fontFamily
          }}>
          {item.created_at}
        </Text>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: hp('1'),
    marginHorizontal: wp('3'),
    backgroundColor: '#FFFFFFFF',
    borderRadius: hp('1'),
    alignItems: 'center',
    height: hp('5'),
    borderColor:'#1A3365',
    borderWidth:wp('0.1')
  },
  
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop:wp('1'),
      backgroundColor:'rgba(0,0,0,0.9)',
    },
    modalView: {
      margin: 20,
      borderRadius: wp('3'),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
  
  
});

export default withTheme(withNavigation(CustomerChatImageComponent));
