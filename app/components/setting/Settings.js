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
  NativeModules,
  Platform,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Colors } from '../../style/colors'
import { FontFamily } from '../../style/typograpy';
import AsyncStorage from '@react-native-async-storage/async-storage';
const height = Dimensions.get('window').height
const SettingsScreen = (props) => {

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      {/* <View style={styles.header}>
        <Text style={styles.text}>SETTINGS</Text>
      </View> */}
      <ScrollView style={styles.bottom}>
        <TouchableOpacity style={[styles.outerView, { marginTop: 40 }]} onPress={() => { props.navigation.navigate('NotificationsSettings') }} >
          <View style={styles.left}>
            <Image source={require('../../assets/notification.png')} style={styles.image} />
          </View>
          <Text style={styles.text1}>Notifications Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.outerView, { marginTop: 40 }]} onPress={() => { props.navigation.navigate('AccountSettings') }}>
          <View style={styles.left}>
            <Image source={require('../../assets/user.png')} style={styles.image} />
          </View>
          <Text style={styles.text1}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.outerView, { marginTop: 40 }]} onPress={() => { props.navigation.navigate('Billings') }}>
          <View style={styles.left}>
            <Image source={require('../../assets/payment.png')} style={styles.image} />
          </View>
          <Text style={styles.text1}>My Billings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.outerView, { marginTop: 40 }]} >
          <View style={styles.left}>
            <Image source={require('../../assets/terms.png')} style={styles.image} />
          </View>
          <Text style={styles.text1}>Term of Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.outerView, { marginTop: 40 }]} >
          <View style={styles.left}>
            <Image source={require('../../assets/privacy.png')} style={styles.image} />
          </View>
          <Text style={styles.text1}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => {
          await AsyncStorage.removeItem('Token');
          props.navigation.replace('Login')
        }} style={[styles.outerView, { marginTop: 40 }]} >
          <View style={styles.left}>
            <Image source={require('../../assets/logout.png')} style={styles.image} />
          </View>
          <Text style={styles.text1}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottom:
  {
    height: '90%',
    width: '100%',
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: '22%',
    paddingHorizontal: 20
  },
  header:
  {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  text:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 16,
    marginTop: 10,

  },
  text1:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 14,
    marginLeft: 10,

  },
  outerView:
  {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  left:
  {
    height: 30,
    width: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.textColor
  },
  image:
  {
    height: 17,
    width: 17
  }

});

export default SettingsScreen;
