import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    ImageBackground,
    Image,
    AsyncStorage,
    NativeModules,
    Platform,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Colors } from '../../style/colors'
import { FontFamily } from '../../style/typograpy'
const height = Dimensions.get('window').height
const NotificationsCard = ({item, navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.outer}>
                <View style={styles.inner}>
                    <Image source={require('../../assets/splash.jpg')} style={styles.image} />
                    <View>
                        <Text style={styles.text}>{item.message}</Text>
                        <Text style={styles.text1}>17 hours ago</Text>
                    </View>
                </View>

            </View>
            {item.type=='completed_booking'?
            <View style={styles.buttonView}>
                <TouchableOpacity style={[styles.button,{borderBottomLeftRadius:10}]} onPress={()=>{navigation.navigate('Bookingdetails',{flag:true})}} >
                    <Text style={styles.text3}>
                        Accept
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,{borderBottomRightRadius:10}]}>
                    <Text style={styles.text3}>
                        Reject
                    </Text>
                </TouchableOpacity>
            </View>
            :item.type=='booking_request'?
            <TouchableOpacity style={styles.booking}>
           <Text style={styles.text3}>
                        View Profile
                    </Text>
        </TouchableOpacity>:null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //   height:90,
        borderWidth: 1,
        borderColor: Colors.backgroundColor,
        borderRadius: 10,
        marginTop: 15,
        //   padding:5
    },
    text:
    {
        fontFamily: FontFamily.helvetica,
        fontSize: 15,
        width: height > 667 ? 300 : 250,
        lineHeight: 22
    },
    text1:
    {
        fontFamily: FontFamily.helvetica,
        fontSize: 12,
        color: Colors.textColor
    },
    text2:
    {
        fontFamily: FontFamily.helvetica,
        fontSize: 14,
        color: Colors.textColor
    },
    text3:
    {
        fontFamily: FontFamily.helvetica,
        fontSize: 14,
        color: Colors.whiteColor
    },
    image:
    {
        height: 35,
        width: 35,
        borderRadius: 35,
        marginRight: 10
    },
    image1:
    {
        height: 18,
        width: 18,
        marginLeft: 5
    },
    inner:
    {
        flexDirection: 'row',
        //   alignItems:'center',
        margin: 5
    },
    act:
    {
        height: 23,
        borderRadius: 25,
        width: '18%',
        backgroundColor: '#90ee90',
        alignItems: 'center',
        justifyContent: 'center'
    },
    acyText:
    {
        fontFamily: FontFamily.helveticaLight,
        fontSize: 9,
    },
    outer:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bar:
    {
        height: 2,
        backgroundColor: Colors.backgroundColor,
        marginTop: 5
    },
    bottom:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    buttonView:
    {
        flexDirection: 'row',
        width:'100%'
    },
    button:
    {
        width: '50%',
        height: 40,
        backgroundColor: Colors.blackColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    booking:
    {
        width: '100%',
        height: 40,
        backgroundColor: Colors.blackColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10
    
    }

});

export default NotificationsCard;
