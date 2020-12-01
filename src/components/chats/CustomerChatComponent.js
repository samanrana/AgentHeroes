import React from 'react';
import {View,Text,Image} from 'react-native';
import {Card, withTheme} from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomerChatComponent = ({item,theme}) => {
    const {colors,fonts} = theme;

    return(
        <View style={{
            flexDirection:'row',
            marginVertical:hp('1'),
            width:wp('70'),
            }}>
                  
            <FontAwesome5 style={{marginHorizontal: 10}} name="user-alt" size={32} color={colors.primary}/>
            <Card style={{
                borderRadius:wp('2'),
                marginHorizontal:wp('2'),
                backgroundColor:colors.primary,
                elevation:wp('2.5')
                
            }}>
                <Text style={{
                    marginHorizontal:wp('2'),
                    color:colors.cards,
                    fontFamily:fonts.regular.fontFamily
                }}>
                    {item.message}
                    </Text>
                   
                    <Text style={{
                        fontSize:wp('2'),
                        margin:hp('1'),
                        textAlign:'right',
                        color:colors.cards,
                        fontFamily:fonts.regular.fontFamily
                    }}>
                        {item.created_at}
                    </Text>
                
        </Card>
        </View>
    )
}
export default withTheme(CustomerChatComponent);