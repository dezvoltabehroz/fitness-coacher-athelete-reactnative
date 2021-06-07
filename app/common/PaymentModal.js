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
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { FontFamily } from '../style/typograpy';
import { Colors } from '../style/colors';
import Modal from 'react-native-modal';
import { Col } from 'native-base';
import { CardField, initStripe, useStripe } from '@stripe/stripe-react-native';

import Button from './Button';
const height = Dimensions.get('window').height;
const PaymentModal = ({ modalVisible, setModalVisible, onPress, price, loading, navigation, setSuccessModalVisible }) => {
  const [details, setDetails] = useState({})
  useEffect(() => {
    initStripe({
        publishableKey: 'pk_test_51IVaauJYCYbx3gzyXHFSWqkzjQourDKiOCqDybwCgC1DxjXf7ilt5jEeyoHDJWo9SkdD6uIGasM9SomiSTl2HRPQ002trNTCop'
    });
}, []);
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
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={styles.container}>
        <Image source={require('../assets/credit.png')} style={styles.image} />
        <Text style={styles.text}>Payment Confirmation</Text>
        <Text style={styles.text1}>You will be charged ${price} for this booking.</Text>
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={(e) => {
            console.log('cardDetails', e);
            setDetails(e)
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField);
          }}
        />
        <View style={styles.buttonView}>
          <TouchableOpacity 
          disabled={details?.complete == true ? false : true}
           style={[styles.button, { backgroundColor: details?.complete ? Colors.buttonColor : "lightgray" }]}
            onPress={async() => {
              onPress();  }}>
            {
              loading ?
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size={20} color={'#FFFFFF'} />
                </View>
                :
                <Text style={styles.buttontext}>Confirm Payment</Text>
            }

          </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={() => { setModalVisible(false) }}>
            <Text style={styles.buttontext1}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
    height: (height * 50) / 100,
    borderRadius: 20,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  image:
  {
    height: 40,
    width: 40,
    marginTop: 40
  },
  text:
  {
    fontFamily: FontFamily.helveticaBold,
    color: 'red',
    fontSize: 15,
    marginTop: 10

  },
  buttontext:
  {
    fontFamily: FontFamily.helveticaBold,
    color: Colors.whiteColor,
    fontSize: 15,

  },
  buttontext1:
  {
    fontFamily: FontFamily.helveticaBold,
    color: Colors.textColor,
    fontSize: 15,

  },
  text1:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 15,
    marginTop: 10,
    color: Colors.blackColor,
    width: '85%',
    textAlign: 'center'

  },
  buttonView:
  {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  button:
  {
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    backgroundColor: Colors.buttonColor
  },
  button1:
  {
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.textColor,
    width: '48%',
  }

});

export default PaymentModal;
