import React from 'react';
import {View,Text,Image} from 'react-native';
import {Card, withTheme} from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const CustomerChatComponent = ({item,theme}) => {
    const {colors,fonts} = theme;

    return(
        <View style={{
            flexDirection:'row-reverse',
            marginVertical:hp('1'),
            width:wp('70'),
            alignSelf:'flex-end',
        }}>

            <MaterialCommunityIcons
                style={{marginHorizontal: 10,elevation:10}}
                name="car"
                size={32}
                color={colors.primary}/>
            <Card style={{
                borderRadius:wp('2'),
                // marginRight:wp('1'),
                backgroundColor:colors.cards,
                elevation:wp('2.5')
            }}>
                <Text style={{
                    marginHorizontal:wp('2'),
                    color:colors.primary,
                    fontFamily:fonts.regular.fontFamily
                }}>
                    {item.message}
                    </Text>
                   
                    <Text style={{
                        fontSize:wp('2'),
                        margin:hp('1'),
                        textAlign:'right',
                        color:colors.primary,
                        fontFamily:fonts.regular.fontFamily
                    }}>
                        {item.created_at}
                    </Text>
                
        </Card>
        </View>
    )
}
export default withTheme(CustomerChatComponent);