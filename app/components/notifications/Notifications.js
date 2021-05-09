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
  FlatList
} from 'react-native';
import { Colors } from '../../style/colors'
import { FontFamily } from '../../style/typograpy'
import NotificationCard from './NotificationsCard'
const height = Dimensions.get('window').height
const NotificationsScreen = (props) => {
  const [data, setdata] = useState([
    {
      type: 'completed_booking',
      message: 'Zimry Mayfield has marked your booking as completed'
    },
    {
      type: 'booking_request',
      message: 'Zimry Mayfield has responded to your booking request'
    },
    {
      type: 'started_booking',
      message: 'your booking with Enrique Bara has started'
    },
    {
      type: 'review',
      message: 'Alex Bold left a 5 star review'
    },
    {
      type: 'review',
      message: 'Alex Bold left a 5 star review'
    },
    {
      type: 'review',
      message: 'Alex Bold left a 5 star review'
    }
  ])
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <ScrollView style={styles.bottom}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <NotificationCard item={item} navigation={props.navigation}  />

            )
          }}
        />
        <View style={{height:20}}></View>
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
    width: '100%',
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: '22%',
    paddingHorizontal: 20,
    paddingTop:10
  },

});

export default NotificationsScreen;
