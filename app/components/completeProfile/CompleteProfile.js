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
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    Dimensions,
    FlatList,
    ToastAndroid
} from 'react-native';
import { Colors } from '../../style/colors'
import { FontFamily } from '../../style/typograpy';
import Button from '../../common/Button'
import Input from "../../common/Input";
import { RadioButton } from 'react-native-paper';
import RegisterationModal from '../../common/RegisterationModal';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CountryPicker, { FlagButton } from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-input';
import moment from 'moment';
import NetInfo from "@react-native-community/netinfo";
import { AuthServices } from '../../services';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Calendar from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Container from '../../common/Container';
import { errorUtils } from '../../common/Utilities';
import axios from 'axios';
import { Buffer } from 'buffer';
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const CompleteProfile = ({ navigation, route }) => {
    const data = route.params;
    // console.log("data is", data);
    const [checked, setChecked] = useState('baseBall')
    const [skillLevel, setSkillLevel] = useState('recreational')
    const [ageGroup, setAgeGroup] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [date, setDate] = useState("")
    const [uploading, setUploading] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [countryModal, setCountryModal] = useState(false);
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [submit, setSubmit] = useState(false)
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('')
    const phoneRef = React.createRef(null);
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState("")
    const [, forceRender] = useState({});
    const [arr, setArr] = useState([
        {
            flag: true,
            age: "Under-9",
        },
        {
            flag: false,
            age: "10-11",
        },
        {
            flag: false,
            age: "12-14",
        },
        {
            flag: false,
            age: "15-16",
        },
        {
            flag: false,
            age: "18+",
        },
    ]);

    const [prev, setPrev] = useState(0);

    const [state, setState] = useState({
        submit: false,
    });

    const onSelect = async (country) => {
        console.log(country)
        await setCountry(country.name);
        await setPhoneNumber(`+${country.callingCode[0]}`);

        await setCountryModal(false)

    };

    const _flagButton = () => {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => setCountryModal(!countryModal)} >
                <View style={{}}>
                    <FlagButton
                        onOpen={() => setCountryModal(!countryModal)}
                        onClose={() => setCountryModal(!countryModal)}
                        placeholder={""}
                        withEmoji={false}
                        withFlagButton={false}
                        // countryCode={countryCode != "" ? countryCode : ""}
                        containerButtonStyle={{ height: 0 }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    const hideDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const handleConfirm = (selectedDate) => {
        var date = moment(selectedDate).format('YYYY-MM-DD')
        setDate(date);
        hideDatePicker();
    };


    const checkNetwork = async () => {
        await setLoading(true)
        await setSubmit(true)
        console.log("internet called");
        try {
            let state = await NetInfo.fetch();
            if (state.isConnected == true) {
                // call your function here
                await setSubmit(true)
                checkValidations();
                // getAtheleteDetails();
            } else {
                setMessage(`Please check your internet connection and try again`)
                setVisible(true);
                setLoading(false)
                setSubmit(false)
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const checkValidations = () => {
        console.log(submit)
        if (ageGroup.length && country.length && address.length && phoneNumber.length && date && isPhoneValid(phoneNumber)) {
            getAtheleteDetails();
        } else {
            setLoading(false)
            setSubmit(true)

        }
    };

    const isPhoneValid = (phone) => {
        return /^\+[0-9]{10,13}$/.test(phone)
    }

    const getAtheleteDetails = async () => {
        let userData = {
            firstName: route.params.firstName,
            lastName: route.params.lastName,
            email: route.params.email,
            password: route.params.password,
            phone: phoneNumber,
            imageUrl: image,
            address: address,
            dob: moment(date).format('YYYY-MM-DD'),
            role: 'athlete',
            country: country,
            ageGroupAthlete: ageGroup,
        };
        console.log("userdata is", userData);

        AuthServices.userRegister(userData)
            .then(response => {
                if (response.data.success != undefined && response.data.success == true) {
                    console.log("response", response);
                    navigation.replace('EmailSent', { email: route.params.email })
                    // setModalVisible(!modalVisible)
                } else {
                    console.log("error in service");
                }
            })
            .catch((error) => {
                setMessage(`${errorUtils.getError(error)}`)
                setVisible(true);
                console.log(error);
            })
    };

    const launchGallery = () => {
        launchImageLibrary(
            {
                includeBase64:true,
                title: "Pick photo from storage",
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            },
            async (response) => {
                if (response.error) { }
                else if (response.uri != undefined) {
                    let userData = {
                        fileName: response.fileName,
                        fileType: response.type
                    }
                    setImage(response.uri);
                    setUploading(true)
                    AuthServices.getUrl(userData)
                        .then((res) => {
                            const buffer = Buffer(`${response.base64}`, "base64");
                            axios.put(res.data.postUrl, buffer, {
                                headers: {
                                    "Content-Type": `${response.type}; charset=utf-8`,
                                    "x-amz-acl": "public-read",
                                },
                            })
                                .then((responseData) => {
                                    console.log(responseData.data.status)
                                    setImage(res.data.getUrl);
                                    setUploading(false)
                                }).catch((err) => { console.log(err) })
                        })
                        .catch((err) => { console.log(err) })

                }
            })
    }


    return (
        <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    translucent
                    backgroundColor={'transparent'}
                />
                <ScrollView style={styles.bottom}>
                    <View style={styles.profile}>
                        {uploading ?
                            <ImageBackground imageStyle={{ borderRadius: 150 }} source={{ uri: image }} style={styles.avatarStyle}>
                                <ActivityIndicator size={20} color={Colors.buttonColor} />
                            </ImageBackground>
                            :
                            image ?
                                <Image source={{ uri: image }} style={styles.avatarStyle} />
                                :
                                <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
                        }
                        <TouchableOpacity onPress={() => launchGallery()} style={styles.icon}>
                            {
                                image ?
                                    <Icon name="edit" color="white" size={15} />
                                    :
                                    <Image source={require('../../assets/plus.png')} style={styles.avatar1} />
                            }
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.text}>Date Of Birth</Text>
                    <View style={styles.outerView}>
                        <TouchableOpacity
                            style={styles.dropDown}
                            onPress={() => {
                                setShowDatePicker(!showDatePicker)
                                console.log("showDatePicker: ", showDatePicker)
                            }}
                        >
                            {date != undefined && date != '' ? (

                                <Text style={styles.innertext}>{moment(date).format('M / DD / YYYY')}</Text>
                            ) : (
                                <Text style={styles.innertext}>- / -- / ----</Text>
                            )}
                            <Calendar
                                name="calendar"
                                color="grey" size={15}
                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={showDatePicker}
                            onConfirm={(date) => handleConfirm(date)}
                            onCancel={() => hideDatePicker}
                        />
                    </View>
                    {submit == true && date == "" && (
                        <Text style={styles.errorStyle}>Please select your date of birth</Text>
                    )}

                    <Text style={styles.text}>Country</Text>
                    <View style={styles.outerView}>
                        <TouchableOpacity
                            style={styles.dropDown}
                            onPress={() => {
                                setCountryModal(!countryModal)
                                console.log("countryModal : ", countryModal)
                            }}
                        >
                            {country != undefined && country != '' ? (
                                // setCheckInstructorTypes(false)
                                <Text style={styles.innertext}>{country}</Text>
                            ) : (
                                <Text style={styles.innertext}>Select</Text>
                            )}
                            <Image
                                source={require("../../assets/drop-down.png")}
                                style={styles.dropImage}
                            />
                        </TouchableOpacity>
                    </View>
                    {submit == true && country == '' && (
                        <Text style={styles.errorStyle}>Please select a Country</Text>
                    )}
                    <Input
                        full={true}
                        text={"Address"}
                        value={address}
                        onChangeText={(value) => {
                            setAddress(value);
                        }}
                    />
                    {submit == true && address == "" && (
                        <Text style={styles.errorStyle}>
                            Address cannot be empty
                        </Text>
                    )}

                    <Input
                        full={true}
                        text={"Phone"}
                        keyboardType={"number-pad"}
                        value={phoneNumber}
                        onChangeText={(value) => {
                            setPhoneNumber(value);
                        }}
                    />
                    {
                        submit && phoneNumber == "" ? <Text style={styles.errorStyle}> Phonenumber cannot be empty </Text> : null
                    }
                    {
                        submit && phoneNumber.length && !isPhoneValid(phoneNumber) ? <Text style={[styles.errorStyle]}>Phone number is incomplete </Text> : null
                    }



                    <Text style={[styles.text, { marginTop: 15 }]}> Age Group</Text>
                    <FlatList
                        data={arr}
                        // showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.outerView}>
                                    <TouchableOpacity onPress={() => {
                                        // let ageArr = [...ageGroup];
                                        let array = arr;
                                        array[prev].flag = false;
                                        array[index].flag = true;
                                        setArr(arr);
                                        // ageArr.push({ ageGroup: item.age })
                                        // setAge(ageArr)
                                        setAgeGroup(item.age);
                                        setPrev(index);
                                    }} style={[styles.innerView1]}>
                                        <MaterialIcons
                                            size={20}
                                            name={item.flag && ageGroup == item.age ? "check-box" : "check-box-outline-blank"} />
                                        <Text style={styles.innertext}>{item.age}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                    {submit == true && ageGroup == "" && (
                        <Text style={styles.errorStyle}>  Please select age group</Text>
                    )}
                    <Button disabled={uploading} loading={loading} text={'Register'} onPress={() => { checkNetwork() }} />
                    <View style={{ marhinBottom: 20 }}></View>
                </ScrollView>
                <RegisterationModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    navigation={navigation} />
                <CountryPicker
                    theme={styles.themeText}
                    withFilter={true}
                    visible={countryModal}
                    onSelect={(country) => onSelect(country)}
                    withAlphaFilter={true}
                    withCountryNameButton={true}
                    renderFlagButton={_flagButton}
                >
                    <View />
                </CountryPicker>
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
        bottom: '10%',
        alignItems: "center"
    },
    bottom:
    {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.whiteColor,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        marginTop: '30%',
        paddingHorizontal: 20
    },
    contentContainerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: "5%",
        width: width,
    },
    profile:
    {
        height: 120,
        width: 120,
        borderRadius: 120,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
        alignSelf: 'center',
        marginVertical: 20
    },
    avatarStyle: {
        height: 120,
        width: 120,
        borderRadius: 120,
    },
    avatar:
    {
        height: 30,
        width: 30
    },
    avatar1:
    {
        height: 12,
        width: 12
    },
    icon:
    {
        height: 25,
        width: 25,
        borderRadius: 25,
        backgroundColor: Colors.buttonColor,
        position: 'absolute',
        alignSelf: 'flex-end',
        top: 80,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:
    {
        fontSize: 12,
        color: Colors.textColor,
        fontFamily: FontFamily.helveticaLight
    },
    outerView:
    {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8
    },
    outerView1:
    {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    innerView:
    {
        height: 40,
        width: '48%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.textColor,
        alignItems: 'center',
        flexDirection: 'row'
    },
    innertext:
    {
        fontFamily: FontFamily.helveticaBold,
        fontSize: 12
    },

    innerView1: {
        height: 40,
        // width: '33%',
        borderWidth: 1,
        borderRadius: 10,
        marginRight: "3%",
        borderColor: Colors.textColor,
        // borderColor: 'red',
        paddingRight: 10,
        paddingHorizontal: 5,
        alignItems: "center",
        flexDirection: "row",
        // backgroundColor: 'red',
    },
    innerView2:
    {
        height: 40,
        width: '31%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.textColor,
        paddingRight: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    dropDown: {
        height: 40,
        width: "100%",
        borderWidth: 1,
        borderColor: Colors.textColor,
        borderRadius: 10,
        // marginTop: 10,\
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    dropImage: {
        height: 14,
        width: 14,
    },
    errorStyle: {
        fontSize: 12,
        color: "red",
        paddingLeft: 0,
    },


});

export default CompleteProfile;
