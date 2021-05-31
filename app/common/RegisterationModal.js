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
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { FontFamily } from '../style/typograpy';
import { Colors } from '../style/colors';
import Modal from 'react-native-modal';
import { Col } from 'native-base';
import Button from './Button';
const height = Dimensions.get('window').height;
const RegisterationModal = ({ modalVisible, setModalVisible, navigation }) => {
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
        <Image source={require('../assets/lifetime.png')} style={styles.image} />
        <Text style={styles.text}>Registeration SuccessFull</Text>
        <Text style={styles.text1}>Thank you for the registeration</Text>
        <Button onPress={() => { setModalVisible(false), navigation.replace('Login') }} flag={true} text={'Ok'} />

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: (height * 40) / 100,
  },
  container: {
    width: '100%',
    backgroundColor: Colors.whiteColor,
    height: (height * 38) / 100,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20
    // justifyContent: 'center',
  },
  image:
  {
    height: 30,
    width: 30,
    marginTop: 50
  },
  text:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 15,
    marginTop: 10

  },
  text1:
  {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 15,
    marginTop: 10,
    color: Colors.blackColor,
    width: '95%',
    textAlign: 'center'

  }

});

export default RegisterationModal;
