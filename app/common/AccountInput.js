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
    TextInput
} from 'react-native';
import { Colors } from '../style/colors'
const height = Dimensions.get('window').height
import {FontFamily} from '../style/typograpy'

const Input = ({text,placeholder,placeholderTextColor,secureTextEntry,editable}) => {
    useEffect(() => {

    })
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
          <TextInput editable={editable} secureTextEntry={secureTextEntry} style={styles.input} placeholder={placeholder} placeholderTextColor={placeholderTextColor}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:17
    },
    text:
    {
        fontFamily:FontFamily.helveticaLight,
        color:Colors.textColor,
        fontSize:13,
        marginBottom:7
        },
        input:
        {
            height:50,
            borderRadius:10,
            backgroundColor:Colors.backgroundColor,
            color:Colors.blackColor,
            paddingLeft:10,
            fontFamily:FontFamily.helveticaBold,
            fontSize:13,

        }


});

export default Input;
