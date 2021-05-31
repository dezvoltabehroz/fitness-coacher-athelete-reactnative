import React, { useEffect } from 'react';
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
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { FontFamily } from '../style/typograpy';
import { Colors } from '../style/colors';
import Modal from 'react-native-modal';
import { Col } from 'native-base';
import Button from './Button';
import { Snackbar } from 'react-native-paper';
const height = Dimensions.get('window').height;
const DetailsModal = ({ modalVisible, onPress, onRequest, loading,firstName,lastName }) => {
  return (
    <Modal
      style={styles.modal}
      width={'90%'}
      isVisible={modalVisible}
      hasBackdrop={true}
      backdropColor={Colors.modalOverly}
      backdropOpacity={0.7}
      swipeDirection={['up']}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
    >
      <View style={styles.container}>
        {
          loading ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={20} color={'#030E2D'} />
            </View>
            :
            <>
              <Image source={require('../assets/triangle.png')} style={styles.image} />
              <Text style={styles.text}>{firstName} {lastName} has Marked the booking as completed</Text>
              <Text style={styles.text1}>If everthing requested in the booking has been completed bt {firstName}, you can confirm the booking as complete, otherwise you can request for a revision.</Text>
              <Button onPress={() => { onPress(); }} text={'Confirm as Complete'} />
              <TouchableOpacity onPress={() => onRequest()} style={styles.button}>
                <Text style={styles.text2}>Request a Revision</Text>
              </TouchableOpacity>
            </>
        }
      </View>
    </Modal >
  );
};

const styles = StyleSheet.create({
  modal: {
    height: (height * 60) / 100,
  },
  container: {
    width: '100%',
    backgroundColor: Colors.whiteColor,
    height: (height * 60) / 100,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20
    // justifyContent: 'center',
  },
  image:
  {
    height: 30,
    width: 30,
    marginTop: 30
  },
  text:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 15,
    marginTop: 10,
    color: 'red',
    width: '98%',
    textAlign: 'center'

  },
  text1:
  {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 15,
    marginTop: 10,
    color: Colors.blackColor,
    width: '95%',
    textAlign: 'center'

  },
  text2:
  {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 15,
    color: Colors.blackColor,

  },
  button:
  {
    height: 50,
    width: '98%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.textColor,
    marginTop: 10

  }

});

export default DetailsModal;
