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
import { Snackbar } from 'react-native-paper';
import { errorUtils } from '../../common/Utilities';
import Container from '../../common/Container';
const height = Dimensions.get('window').height;

const BookingScreen = (props) => {
  const [active, setActive] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [loading, setLoading] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  useEffect(() => {
    getBookings();
    getCompletedBookings();
  }, []);


  const getBookings = async () => {
    setLoading(true)
    // console.log("booking details are", state.bookingDetails);
    BookingServices.getMyActiveBookings(props?.user?.id, props?.token)
      .then((response) => {
        // alert("success");
        if (response.data.success) {
          setLoading(false)
          setBookings(response.data.coursesDetail.rows);
        }
        else {
          setMessage(`${response.data.msg}`)
          setVisible(true);
          setLoading(false)
        }
      })
      .catch((error) => {
        setMessage(`${errorUtils.getError(error)}`)
        setVisible(true);
        setLoading(false)
      });
  };

  const getCompletedBookings = async () => {
    setLoading(true)
    BookingServices.completedBookings(props?.user?.id, props?.token)
      .then((response) => {
        if (response.data.success) {
          setLoading(false)
          setCompletedBookings(response.data.coursesDetail.rows);
        }
        else {
          setMessage(`${response.data.msg}`)
          setVisible(true);
          setLoading(false)
        }
      })
      .catch((error) => {
        setMessage(`${errorUtils.getError(error)}`)
        setVisible(true);
        setLoading(false)
      });
  };

  const handleCancelBooking = (id) => {
    setCancelLoading(true)
    BookingServices.cancelRequest({ "RequestId": id }, props?.token)
      .then((response) => {
        console.log("response.data : ",response.data)
        setMessage(`${response.data.msg}`)
        setVisible(true);
        setCancelLoading(false)
        getBookings();
      })
      .catch((error) => {
        console.log("error.response.data : ",error.response.data)
        setMessage(`${errorUtils.getError(error)}`)
        setVisible(true);
        setCancelLoading(false)
      });
  }

  return (
    <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
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
              <Image source={props?.user?.imageUrl != null ? { uri: props?.user?.imageUrl } : require('../../assets/splash.png')}
                style={styles.image} />
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
            loading || cancelLoading ?
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={20} color={'#030E2D'} />
              </View>
              :
              active ?
                bookings.length == 0 ?
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>No Bookings Found</Text>
                  </View>
                  :
                  <FlatList
                    data={bookings}
                    contentContainerStyle={{ paddingBottom: "30%" }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                      return (
                        <BookingCard item={item} navigation={props.navigation} active={active} onCancel={(id) => handleCancelBooking(id)} />
                      )
                    }}
                  />
                :
                completedBookings.length == 0 ?
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>No Bookings Found</Text>
                  </View>
                  :
                  <FlatList
                    data={completedBookings}
                    contentContainerStyle={{ paddingBottom: "30%" }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                      return (
                        <BookingCard item={item} navigation={props.navigation} active={false} />
                      )
                    }}
                  />
          }
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  snackbarContainerStyle: {
    bottom: '10%',
    alignItems: "center"
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
  user: state.authReducer.userData,
  token: state.authReducer.userToken

});

export default connect(mapStateToProps)(BookingScreen);
