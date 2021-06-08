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
import { FontFamily } from '../../style/typograpy'
import { connect } from 'react-redux';
import moment from 'moment';
const height = Dimensions.get('window').height
const BillingsCard = (props) => {
  return (
    <View style={styles.container} >
      <View style={styles.outer}>
        <View style={styles.inner}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={props.user.imageUrl != null ? { uri: props.user.imageUrl } : require('../../assets/splash.png')}
              style={styles.image} />
            <View>
              <Text style={styles.text}>{props?.user.firstName} {props?.user.lastName}</Text>
              <Text style={styles.text}>{props?.user.uniqueId}</Text>

            </View>
          </View>
          <Text style={styles.text1}>${props?.item.amount}</Text>
        </View>
      </View>
      <View style={styles.bar}></View>
      <View style={styles.bottom}>
        <Text style={styles.text2}>{moment(props?.item.createdAt).format('MM/DD/YYYY | hh:mm a')}</Text>

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
    fontSize: 14,
    textTransform: "uppercase"
  },
  text1:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 14,
    color: 'red'
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
    //   alignItems:'center',
    justifyContent: 'space-between',
    width: '100%'
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
    marginTop: 5,
    width: '85%',
    alignSelf: 'flex-end'
  },
  bottom:
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    width: '85%',
    alignSelf: 'flex-end'
  },

});
const mapStateToProps = (state) => ({
  user: state.authReducer.userData,
  token: state.authReducer.userToken
});

export default connect(mapStateToProps)(BillingsCard);

