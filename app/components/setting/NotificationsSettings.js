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
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Colors } from '../../style/colors'
import { FontFamily } from '../../style/typograpy'
import { Switch } from 'react-native-paper';
import { NotificationServices } from '../../services';
import { connect } from 'react-redux';
import { authActions } from '../../redux/actions/auth';
import { bindActionCreators } from "redux";
import Container from '../../common/Container';
import { errorUtils } from '../../common/Utilities';
const height = Dimensions.get('window').height
const NotificatinsSettings = (props) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isSwitchOn1, setIsSwitchOn1] = React.useState(props?.user?.notification);
  const [isSwitchOn2, setIsSwitchOn2] = React.useState(false);
  const [message, setMessage] = useState("")
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);
  const onToggleSwitch2 = () => setIsSwitchOn2(!isSwitchOn2);

  const handleNotificationSetting = () => {
    setLoading(true)
    let userData = {
      "UserId": props.user.id,
      "notification": !isSwitchOn1
    }
    NotificationServices.notificationSetting(userData, props.token)
      .then(async (res) => {
        if (res.data.success) {
          onToggleSwitch1()
          let data = {
            id: props?.user.id,
            token: props?.token
          }
          await props.authActions.getUserProfile(data)
          setLoading(false)
        }
        else {
          setMessage(`${res.data.msg}`)
          setVisible(true);
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err.response)
        setMessage(`${errorUtils.getError(err)}`)
        setVisible(true);
        setLoading(false)
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
        <View style={styles.bottom}>
          <View style={styles.inner}>
            <View>
              <Text style={styles.text}>App Notifications</Text>
              <Text style={styles.text1}>Play sound for in-app update</Text>
            </View>
            <Switch trackColor={{ true: Colors.buttonColor, false: 'grey' }}
              value={isSwitchOn} onValueChange={onToggleSwitch} color={Colors.buttonColor} />
          </View>
          <View style={styles.inner}>
            <View>
              <Text style={styles.text}>Push Notifications</Text>
            </View>
            {loading ?
              <ActivityIndicator size={"small"} color={Colors.buttonColor} />
              :
              <Switch trackColor={{ true: Colors.buttonColor, false: 'grey' }}
                value={isSwitchOn1} onValueChange={() => handleNotificationSetting()} color={Colors.buttonColor} />}
          </View>
          <View style={styles.inner}>
            <View>
              <Text style={styles.text}>Vibration</Text>
              <Text style={styles.text1}>On</Text>
            </View>
            <Switch trackColor={{ true: Colors.buttonColor, false: 'grey' }}
              value={isSwitchOn2} onValueChange={onToggleSwitch2} color={Colors.buttonColor} />
          </View>
          <View style={styles.inner}>
            <View>
              <Text style={styles.text}>Notifications sound</Text>
              <Text style={styles.text1}>Default [IOS]</Text>
            </View>
          </View>
        </View>
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
  text:
  {
    fontFamily: FontFamily.helveticaBold,
    fontSize: 14,

  },
  text1:
  {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 12,

  },
  inner:
  {
    flexDirection: "row",
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificatinsSettings);
