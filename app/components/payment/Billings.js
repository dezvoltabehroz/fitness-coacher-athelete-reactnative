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
import BillingsCard from './BillingsCard'
const height = Dimensions.get('window').height
const BillingsScreen = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.bottom}>
    
        <FlatList
        data={[1,2,3]}
        keyExtractor={(item,index) =>index.toString()}
        renderItem={({item,index})=>{return(
          <BillingsCard />

        )}}
        />
      </View>
      <View style={{height:'10%'}}></View>
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

export default BillingsScreen;
