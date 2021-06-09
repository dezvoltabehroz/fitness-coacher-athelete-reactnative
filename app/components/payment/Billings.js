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
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { PaymentServices } from '../../services';
import { Colors } from '../../style/colors';
import Container from '../../common/Container';
import { FontFamily } from '../../style/typograpy'
import BillingsCard from './BillingsCard';
import { connect } from 'react-redux';
import { errorUtils } from '../../common/Utilities';
const height = Dimensions.get('window').height
const BillingsScreen = (props) => {
  const [billings, setBillings] = useState([]);
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  useEffect(() => {
    getBillings();
  }, []);

  const getBillings = async () => {
    setLoading(true)
    // console.log("booking details are", state.bookingDetails);
    PaymentServices.getBillings(props?.user?.id, props?.token)
      .then((response) => {
        // alert("success");
        if (response.data.success) {
          setLoading(false)
          setBillings(response.data.payments);
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

  return (
    <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.bottom}>
        {
          loading ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={20} color={'#030E2D'} />
            </View>
            :
            <FlatList
              data={billings}
              contentContainerStyle={{paddingBottom:80}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <BillingsCard item={item} />
                )
              }}
            />
        }
      </View>
      <View style={{ height:80 }}></View>
    </View>
    </Container>

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
    marginTop: '22%',
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

export default connect(mapStateToProps)(BillingsScreen);
