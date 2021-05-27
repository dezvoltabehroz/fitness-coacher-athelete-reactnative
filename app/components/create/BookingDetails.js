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
import { RadioButton, Checkbox, Snackbar } from 'react-native-paper';
import { FontFamily } from '../../style/typograpy'
import Button from '../../common/Button'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailsModal from '../../common/DetailsModal'
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { BookingServices } from '../../services';
import { connect } from 'react-redux';
import moment from 'moment';
import { errorUtils } from '../../common/Utilities';
const height = Dimensions.get('window').height
const BookingDetails = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState("");
    const [bookingDetails, setBookingDetails] = useState({})
    const [loading, setLoading] = useState(true)
    // useEffect(() => {
    //     if(props.route)
    //     getBookingDetail();

    // }, [])
    // useEffect((data) => {
    //     setBookingDetails(data)
    // }, [bookingDetails])

    useEffect(() => {
        setLoading(true)
    }, [loading])
    useEffect(() => {
        setLoading(true)
        if (props.route.params != undefined) {
            const { data } = props?.route?.params;
            console.log(data)
            setBookingDetails(data)
            setLoading(false)
        }
    }, []);

    const getBookingDetail = () => {
        setLoading(true)
        BookingServices.getBookingDetails(props?.route?.params?.bookingId, props?.token)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data)
                    setBookingDetails(response.data.bookingDetail.rows[0])
                    setLoading(false)
                } else {
                    setMessage(`${response.data.msg}`)
                    setVisible(true);
                    setLoading(false)
                    console.log(response.data)
                    setModalVisible(false)
                }
            })
            .catch((err) => {
                setMessage(`${errorUtils.getError(err)}`)
                setLoading(false)
                setVisible(true); setModalVisible(false); console.log(err)
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
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <Image style={styles.headerLeft} source={require('../../assets/left-arrow.png')} />
                        </TouchableOpacity>
                        <Text style={styles.headertext}>{bookingDetails?.coach?.firstName} {bookingDetails?.coach?.lastName} - {bookingDetails?.coach?.uniqueId}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image style={styles.headerLeft} source={require('../../assets/menu.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.bottom}>
                    <Tabs tabBarUnderlineStyle={[styles.tabUnderline]} tabContainerStyle={{ elevation: 0, borderTopLeftRadius: 30, borderTopRightRadius: 30, height: 70, borderWidth: 0 }}>
                        <Tab heading="Details" tabStyle={[styles.tab, { borderTopLeftRadius: 30 }]} activeTabStyle={[styles.activeTab, { borderTopLeftRadius: 30 }]}
                            textStyle={styles.tabText} activeTextStyle={styles.activeTabText} >
                            {/* <View style={{ height: 380, backgroundColor: 'red' }}> */}
                            <View style={styles.border}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('AthleteDetails') }}>
                                        <Image source={require('../../assets/splash.jpg')} style={styles.profile} />
                                    </TouchableOpacity>
                                    <Text style={styles.text1}>{bookingDetails?.coach?.firstName} {bookingDetails?.coach?.lastName}</Text>
                                </View>
                                <View style={styles.mainView}>
                                    <Text style={styles.text1}>Requirements</Text>
                                    <Image style={styles.image} source={require('../../assets/down-arrow.png')} />
                                    {/* <Text style={styles.text1}>Baseball</Text> */}
                                </View>
                                <View style={styles.mainView}>
                                    <Text style={styles.text}>Sports</Text>
                                    <Text style={styles.text1}>{bookingDetails?.athleteRequest?.trainingType?.title}</Text>
                                </View>
                                <View style={styles.mainView}>
                                    <Text style={styles.text}>Age Group</Text>
                                    <Text style={styles.text1}>{bookingDetails?.athleteRequest?.coachAgeGroup}</Text>
                                </View>
                                <View style={styles.mainView}>
                                    <Text style={styles.text}>Instruction type</Text>
                                    <Text style={styles.text1}>{bookingDetails?.athleteRequest?.trainingSubCategory?.title}</Text>
                                </View>
                                <View style={styles.mainView}>
                                    <Text style={styles.text}>Skill type</Text>
                                    <Text style={styles.text1}>{bookingDetails?.athleteRequest?.subCategorySkill?.skill}</Text>
                                </View>
                                <Text style={[styles.text, { marginLeft: 10 }]}>Video</Text>
                                <Image style={styles.video} source={require('../../assets/splash.jpg')} />
                                {/* </View> */}
                            </View>
                        </Tab>
                        <Tab heading="Contact Information" tabStyle={[styles.tab, { borderTopRightRadius: 30 }]} activeTabStyle={[styles.activeTab, { borderTopRightRadius: 30 }]}
                            textStyle={styles.tabText} activeTextStyle={styles.activeTabText} >
                            <View style={[styles.mainView, { marginTop: 10 }]}>
                                <Text style={styles.text}>Mobile Phone</Text>
                                <Text style={styles.text1}>{bookingDetails?.coach?.phone}</Text>
                            </View>
                            <View style={styles.mainView}>
                                <Text style={styles.text}>Email</Text>
                                <Text style={styles.text1}>{bookingDetails?.coach?.email}</Text>
                            </View>
                            <View style={styles.mainView}>
                                <Text style={styles.text}>Whatsapp</Text>
                                <Text style={styles.text1}>{bookingDetails?.coach?.phone}</Text>
                            </View>
                        </Tab>
                    </Tabs>
                </View>
                <DetailsModal setModalVisible={setModalVisible} modalVisible={modalVisible} navigation={props.navigation} />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    snackbarContainerStyle: {
        alignItems: "center"
    },
    bottom:
    {
        width: '100%',
        backgroundColor: Colors.whiteColor,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        marginTop: '4%',
        height: 600
        // paddingHorizontal: 20,
    },
    header:
    {
        flexDirection: 'row',
        marginTop: '15%',
        marginHorizontal: 20,
        alignItems: "center",
        justifyContent: 'space-between'
    },
    headertext:
    {
        textTransform: 'uppercase',
        fontFamily: FontFamily.helveticaBold,
        fontSize: 16,
        marginLeft: 20
    },
    headerLeft:
    {
        height: 20,
        width: 20
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
    mainView:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,

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
        width: '90%',
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        alignSelf: 'center'
    },
    button:
    {
        height: 50,
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 50,
        borderWidth: 1,
        borderColor: Colors.textColor,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    border:
    {
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.textColor,
        borderRadius: 10,
        marginTop: 10
    },
    profile:
    {
        height: 30,
        width: 30,
        borderRadius: 30,
        margin: 10
    },
    image:
    {
        height: 15,
        width: 15
    }


});
const mapStateToProps = (state) => ({
    user: state.authReducer.userData || {},
    token: state.authReducer.userToken || {}
});

export default connect(mapStateToProps)(BookingDetails)