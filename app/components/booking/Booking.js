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
  ActivityIndicator,
  Platform,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ToastAndroid
} from 'react-native';
import { BookingServices } from '../../services';
import { Colors } from '../../style/colors'
import { FontFamily } from '../../style/typograpy'
import BookingCard from './BookingCard';
import { connect } from 'react-redux';
const height = Dimensions.get('window').height;

const BookingScreen = (props) => {
  const [active, setActive] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getBookings();
  }, []);


  const getBookings = async () => {
    setLoading(true)
    // console.log("booking details are", state.bookingDetails);
    BookingServices.getBookings(props?.user?.id, props?.token)
      .then((response) => {
        // alert("success");
        if (response.data.success) {
          let arr = Array(10);
          setLoading(false)
          // setBookings(response.data.coursesDetail.rows);
          setBookings(arr);
          console.log("booking details are", bookings);
        }
        else {
          ToastAndroid.show(`${response.data.msg}`, ToastAndroid.LONG)
          setLoading(false)
        }

      })
      .catch((error) => {
        ToastAndroid.show(`${error}`, ToastAndroid.LONG)
        let arr = Array(3);
        setLoading(false)
        setBookings(arr);
        console.log("error =", error);
      });
  };



  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.header}>
        <Text style={styles.text}>COACHER</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { props.navigation.navigate("Create") }}>
            <Image source={require('../../assets/add.png')} style={styles.image1} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { props.navigation.navigate("AccountSettings") }}>
            <Image source={require('../../assets/splash.jpg')} style={styles.image} />
          </TouchableOpacity>

        </View>
      </View>
      <View style={styles.bottom}>
        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { setActive(true) }}>
            <Text style={[styles.text1, { color: !active ? Colors.textColor : Colors.blackColor }]}>My Active Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setActive(false) }}>
            <Text style={[styles.text1, { color: active ? Colors.textColor : Colors.blackColor, marginLeft: 20 }]}>Completed Bookings</Text>
          </TouchableOpacity>
        </View>
        {
          loading ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={20} color={'#030E2D'} />
            </View>
            :
            <FlatList
              data={bookings}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <BookingCard navigation={props.navigation} active={active} />
                )
              }}
            />
        }
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
    alignItems: "center",
    justifyContent: 'space-between'
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
    marginRight: 10,
    resizeMode: 'contain'
  },
  text1:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 14
  },

});
const mapStateToProps = (state) => ({
  user: state.authReducer,

});

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
};

export default connect(
  mapStateToProps
)(BookingScreen);
