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
  FlatList,
  NativeModules,
  Platform,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import AccountInput from '../../common/AccountInput'
import AccountModal from '../../common/AccountModal';
import { Colors } from '../../style/colors'
import { FontFamily } from '../../style/typograpy';
import Button from '../../common/Button'
import Input from "../../common/Input";
import RegisterationModal from '../../common/RegisterationModal';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CountryPicker, { FlagButton } from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-input';
import moment from 'moment';
import NetInfo from "@react-native-community/netinfo";
import { AuthServices } from '../../services';
import { connect } from 'react-redux';
import { authActions } from '../../redux/actions/auth';
import { bindActionCreators } from "redux";
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Calendar from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const AccountSettingsScreen = (props) => {
  const [first_name, setFirstname] = useState(props?.user?.firstName);
  const [last_name, setLastname] = useState(props?.user?.lastName);
  const [email, setEmail] = useState(props?.user?.email)
  const [ageGroup, setAgeGroup] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [date, setDate] = useState(props?.user?.dob)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [countryModal, setCountryModal] = useState(false);
  const [country, setCountry] = useState(props?.user?.country)
  const [phoneNumber, setPhoneNumber] = useState(props?.user?.phone);
  const [address, setAddress] = useState(props?.user?.address);
  const [submit, setSubmit] = useState(false)
  const [checkAgeGroup, setCheckAgeGroup] = useState(false);
  const [image, setImage] = useState('')
  const phoneRef = React.createRef(null);
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
    await setSubmit(true)
    console.log(submit)
    console.log("internet called");
    try {
      let state = await NetInfo.fetch();
      if (state.isConnected == true) {
        // call your function here
        checkValidations();
        // getAtheleteDetails();
      } else {
        alert("Please check your internet connection and try again");
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const checkValidations = () => {
     setSubmit(true)
     console.log(submit)
    if (ageGroup && submit && country && address && phoneNumber && date && isPhoneValid(phoneNumber) && first_name && last_name) {
      getAtheleteDetails();
    } else {
      setSubmit(true);
      console.log(submit)
    }
  };

  const isPhoneValid = (phone) => {
    return /^\+[0-9]{10,13}$/.test(phone)
  }

  const getAtheleteDetails = async () => {
    let userData = {
      firstName: first_name,
      lastName: last_name,
      email: props?.user?.email,
      phone: phoneNumber,
      address: address,
      dob: moment(date).format('YYYY-MM-DD'),
      role: 'athlete',
      country: country,
      ageGroup: ageGroup,
    };
    console.log("userdata is", userData);
    // navigation.navigate("EmailSent");

    AuthServices.updateProfile(props?.user?.id, userData, props?.token)
      .then(response => {
        if (response.data.success != undefined && response.data.success == true) {
          console.log("response", response);
          setModalVisible(!modalVisible)

          // navigation.navigate("EmailSent");
        } else {
          console.log("error in service");
        }
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      })
  };

  const launchGallery = () => {
    launchImageLibrary(
      {
        title: "Pick photo from storage",
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      async (response) => {
        if (response.error) { }
        else if (response.uri != undefined) {
          setImage(response.uri);
        }
      })
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <ScrollView style={styles.bottom}>
        <View>{
          image ?
            <Image source={{ uri: image }} style={styles.image} />
            :
            <Image source={require('../../assets/splash.jpg')} style={styles.image} />}
          <TouchableOpacity onPress={() => launchGallery()} style={styles.imageView}>
            <Image source={require('../../assets/pen.png')} style={styles.pen} />
          </TouchableOpacity>
        </View>
        <AccountInput text={'First Name'} placeholder="" value={first_name} onChangeText={(val) => setFirstname(val)} />
        {submit == true && first_name == "" && (
          <Text style={styles.errorStyle}>First Name canot be empty</Text>
        )}
        <AccountInput text={'Last Name'} placeholder="" value={last_name} onChangeText={(val) => setLastname(val)} />
        {submit == true && last_name == "" && (
          <Text style={styles.errorStyle}>Last Name canot be empty</Text>
        )}
        <AccountInput editable={false} value={email} text={'Email Address'} />
        <Text style={styles.inputText}>Password</Text>
        <View style={styles.input}>
          <Text style={styles.passwordText}>*********</Text>
          <TouchableOpacity>
            <Text style={styles.changeTextStyle} >Change</Text>
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
                <View style={[styles.innerView1]}>
                  <MaterialIcons onPress={() => {
                    // let ageArr = [...ageGroup];
                    let array = arr;
                    array[prev].flag = false;
                    array[index].flag = true;
                    setArr(arr);
                    // ageArr.push({ ageGroup: item.age })
                    // setAge(ageArr)
                    setAgeGroup(item.age);
                    setPrev(index);
                  }}
                    size={20}
                    name={item.flag && ageGroup == item.age ? "check-box" : "check-box-outline-blank"} />
                  <Text style={styles.innertext}>{item.age}</Text>
                </View>
              </View>
            );
          }}
        />
        {submit == true && ageGroup == "" && (
          <Text style={styles.errorStyle}>  Please select age group</Text>
        )}
        <Button text={'Update'} onPress={() => { checkNetwork() }} />
        <View style={{ marginTop: 20 }}></View>
      </ScrollView>
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
      <AccountModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor

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
  changeTextStyle: {
    marginRight: 10,
    color: "#60A7EE",
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

  // bottom:
  // {
  //   height: '90%',
  //   width: '100%',
  //   backgroundColor: Colors.whiteColor,
  //   borderTopRightRadius: 35,
  //   borderTopLeftRadius: 35,
  //   marginTop: '22%',
  //   paddingHorizontal: 20
  // },
  outerView:
  {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  left:
  {
    height: 30,
    width: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.textColor
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: "5%",
    width: width,
  },
  image:
  {
    height: 100,
    width: 100,
    borderRadius: 150,
    alignSelf: 'center',
    marginTop: 20
  },
  imageView:
  {
    height: 25,
    width: 25,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.whiteColor,
    backgroundColor: Colors.blackColor,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    // left: 180,
    left: '56%',
    top: 90
  },
  pen:
  {
    height: 10,
    width: 10
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
  inputText: {
    fontFamily: FontFamily.helveticaLight,
    color: Colors.textColor,
    fontSize: 13,
    marginBottom: 7,
    marginTop: 17
  },
  input:
  {
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.backgroundColor,
    color: Colors.blackColor,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  passwordText:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 13,
  },
  passIcon:
  {
    height: 20,
    width: 20
  }


});

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.userData || {},
    token: state.authReducer.userToken
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsScreen);

