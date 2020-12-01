import React, {useState, useContext, useEffect,useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation';
import NavbarWithBackButton from '../../../components/navbars/NavbarWithBackButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomerChatComponent from '../../../components/chats/CustomerChatComponent';
import DriverChatComponent from '../../../components/chats/DriverChatComponent';
import ImagePicker from 'react-native-image-picker';
import AppContext from '../../../context/AppContext';
import RNFetchBlob from 'react-native-fetch-blob';
import CustomerChatImageComponent from '../../../components/chats/CustomerChatImageComponent';
import DriverChatImageComponent from '../../../components/chats/DriverChatImageComponent';
import exported_firebase from '../../../utils/firebase';
import { ActivityIndicator, withTheme } from 'react-native-paper';
import i18n from '../../../i18n/i18n';

const ChatScreen = ({navigation,theme}) => {
  const {colors,fonts}= theme;

  const refContainer = useRef(null);
  // add attachment
  const [attachmentIcon, setAttachmentIcon] = useState('add');
  const [imagesType, setImagesTypes] = useState('');
  const [imagesName, setImagesName] = useState('');
  const [imagesIcon, setImagesIcon] = useState("1");
  const conversation_id = navigation.state.params.conversation_id;
  const [isLoading,setIsLoading] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [conversationId, setConversationID] = useState('');
  const [message, setMessage] = useState('');
  const [attachmentPath, setAttachmentPath] = useState(null);
  // const {baseUrl, token, userid} = useContext(AppContext);
  const [chats, setChats] = useState([]);

  const {baseUrl, driverToken, driverId} = useContext(AppContext);

  const options = {
    title: 'Select',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const uploadAttachment = (imagePath) => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setAttachmentIcon('checkmark');
        if (Platform.OS === 'ios') {
          setAttachmentPath(response.uri.replace('file://', ''));
        } else {
          setAttachmentPath(response.path);
        }
        setImagesTypes(response.type);
        setImagesName(response.fileName);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });

  };

  //view chat

  const ViewChat = async () => {
    const response = await RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/driver/viewmessage`,
      {
        Authorization: `Bearer ${driverToken}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [{name: 'conversation_id', data: conversation_id + ''}],
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setChats(response.chats);
        setIsLoading(false);

        setTimeout(function () {
          refContainer.current.scrollToEnd() + 1;
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SendChat = async () => {
    console.log('text');
    const res = await RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/driver/sendmessage`,
      {
        Authorization: `Bearer ${driverToken}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'conversation_id', data: conversation_id + ''},
        {name: 'senderid', data: driverId + ''},
        {name: 'message', data: message + ''},
      ],
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMessage('');
        setAttachmentPath(null);
        ViewChat();
        setTimeout(function () {
          refContainer.current.scrollToEnd() + 1;
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const SendChatWithImage = async () => {
    console.log('image');
    const res = await RNFetchBlob.fetch(
      'POST',
      `${baseUrl}/api/driver/sendmessage`,
      {
        Authorization: `Bearer ${driverToken}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'conversation_id', data: conversation_id + ''},
        {name: 'senderid', data: driverId + ''},
        {name: 'message', data: message + ''},
        {
          name: 'image',
          filename: imagesName + 'ShopImage',
          type: imagesType,
          data: RNFetchBlob.wrap(attachmentPath),
        },
      ],
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMessage('');
        setAttachmentPath(null);
        ViewChat();
        
        setTimeout(function () {
          refContainer.current.scrollToEnd() + 1;
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(conversation_id + ' y');
    setTimeout(() => {
      ViewChat();
    }, 1000);

    exported_firebase
      .database()
      .ref('conversation')
      .child(conversation_id)
      .on('child_changed', function () {
        setTimeout(() => {
          ViewChat();
        }, 1000);

        console.log('Changed called');
    
  });
    var unsubscribe = navigation.addListener('didFocus', () => {

      console.log(conversation_id);
      exported_firebase
      .database()
      .ref('conversation')
      .child(conversation_id)
      .on('child_changed', function () {
        setTimeout(() => {
          ViewChat();
        }, 1000);

        console.log('Changed called');
      });
    });



  }, []);

  return (
      <View style={{flex: 1,backgroundColor:colors.background}}>
        <NavbarWithBackButton />
        <ScrollView>
        {/* <View style={{
                flexDirection:'row',
                backgroundColor:'#FFFFFFFF',
                height:wp('15'),
                alignItems:'center'
            }}>
                <Image
                style={{
                    height:wp('12'),
                    width:wp('12'),
                    borderRadius:wp('50'),
                    marginHorizontal:wp('3')
                }}
                source={{uri:'https://lumiere-a.akamaihd.net/v1/images/ct_video_mickeymousefranchise_mickey_ddt-16771_fed45249.jpeg'}}/>
                <Text style={{
                    fontSize:wp('5'),
                    fontWeight:'bold'
                }}>
                    Customer Name
                    </Text>
                    
            </View> */}
           
        <FlatList
          data={chats}
          ref= {refContainer}
          renderItem={({item}) => {
              return item.senderid == driverId ? (
                
                item.image == null ? (
                  <DriverChatComponent item={item} />
                ) : (
                  <DriverChatImageComponent item={item} />
                )
              ) : item.image == null ? (
                <CustomerChatComponent item={item} />
              ) : (
                <CustomerChatImageComponent item={item} />
              );
          }}
        />
      </ScrollView>
      {isLoading ? (
              <ActivityIndicator color={colors.primary} style={{marginTop: 5}} />
              
            ) : 
           null
            }
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: hp('8'),
          backgroundColor:colors.background
        }}>
          
        {imagesIcon==1?
        <Ionicons
          onPress={() => {
            uploadAttachment();
          }}
          name={attachmentIcon}   
          size={wp('8')}
          style={{marginHorizontal: wp('1'),color:colors.primary}}
        />:null}
        <TextInput
          disabled={isImageSelected}
          placeholder={i18n.t('typeMessage')}
          value={message}
          mode="outlined"
          onChangeText={(text) => {
            setMessage(text);
          }}
          style={{
            height: hp('5'),
            width: wp('80'),
            borderColor:colors.cards,
            borderWidth: wp('0.2'),
            fontSize: wp('3'),
            marginRight: wp('2'),
            backgroundColor:colors.background,
            color:colors.text,
            fontFamily:fonts.regular.fontFamily
          }}
          theme={{ colors: { text: colors.text ,placeholder:colors.cards} }}


        />
        <TouchableOpacity
          onPress={() => {
            attachmentPath == null ? SendChat() : SendChatWithImage();
            setAttachmentIcon('add');
            setIsLoading(true);
          }}>
          <FontAwesome name="send" size={wp('6')} color={colors.primary}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default withTheme(withNavigation(ChatScreen));
