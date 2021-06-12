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
  FlatList,
  RefreshControl
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
  const [dataArr, setArray] = useState([]);
  const [scrolled, setScrolled] = useState(false)
  let onEndReachedCalledDuringMomentum = true;
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
        getMoreNotifications()
      })
      .catch((err) => console.log(err))
  }

  const getMoreNotifications = () => {

    if (!scrolled) {
      return null;
    }
    else {
      setReachLoading(true)
      NotificationServices.getNotifications(offset, props?.token)
        .then((res) => {
          let array = [...data, ...res.data.notifications]
          setOffSet(offset + 10)
          setdata(array)
          setReachLoading(false)
          setScrolled(false)
        })
        .catch((err) => console.log(err))
    }

  }

  const _scrolled = () => {
    setScrolled(true)
  }

  // console.log("props?.user : ", props?.token)
  let throttled = () => throttle(getMoreNotifications, 1000, { leading: true, trailing: false })
  return (
    <View style={styles.container}>

      <>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={'transparent'}
        />
        <View style={styles.bottom}>
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
                    contentContainerStyle={{ }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={() => getNotifications()} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={() => getMoreNotifications()}
                    onEndReachedThreshold={0.5}
                    onScrollBeginDrag={() => _scrolled()}
                    onMomentumScrollBegin={() => onEndReachedCalledDuringMomentum = false}
                    ListFooterComponent={() => {
                      if (data?.length > 0 && reachLoading == true) {
                        return <ActivityIndicator size={'small'} color={'#030E2D'} />
                      }

                      return null
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
        </View>
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
    height: '90%',
    backgroundColor: Colors.whiteColor,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: '22%',
    paddingHorizontal: 20,
    paddingTop: 10,
    // paddingBottom: "10%"
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
