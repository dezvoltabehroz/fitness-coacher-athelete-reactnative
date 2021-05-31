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
import { FontFamily } from '../../style/typograpy';
import moment from 'moment';
const height = Dimensions.get('window').height
const BookingCard = (props) => {
  console.log(props)
  // console.log(props.item)
  const [active, setActive] = useState(true)
  return (
    <View style={styles.container}>
      <View style={styles.outer}>
        <View style={styles.inner}>
          <Image source={props.item.coach.imageUrl != null ? { uri: props.item.coach.imageUrl } : require('../../assets/splash.png')}
            resizeMode="cover" style={styles.image} />
          <View>
            <Text style={styles.text}>{props.item.coach.firstName} {props.item.coach.lastName}</Text>
            <Text style={styles.text1}>Started {moment(props.item.athleteRequest.createdAt).format("MMM DD")}</Text>
          </View>
        </View>
        <View style={styles.act}>
          {props.active ?
            <Text style={styles.helveticaLight}>Active</Text>
            :
            <TouchableOpacity onPress={() => { props.navigation.navigate('Review', { bookingData: props.item }) }}>
              <Text style={styles.helveticaLight}>Review</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
      <View style={styles.bar}></View>
      <View style={styles.bottom}>
        <Text style={styles.text2}>{props.item.athleteRequest.trainingType.title} Coaching</Text>
        <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row' }} onPress={() => { props.navigation.navigate('Bookingdetails', { bookingId: props.item.id, data: props.item }) }}>
          <Text style={[styles.text2, { color: Colors.blackColor }]} >View Details</Text>
          <Image source={require('../../assets/right-arrow.png')} style={styles.image1} />
        </TouchableOpacity>
      </View>
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
    padding: 5
  },
  text:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 16
  },
  text1:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 12,
    color: Colors.textColor
  },
  text2:
  {
    fontFamily: FontFamily.helvetica,
    fontSize: 14,
    color: Colors.textColor
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
    alignItems: 'center'
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

});

export default BookingCard;
