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
    NativeModules,
    Platform,
    Dimensions,
    ToastAndroid
} from 'react-native';
import { Colors } from '../../style/colors'
import { Header, Content, Tab, Tabs } from 'native-base';
import Input from "../../common/Input";
import Container from "../../common/Container";
import { FontFamily } from "../../style/typograpy";
import Button from "../../common/Button";
import { useKeyboard } from "./../index";
import { Link } from "@react-navigation/native";

import { TextInputMask } from "react-native-masked-text";

import NetInfo from "@react-native-community/netinfo";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthServices } from "../../services";
import { authActions } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Snackbar } from 'react-native-paper';
import messaging from '@react-native-firebase/messaging';
import { errorUtils } from '../../common/Utilities';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
var keyheight = ''
const SplashScreen = (props) => {

    const [state, setState] = useState({
        email: "",
    });

    const [loginEmail, setLoginEmail] = useState("");
    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState("")
    const [checkFirst_name, setCheckFirstname] = useState(false);
    const [checkLast_name, setCheckLastname] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkLoginEmail, setCheckLoginEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [checkLoginPassword, setCheckLoginPassword] = useState(false);
    const [checkConfirmPassword, setCheckConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const onHandleLoginInputs = (name, value) => {
        if (name == "loginEmail") {
            setCheckLoginEmail(false);
            setLoginEmail(value);
        } else if (name == "loginPassword") {
            setCheckLoginPassword(false);
            setLoginPassword(value);
        }
    };

    const loginValidations = () => {
        if (loginEmail == "") {
            setCheckLoginEmail(true);
        } else if (loginPassword == "") {
            setCheckLoginPassword(true);
        } else {
            loginService();
        }
    };

    const requestUserPermission = async function (data) {
        try {
            const authStatus = await messaging().hasPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('permission granted');
                getFcmToken(data);
            }
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }

    }

    const getFcmToken = async (userData) => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            let data = {
                id: userData.id,
                fcmToken: fcmToken,
                token: userData.token
            }
            AuthServices.addFCMToken(data)
                .then(async (res) => {
                    console.log("res.data :", res.data)
                    if (res.data.status) {
                        await props.authActions.getUserProfile(userData, props.navigation.replace);
                    } else {
                        await props.authActions.getUserProfile(userData, props.navigation.replace);
                        // this.props.actions.removeUser(this.props.navigation.replace)
                    }
                })
                .catch((err) => { console.log("err : ", err); props.authActions.removeUser(props.navigation.replace) })
        } else {
            console.log("Failed", "No token received");
        }

    }

    const loginService = async () => {
        setLoading(true);
        let loginDetails = {
            email: loginEmail,
            password: loginPassword,
        };
        console.log(loginDetails)
        AuthServices.userLogin(loginDetails)
            .then(async (res) => {
                if (res.status == 200) {
                    console.log(res.data)
                    await AsyncStorage.setItem('Token', JSON.stringify(res.data.userData.tokenInfo))
                    await AsyncStorage.setItem('USER', JSON.stringify(res.data.userData.tokenInfo))
                    let userData = {
                        id: res.data.userData.userInfo.id,
                        token: res.data.userData.tokenInfo
                    }
                    requestUserPermission(userData)
                    console.log("res :", res.data.userData.tokenInfo);
                }
            })
            .catch((err) => {
                setLoading(false);
                setMessage(`${errorUtils.getError(err)}`)
                setVisible(true);
                console.log(err.response.data)
            })
    };

    const didShow = (height) => {
        console.log('Keyboard show. Height is ' + height)
        setViewHeight(screenHeight - height)
    }

    const didHide = () => {
        console.log('Keyboard hide');
        setViewHeight(screenHeight);
    }
    const [keyboardHeigth] = useKeyboard(didShow, didHide); /* initialize the hook (optional parameters) */

    const [viewHeight, setViewHeight] = useState(screenHeight) /* for example with didShow and didHide */

    useEffect(() => {
        console.log(keyboardHeigth);
        keyheight = keyboardHeigth
    }, [keyboardHeigth])


    const checkNetwork = async () => {
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
        if (first_name == "") {
            setCheckFirstname(true);
        } else if (last_name == "") {
            setCheckLastname(true);
        } else if (state.email == "") {
            setCheckEmail(true);
        } else if (password == "") {
            setCheckPassword(true);
        } else if (confirmPassword == "") {
            setCheckConfirmPassword(true);
        } else if (String(first_name).length <= 2) {
            setMessage(`Firstname must be atleast 3 characters`)
            setVisible(true);
        } else if (String(last_name).length <= 2) {
            setMessage(`Lastname must be atleast 3 characters`)
            setVisible(true);
        } else if (!validateEmail()) {
            setMessage(`Please enter a proper email`)
            setVisible(true);
        } else if (String(password).length <= 7) {
            setMessage(`Password must be between 8 to 16 characters`)
            setVisible(true);
        } else if (confirmPassword != password) {
            setMessage(`Confirm Password Mismatch`)
            setVisible(true);
        } else {
            navigateToNextScreen();
        }
    };

    const validateEmail = () => {
        let email = state.email;
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(String(email).toLowerCase());
    };

    const _onHandleChange = (name, value) => {
        if (name == "first_name") {
            setCheckFirstname(false);
            setFirstname(value);
        } else if (name == "email") {
            setCheckEmail(false);
            setState({ email: value });
        } else if (name == "last_name") {
            setCheckLastname(false);
            setLastname(value);
        } else if (name == "password") {
            setCheckPassword(false);
            setPassword(value);
        } else if (name == "confirmPassword") {
            setCheckConfirmPassword(false);
            setConfirmPassword(value);
        }
    };

    const navigateToNextScreen = () => {
        let data = {
            firstName: first_name,
            lastName: last_name,
            email: state.email,
            password: password,
            confirmPassword: confirmPassword,
        };
        props.navigation.navigate('CompleteProfile', data);
        console.log("data is ", data);
    };

    return (
        <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    translucent
                    backgroundColor={'transparent'}
                />
                <Image source={require('../../assets/coacherlogo.png')} resizeMode="contain" style={[styles.logo, { marginTop: keyboardHeigth != 0 ? 0 : '23%', }]} />

                <View style={styles.bottom}>
                    <Tabs tabBarUnderlineStyle={[styles.tabUnderline]} tabContainerStyle={{ elevation: 0, borderTopLeftRadius: 30, borderTopRightRadius: 30, height: 70, borderWidth: 0 }}>
                        <Tab heading="Login" tabStyle={[styles.tab, { borderTopLeftRadius: 30 }]} activeTabStyle={[styles.activeTab, { borderTopLeftRadius: 30 }]}
                            textStyle={styles.tabText} activeTextStyle={styles.activeTabText} >
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ height: 380 }}>
                                    <Input
                                        text={"Email-Address"}
                                        value={loginEmail}
                                        onChangeText={(value) => {
                                            onHandleLoginInputs("loginEmail", value);
                                            setCheckLoginEmail(false);
                                        }}
                                    />
                                    {checkLoginEmail == true && (
                                        <Text style={styles.errorStyle}>Email cannot be empty</Text>
                                    )}
                                    <Input
                                        text={"Password"}
                                        secureTextEntry={true}
                                        value={loginPassword}
                                        onChangeText={(value) => {
                                            onHandleLoginInputs("loginPassword", value);
                                            setCheckLoginPassword(false);
                                        }}
                                    />
                                    {checkLoginPassword == true && (
                                        <Text style={styles.errorStyle}>Password cannot be empty</Text>
                                    )}
                                    <View style={{ paddingHorizontal: 20 }}>

                                        <Button loading={loading} text={'Login'} onPress={() => loginValidations()} />
                                    </View>
                                    <Link style={styles.linkText} to="/ForgotPassword">Forgot your password? </Link>
                                </View>
                            </ScrollView>
                        </Tab>
                        <Tab heading="Register"
                            tabStyle={[styles.tab, { borderTopRightRadius: 30 }]}
                            activeTabStyle={[styles.activeTab, { borderTopRightRadius: 30 }]}
                            textStyle={styles.tabText}
                            activeTextStyle={styles.activeTabText} >
                            <ScrollView
                                contentContainerStyle={{
                                    paddingBottom: screenHeight > 667 ? "30%" : "20%",
                                }}
                                showsVerticalScrollIndicator={false}
                            >
                                <View style={{}}>
                                    <Input
                                        text={"First Name"}
                                        value={first_name}
                                        onChangeText={(value) => {
                                            _onHandleChange("first_name", value);
                                            setCheckFirstname(false);
                                        }}
                                    />
                                    {checkFirst_name == true && (
                                        <Text style={styles.errorStyle}>
                                            Fisrt Name cannot be empty
                                        </Text>
                                    )}
                                    <Input
                                        text={"Last Name"}
                                        value={last_name}
                                        onChangeText={(value) => {
                                            _onHandleChange("last_name", value);
                                            setCheckFirstname(false);
                                        }}
                                    />
                                    {checkLast_name == true && (
                                        <Text style={styles.errorStyle}>
                                            Last Name cannot be empty
                                        </Text>
                                    )}

                                    <Input
                                        text={"Email Address"}
                                        value={state.email}
                                        onChangeText={(value) => {
                                            _onHandleChange("email", value);
                                            setCheckEmail(false);
                                        }}
                                    />
                                    {checkEmail == true && (
                                        <Text style={styles.errorStyle}>Email cannot be empty</Text>
                                    )}
                                    <Input
                                        secureTextEntry={true}
                                        text={"Password"}
                                        value={password}
                                        onChangeText={(value) => {
                                            _onHandleChange("password", value);
                                            setCheckPassword(false);
                                        }}
                                    />
                                    {checkPassword == true && (
                                        <Text style={styles.errorStyle}>
                                            Password cannot be empty
                                        </Text>
                                    )}
                                    <Input
                                        secureTextEntry={true}
                                        text={"Confirm Password"}
                                        value={confirmPassword}
                                        onChangeText={(value) => {
                                            _onHandleChange("confirmPassword", value);
                                            setCheckPassword(false);
                                        }}
                                    />
                                    {checkConfirmPassword == true && (
                                        <Text style={styles.errorStyle}>
                                            Confirm password cannot be empty
                                        </Text>
                                    )}
                                    <View style={{ paddingHorizontal: 20 }}>
                                        <Button text={'Next'} onPress={() => { checkNetwork(); }} />
                                    </View>
                                    <Text style={styles.text}>By signing up, you agree to ECHO's Terms of Use & Privacy Policy</Text>

                                    <View style={{ marginBottom: 150 }}></View>
                                </View>
                            </ScrollView>
                        </Tab>
                    </Tabs>
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    snackbarContainerStyle: {
        bottom: 30,
        alignItems: "center"
    },
    tab:
    {
        backgroundColor: Colors.whiteColor,
        // paddingTop:20

    },
    tabText:
    {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.textColor,
        fontFamily: FontFamily.helveticaBold

    },
    tabUnderline: {
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
    activeTabText:
    {
        fontSize: 15,
        fontWeight: '400',
        color: "black",
        fontFamily: FontFamily.helveticaBold

    },
    activeTab:
    {
        backgroundColor: '#fff'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    errorStyle: {
        fontSize: 12,
        color: "red",
        paddingLeft: 20,
    },
    logo:
    {
        height: 100,
        width: 500,
        alignSelf: 'center',
        marginTop: '23%',
        marginBottom: '10%'

    },
    text:
    {
        fontSize: 11,
        textAlign: "center",
        color: Colors.blackColor,
        fontFamily: FontFamily.helveticaBold,
        marginHorizontal: 25,
        marginTop: 10

    },
    bottom:
    {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.whiteColor,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35
    },
    linkText: {
        color: Colors.buttonColor,
        marginTop: "5%",
        textAlign: "center",
    },
});
const mapStateToProps = (state) => ({
    user: state.authReducer,

});

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SplashScreen);
