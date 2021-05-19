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

const Input = ({
    text,
    placeholder,
    placeholderTextColor,
    secureTextEntry,
    isActive,
    multiline,
    value,
    onChangeText,
    keyboardType,
    editable
  }) => {
    useEffect(() => { });
    return (
      <View style={styles.container}>
        <Text style={isActive ? [styles.text, { paddingLeft: 10 }] : styles.text}>
          {text}
        </Text>
        <TextInput
          secureTextEntry={secureTextEntry}
          style={isActive ? styles.reviewInput : styles.input}
          placeholder={placeholder}
          value={value}
          editable={editable}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholderTextColor={placeholderTextColor}
          multiline={multiline}
        />
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
