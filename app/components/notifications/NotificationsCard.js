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
    Modal,
    Platform,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Colors } from '../../style/colors'
import { FontFamily } from '../../style/typograpy'
import moment from "moment";
import { BookingServices, TrainingCategoryServices } from '../../services';
import DetailsModal from '../../common/DetailsModal';
import { errorUtils } from '../../common/Utilities';
import Container from '../../common/Container';
const height = Dimensions.get('window').height
const NotificationsCard = ({ item, token, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [parsedObj, setParsedObj] = useState({});
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState("")
    // return (
    //     <View style={styles.container}>
    //         <View style={styles.outer}>
    //             <View style={styles.inner}>
    //                 <Image source={require('../../assets/splash.png')} style={styles.image} />
    //                 <View 
    //                  style={{
    //                     // justifyContent:'',
    //                     // backgroundColor: 'pink',
    //                     alignSelf: 'center',
    //                     // marginTop: 2,
    //                   }}>
    //                     <Text style={styles.text}>{item.title}</Text>
    //                     <Text style={styles.text}>{item.body}</Text>
    //                     <Text style={styles.text1}>{moment(item.createdAt).fromNow()}</Text>
    //                 </View>
    //             </View>

    //         </View>
    //         {item.type == 'completed_booking' || item.type == 'requestAcceptance' ?
    //             < View style={styles.buttonView}>
    //                 <TouchableOpacity style={[styles.button, { borderBottomLeftRadius: 10 }]} onPress={() => { navigation.navigate('Bookingdetails', { flag: true }) }} >
    //                     <Text style={styles.text3}>
    //                         Accept
    //                 </Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={[styles.button, { borderBottomRightRadius: 10 }]}>
    //                     <Text style={styles.text3}>
    //                         Reject
    //                 </Text>
    //                 </TouchableOpacity>
    //             </View>
    //             : item.type == 'booking_request' ?
    //                 <TouchableOpacity style={styles.booking}>
    //                     <Text style={styles.text3}>
    //                         View Profile
    //                 </Text>
    //                 </TouchableOpacity> : null}
    //     </View >
    // );
    useEffect(() => {
        let data = item;
        let parsedData = JSON.parse(data.obj);
        setParsedObj(parsedData);
        if (parsedData != null) {
            console.log(parsedData)
        }

    }, [])

    const handleCompeletion = () => {
        let data = {
            "status": "completionAccepted",
            "BookingId": parsedObj.id
        }
        BookingServices.completionRequest(data, token)
            .then((res) => {
                if (res.data.success) {
                    navigation.replace('TabContainer')
                }
                else {
                    setMessage(`${res.data.msg}`)
                    setVisible(!visible)
                    setModalVisible(!modalVisible)
                }
            })
            .catch((err) => {
                console.log(err.response.data)
                setMessage(`${errorUtils.getError(err)}`)
                setVisible(!visible)
                setModalVisible(!modalVisible)
            })
    }

    const handleRequestRevision = () => {
        let data = {
            "status": "completionRejected",
            "BookingId": parsedObj?.id
        }
        BookingServices.completionRequest(data, token)
            .then((res) => {
                if (res.data.success) {
                    navigation.replace('TabContainer')
                }
                else {
                    setMessage(`${res.data.msg}`)
                    setVisible(!visible)
                }
            })
            .catch((err) => {
                console.log(err.response.data)
                setMessage(`${errorUtils.getError(err)}`)
                setVisible(!visible)
            })
    }

    return (
        <Container onPress={() => setVisible(!visible)} message={message} visible={visible}>
            <View style={styles.container}>
                <View style={styles.outer}>
                    <View style={styles.inner}>
                        <Image
                            source={require('../../assets/splash.png')}
                            style={styles.image}
                        />
                        <View>
                            <Text style={styles.text}>{item.title}</Text>
                            {item.type == 'completed_booking' || item.type == 'requestCompletion' || item.type == 'requestAccepted' ? (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Bookingdetails', { data: parsedObj, flag: item.type == 'requestCompletion' ? true : false })}
                                    style={{
                                        // justifyContent:'',
                                        // backgroundColor: 'pink',
                                        alignSelf: 'center',
                                        // marginTop: 2,
                                    }}>

                                    <Text style={styles.text}>{item.body}</Text>
                                    <Text
                                        style={[
                                            styles.text,
                                            {
                                                fontSize: 11,
                                                // lineHeight: height > 667 ? 10 : 12,
                                                color: Colors.textColor,
                                            },
                                        ]}>
                                        {moment(item.createdAt).fromNow()}
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <>
                                    <View>
                                        {/* onPress={() => navigation.navigate('Bookingdetails', { data: parsedObj })}> */}
                                        <Text style={styles.text}>{item.body}</Text>
                                    </View>

                                    <Text
                                        style={[
                                            styles.text,
                                            {
                                                fontSize: 11,
                                                // lineHeight: height > 667 ? 12 : 14,
                                                color: Colors.textColor,
                                            },
                                        ]}>
                                        {moment(item.createdAt).fromNow()}
                                    </Text>
                                </>
                            )}
                        </View>
                    </View>
                </View>
                {
                    item.isRead != 1 ?
                        null
                        :
                        item.type == 'completed_booking' || item.type == 'requestCompletion' ? (
                            <View style={styles.buttonView}>
                                <TouchableOpacity
                                    style={[styles.button, { borderBottomLeftRadius: 10 }]}
                                    onPress={() => {
                                        console.log(parsedObj.id)
                                        // setModalVisible(!modalVisible)
                                        navigation.navigate('Bookingdetails', { data: parsedObj,notificationId: item.id, flag: true });
                                    }}>
                                    <Text style={styles.text3}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Bookingdetails', { data: parsedObj, notificationId: item.id, flag: true })}
                                    style={[styles.button, { borderBottomRightRadius: 10 }]}>
                                    <Text style={styles.text3}>Revision</Text>
                                </TouchableOpacity>
                            </View>
                        ) : item.type == 'requestAcceptance' ? (
                            <TouchableOpacity style={styles.booking}>
                                <Text style={styles.text3}>View Profile</Text>
                            </TouchableOpacity>
                        ) : null}
                <DetailsModal setVisible={setVisible} message={message} visible={visible} onPress={() => { handleCompeletion() }} setModalVisible={setModalVisible} modalVisible={modalVisible} navigation={navigation} />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        //   height:90,
        borderWidth: 1,
        borderColor: Colors.backgroundColor,
        borderRadius: 10,
        marginTop: 15,
        //   padding:5
    },
    text: {
        fontFamily: FontFamily.helvetica,
        fontSize: height > 667 ? 13 : 11,
        // width: height > 667 ? 300 : 350,
        // lineHeight: 22,
    },
    text1: {
        fontFamily: FontFamily.helvetica,
        fontSize: height > 667 ? 12 : 10,
        color: Colors.textColor,
        marginTop: 4,
    },
    text2: {
        fontFamily: FontFamily.helvetica,
        fontSize: height > 667 ? 14 : 12,
        color: Colors.textColor,
    },
    text3: {
        fontFamily: FontFamily.helvetica,
        fontSize: height > 667 ? 14 : 12,
        color: Colors.whiteColor,
    },
    image: {
        height: height > 667 ? 45 : 35,
        width: height > 667 ? 45 : 35,
        borderRadius: height > 667 ? 45 : 35,
        marginRight: 10,
    },

    outer: {
        justifyContent: 'space-between',
        // backgroundColor: 'green',
        // height: 140,
    },

    inner: {
        flexDirection: 'row',
        margin: 5,
        // backgroundColor: 'red',
        // justifyContent: 'center',
        alignItems: 'center',
    },

    detailsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '3%',
        // backgroundColor: 'orange',
    },
    act: {
        height: 23,
        borderRadius: 25,
        width: '18%',
        backgroundColor: '#90ee90',
        alignItems: 'center',
        justifyContent: 'center',
    },
    acyText: {
        fontFamily: FontFamily.helveticaLight,
        fontSize: 9,
    },

    bar: {
        height: 2,
        backgroundColor: Colors.backgroundColor,
        marginTop: 5,
    },
    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    buttonView: {
        flexDirection: 'row',
        width: '100%',
    },
    button: {
        width: '50%',
        height: 40,
        backgroundColor: Colors.blackColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    booking: {
        width: '100%',
        height: 40,
        backgroundColor: Colors.blackColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
});

export default NotificationsCard
