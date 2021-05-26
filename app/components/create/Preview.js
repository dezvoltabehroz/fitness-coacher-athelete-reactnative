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
    TextInput
} from 'react-native';
import { Colors } from '../../style/colors'
import { RadioButton, Checkbox } from 'react-native-paper';
import { FontFamily } from '../../style/typograpy'
import Button from '../../common/Button'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SuccessRequestModal from '../../common/SuccesRequest'
import PaymentModal from '../../common/PaymentModal'
import { BookingServices, PaymentServices } from '../../services';
import { connect } from 'react-redux';
const height = Dimensions.get('window').height
const PreviewScreen = (props) => {
    let { data } = props.route.params;
    const [modalVisible, setModalVisible] = useState(false)
    const [successModalVisible, setSuccessModalVisible] = useState(false)

    const handlePostRequest = () => {
        let userData = {
            "coachAgeGroup": data.ageGroup,
            "TrainingTypeId": data.instructor.id,
            "TrainingSubCategoryId": data.instruction.id,
            "AthleteId": props?.user?.id,
            "SkillId": data.skill.id,
            "file": "https://www.youtube.com/watch?v=EngW7tLk6R8",
            "notes": data.note
        }
        console.log(userData)
        BookingServices.createRequest(userData, props?.token)
            .then((res) => {
                console.log(res.data)
                let data = {
                    "status": "succeeded",
                    "RequestId": res.data.result.RequestId
                }
                PaymentServices.changeStatusAndSendRequestToCoach(data, props?.token)
                    .then((response) => {
                        console.log(response.data)
                        if (response.data.success) {
                            setSuccessModalVisible(true)
                        }
                    })
                    .catch((err) => {console.log("second errror : ",err)})
            })
            .catch((err) => console.log("first errror : ",err))
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor={'transparent'}
            />
            <ScrollView style={styles.bottom}>
                <View style={styles.mainView}>
                    <Text style={styles.text}>Category</Text>
                    <Text style={styles.text1}>{data.instructor.title}</Text>
                </View>
                <View style={styles.mainView}>
                    <Text style={styles.text}>Instruction type</Text>
                    <Text style={styles.text1}>{data.instruction.title}</Text>
                </View>
                <View style={styles.mainView}>
                    <Text style={styles.text}>Skill Type</Text>
                    <Text style={styles.text1}>{data.skill.skill}</Text>
                </View>
                <View style={styles.mainView}>
                    <Text style={styles.text}>Age Group</Text>
                    <Text style={styles.text1}>{data.ageGroup}</Text>
                </View>
                {/* <View style={styles.mainView}>
                    <Text style={styles.text}>Instruction type</Text>
                    <Text style={styles.text1}>Dartfish Ananlytics</Text>
                </View>
                <View style={styles.mainView}>
                    <Text style={styles.text}>Dartfish Analytics</Text>
                    <Text style={styles.text1}>Infield, Outfield, Catching</Text>
                </View> */}
                <Text style={styles.text}>Video</Text>
                <Image style={styles.video} source={require('../../assets/splash.jpg')} />
                <Text style={styles.text}>Notes</Text>
                <Text style={styles.text1}>{data.note}</Text>
                <Button text={'Post Request'} onPress={() => { setModalVisible(true) }} />
                <TouchableOpacity style={styles.button} onPress={() => { props.navigation.goBack() }}>
                    <Text style={styles.text}>Go Back & Edit</Text>
                </TouchableOpacity>
            </ScrollView>
            <PaymentModal onPress={() => handlePostRequest()} navigation={props.navigation} setModalVisible={setModalVisible} modalVisible={modalVisible} setSuccessModalVisible={setSuccessModalVisible} />
            <SuccessRequestModal navigation={props.navigation} setSuccessModalVisible={setSuccessModalVisible} successModalVisible={successModalVisible} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottom:
    {
        width: '100%',
        backgroundColor: Colors.whiteColor,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        marginTop: '22%',
        paddingHorizontal: 20,
        paddingTop: 20
    },
    mainView:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 10

    },
    text:
    {
        fontSize: 15,
        color: Colors.textColor,
        fontFamily: FontFamily.helvetica,
    },
    text1:
    {
        fontSize: 15,
        color: Colors.blackColor,
        fontFamily: FontFamily.helvetica,
    },
    video:
    {
        height: 150,
        marginTop: 10,
        width: '100%',
        borderRadius: 10,
        marginBottom: 10
    },
    button:
    {
        height: 50,
        width: '99%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 50,
        borderWidth: 1,
        borderColor: Colors.textColor,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }

});
const mapStateToProps = (state) => ({
    user: state.authReducer.userData || {},
    token: state.authReducer.userToken || {}
});
export default connect(mapStateToProps)(PreviewScreen);

