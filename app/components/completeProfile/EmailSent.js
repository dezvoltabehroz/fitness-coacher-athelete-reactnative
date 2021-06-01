import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import Input from "../../common/Input";
import { FontFamily } from "../../style/typograpy";
import { Colors } from "../../style/colors";
import { AuthServices } from "../../services";
import { Snackbar } from 'react-native-paper';
import RegisterationModal from '../../common/RegisterationModal';
// import * as verifyEmailService from "../../../services/VerifyEmail";
// import * as resendOtpService from "../../../services/ResendCode";
import NetInfo from "@react-native-community/netinfo";
import { errorUtils } from "../../common/Utilities";
import Container from "../../common/Container";

const EmailSent = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [code, setCode] = useState("");
  const [checkCode, setCheckCode] = useState("");
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resetLoading, resetSetLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [state, setState] = useState({
    email: props.route.params.email,
  });

  const [checkEmail, setCheckEmail] = useState(false);

  _onHandleChange = (name, value) => {
    if (name == "email") {
      setCheckEmail(false);
      setState({
        email: value,
      });
    } else if (name == "code") {
      setCheckCode(false);
      setCode(value);
    }
  };

  const checkNetwork = async () => {
    setLoading(true)
    try {
      let state = await NetInfo.fetch();
      if (state.isConnected == true) {
        checkValidations();
      } else {
        setMessage(`Please check your internet connection and try again`)
        setVisible(true);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const checkValidations = () => {
    if (state.email == "") {
      setLoading(false)
      setCheckEmail(true);
    } else if (code == "") {
      setLoading(false)
      setCheckCode(true);
    } else if (!validateEmail()) {
      setLoading(false)
      setMessage(`Please enter a proper email`)
      setVisible(true);
    } else if (String(code).length <= 3) {
      setLoading(false)
      setMessage(`Code must be 4 characters`)
      setVisible(true);
    } else {
      // resendCode();
      enterCode();
    }
  };
  // useEffect(() => {
  //   setLoading(false)
  // }, [loading])

  const validateEmail = () => {
    let email = state.email;
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
  };

  const enterCode = async () => {
      let verificationCode = {
        otp: parseInt(code),
        email: `${state.email}`
      };
      console.log("userdata is", verificationCode);

      try {
        let response = await AuthServices.verifyOtp(verificationCode);
        if (response.data.success != undefined && response.data.success == true) {
          console.log("response", response);
          setModalVisible(!modalVisible)
          setLoading(false)
          // props.navigation.replace("Login");

        } else {
          setMessage(`${response.data.msg}`)
          setVisible(true);
          setLoading(false)
        }
      } catch (error) {
        console.log(error.response.data)
        setLoading(false)
        setMessage(`${errorUtils.getError(error)}`)
        setVisible(true);
        console.log(error);
      }
  };

  const resendCode = async () => {
    resetSetLoading(true)
    try {
      let response = await AuthServices.reSendOtp(state.email);
      if (response.data.success != undefined && response.data.success == true) {
        console.log("response", response);
        setMessage(`${response.data.msg}`)
        setVisible(true);
        resetSetLoading(false)
      } else {
        setMessage(`${response.data.msg}`)
        setVisible(true);
        resetSetLoading(false)
      }
    } catch (error) {
      setMessage(`${errorUtils.getError(error)}`)
      setVisible(true);
      resetSetLoading(false)
      console.log(error);
    }
  };

  return (
    <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
      <View style={styles.safeArea}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/coacherlogo.png")}
            style={styles.logo}
          />
          <Text style={{ textAlign: "center" }}>
            Please enter the code sent to your email address to Verfiy your
            Account.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            text={"Email"}
            value={state.email}
            editable={false}
            onChangeText={(value) => {
              _onHandleChange("email", value);
              setCheckEmail(false);
            }}
          />
          {checkEmail == true && (
            <Text style={styles.errorStyle}>Code cannot be empty</Text>
          )}
          <Input
            text={"Verification Code"}
            value={code}
            keyboardType={"number-pad"}
            onChangeText={(value) => {
              _onHandleChange("code", value);
              setCheckCode(false);
            }}
          />
          {checkCode == true && (
            <Text style={styles.errorStyle}>Code cannot be empty</Text>
          )}

          <TouchableOpacity
            disabled={loading || resetLoading}
            style={styles.btnStyle}
            onPress={() => checkNetwork()}
          >
            {
              loading ?
                <ActivityIndicator size="small" color="white" />
                :
                <Text style={styles.btnText}>Verify</Text>
            }

          </TouchableOpacity>
          <TouchableOpacity
            disabled={loading || resetLoading}
            style={styles.btnStyle}
            onPress={() => resendCode()}
          >
            {
              resetLoading ?
                <ActivityIndicator size="small" color="white" />
                :
                <Text style={styles.btnText}>Resend Code</Text>
            }


          </TouchableOpacity>
        </View>
      </View>
      <RegisterationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={props.navigation} />
    </Container>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    // height: "100%",
  },
  snackbarContainerStyle: {
    // top: '10%',
    alignItems: "center"
  },
  logoContainer: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: "10%",
  },
  inputContainer: {
    // height: "100%",
    justifyContent: "space-evenly",
    // backgroundColor: "pink",
  },
  btnStyle: {
    backgroundColor: Colors.buttonColor,
    width: "80%",
    height: 50,
    marginTop: "5%",
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontFamily: FontFamily.helveticaBold,
  },
  errorStyle: {
    fontSize: 12,
    color: "red",
    paddingLeft: 20,
  },

});
export default EmailSent;
