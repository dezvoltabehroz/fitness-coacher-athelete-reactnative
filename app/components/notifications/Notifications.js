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
  NativeModules,
  Platform,
  Dimensions,
  FlatList
} from 'react-native';
import { NotificationServices } from '../../services';
import { Colors } from '../../style/colors'
import { FontFamily } from '../../style/typograpy'
import NotificationCard from './NotificationsCard';
import { connect } from 'react-redux';
const height = Dimensions.get('window').height
const NotificationsScreen = (props) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getNotifications();
  }, [])
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

  const getNotifications = () => {
    NotificationServices.getNotifications(props?.token)
      .then((res) => {
        console.log(res.data)
        setdata(res.data.notifications)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }


  console.log("props?.user : ", props?.token)

  return (
    <View style={styles.container}>
      {
        loading ?
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={20} color={'#030E2D'} />
          </View>
          :
          <>
            <StatusBar
              barStyle="dark-content"
              translucent
              backgroundColor={'transparent'}
            />
            <ScrollView style={styles.bottom}>
              {data.length == 0 ?
                <View style={{ marginTop: 200, justifyContent: "center", alignItems: "center" }}>
                  <Text>No notification found!</Text>
                </View>
                :
                <FlatList
                  data={data}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <NotificationCard
                        token={props?.token}
                        trainingTypes={props?.trainingTypes}
                        subCategories={props?.subCategories}
                        skills={props?.skills}
                        item={item}
                        navigation={props.navigation} />

                    )
                  }}
                />}
              <View style={{ height: 20 }}></View>
            </ScrollView>
          </>}
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
    paddingTop: 10
  },

});

const mapStateToProps = (state) => ({
  user: state.authReducer.userData || {},
  token: state.authReducer.userToken || {},
  trainingTypes: state.trainingReducer.trainingTypes || {},
  skills: state.trainingReducer.skills || {},
  subCategories: state.trainingReducer.subCategories || {}
});
export default connect(mapStateToProps)(NotificationsScreen);
