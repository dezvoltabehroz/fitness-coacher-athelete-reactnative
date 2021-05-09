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
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Colors } from '../../style/colors'
import { FontFamily } from '../../style/typograpy'
import BookingCard from './BookingCard'
const height = Dimensions.get('window').height
const BookingScreen = (props) => {
const [active,setActive]=useState(true)
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.header}>
        <Text style={styles.text}>COACHER</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>{props.navigation.navigate("Create")}}>
        <Image source={require('../../assets/add.png')} style={styles.image1} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{props.navigation.navigate("AccountSettings")}}>
        <Image source={require('../../assets/splash.jpg')} style={styles.image} />
        </TouchableOpacity>

        </View>
      </View>
      <View style={styles.bottom}>
        <View style={{flexDirection:'row',marginTop:20,alignItems:'center'}}>
        <TouchableOpacity onPress={()=>{setActive(true)}}>
          <Text style={[styles.text1,{color:!active?Colors.textColor:Colors.blackColor}]}>My Active Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setActive(false)}}>
          <Text style={[styles.text1,{color:active?Colors.textColor:Colors.blackColor,marginLeft:20}]}>Completed Bookings</Text>
        </TouchableOpacity>
        </View>
        <FlatList
        data={[1,2,3]}
        keyExtractor={(item,index) =>index.toString()}
        renderItem={({item,index})=>{return(
          <BookingCard navigation={props.navigation} active={active}/>
         
        )}}
        />
      </View>
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
    marginTop: '4%',
    paddingHorizontal: 20
  },
  header:
  {
    flexDirection: 'row',
    marginTop: '15%',
    marginHorizontal: 20,
    alignItems:"center",
    justifyContent:'space-between'
  },
  text:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 16
  },
  image:
  {
    height: 35,
    width: 35,
    borderRadius: 35
  },
  image1:
  {
    height: 25,
    width: 25,
    marginRight:10,
    resizeMode:'contain'
  },
  text1:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 14
  },

});

export default BookingScreen;
