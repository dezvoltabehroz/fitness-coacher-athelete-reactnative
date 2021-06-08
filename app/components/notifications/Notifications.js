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
import { throttle } from 'lodash';
const height = Dimensions.get('window').height
const NotificationsScreen = (props) => {
  const [loading, setLoading] = useState(true)
  const [offset, setOffSet] = useState(0)
  const [reachLoading, setReachLoading] = useState(false)
  const [data, setdata] = useState([])

  useEffect(() => {
    getNotifications();
  }, [])
  const getNotifications = () => {
    NotificationServices.getNotifications(0, props?.token)
      .then((res) => {
        console.log(res.data)
        setdata(res.data.notifications)
        setLoading(false)
        setOffSet(offset + 10)
      })
      .catch((err) => console.log(err))
  }
  const getMoreNotifications = () => {
    setReachLoading(true)
    NotificationServices.getNotifications(offset, props?.token)
      .then((res) => {
        let array = [...data, ...res.data.notifications]
        if (data.length != array.length) {
          setdata(array)
          setOffSet(offset + 10)
          setReachLoading(false)
        }
        else {
          setReachLoading(false)
        }
      })
      .catch((err) => console.log(err))
  }


  // console.log("props?.user : ", props?.token)
  // const throttled = () => throttle(getMoreNotifications(), 1000, { leading: true, trailing: false })
  return (
    <View style={styles.container}>

      <>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={'transparent'}
        />
        <ScrollView style={styles.bottom}>
          {
            loading ?
              <View style={{ flex: 1, marginTop: "50%", justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={20} color={'#030E2D'} />
              </View>
              :
              <>
                {data.length == 0 ?
                  <View style={{ marginTop: 200, justifyContent: "center", alignItems: "center" }}>
                    <Text>No notification found!</Text>
                  </View>
                  :
                  <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    // onEndReachedThreshold={0.3}
                    onEndReached={() => {
                      getMoreNotifications();
                      // throttled()
                    }}
                    // extraData={data}
                    ListFooterComponent={() => {
                      if (data?.length > 0 && reachLoading == true) {
                        return <ActivityIndicator size={'small'} color={'#030E2D'} />
                      }

                      return <View />
                    }}
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
              </>
          }
          <View style={{ height: 20 }}></View>
        </ScrollView>
      </>
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
