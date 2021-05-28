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
import Container from './Container';
const height = Dimensions.get('window').height;
const DetailsModal = ({ modalVisible, onPress, setVisible, message, visible }) => {
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
      <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
        <View style={styles.container}>
          <Image source={require('../assets/triangle.png')} style={styles.image} />
          <Text style={styles.text}>Zimry Mayfield has Marked the booking as completed</Text>
          <Text style={styles.text1}>If everthing requested in the booking has been completed bt Zimry, you can confirm the booking as complete, otherwise you can request for a revision.</Text>
          <Button onPress={() => { onPress(); }} text={'Confirm as Complete'} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text2}>Request a Revision</Text>
          </TouchableOpacity>
        </View>
      </Container>
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
