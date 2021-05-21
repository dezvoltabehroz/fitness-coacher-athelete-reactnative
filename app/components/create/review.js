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
    ToastAndroid,
    Platform,
    Dimensions,
    TextInput
} from 'react-native';
import { Colors } from '../../style/colors'
import { RadioButton, Checkbox } from 'react-native-paper';
import { FontFamily } from '../../style/typograpy'
import Button from '../../common/Button'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailsModal from '../../common/DetailsModal'
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import StarRating from 'react-native-star-rating';
import { BookingServices } from '../../services';
import { connect } from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
const height = Dimensions.get('window').height
const BookingDetails = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [starCount, setStarCount] = useState(0);
    const [review, setReview] = useState('');
    const [submit, setSubmit] = useState(false)

    const checkNetwork = async () => {

        try {
            let state = await NetInfo.fetch();
            if (state.isConnected == true) {
                checkValidations();
            } else {
                ToastAndroid.show(`Please check your internet connection and try again`, ToastAndroid.LONG)

            }
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    const checkValidations = () => {
        if (starCount != 0 && submit && review) {
            handleSubmit()
        } else {
            setSubmit(true);
        }
    }

    const handleSubmit = () => {
        let userData = {
            "CoachId": 5,
            "stars": starCount,
            "review": review,
            "ratingBy": props?.user?.id
        }
        BookingServices.addRatingtoCoach(userData, props?.token)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data)
                    props.navigation.replace('TabContainer');
                }
                else { ToastAndroid.show(`${response.data.msg}`, ToastAndroid.LONG) }
            })
            .catch((err) => { ToastAndroid.show(`${err}`, ToastAndroid.LONG); console.log(err) })
    }
    return (
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
                    <Text style={styles.headertext}>ZIMR MATFIELD - CCH67888</Text>
                </View>

            </View>

            <View style={styles.bottom}>

                <View style={styles.border}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, justifyContent: 'center' }}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            starSize={25}
                            starStyle={{ paddingHorizontal: 5 }}
                            rating={starCount}
                            selectedStar={(rating) => setStarCount(rating)}
                            fullStarColor={'yellow'}
                        />

                    </View>
                    {
                        submit && starCount == 0 ? <Text style={styles.errorStyle}> Please rate it cannot be empty </Text> : null
                    }
                    <Text style={styles.text1}>Add booking review</Text>
                    <View >
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            value={review}
                            // isActive={isActive}
                            onChangeText={(e) => setReview(e)}
                        />
                        {
                            submit && review == "" ? <Text style={styles.errorStyle}> Review cannot be empty </Text> : null
                        }
                    </View>

                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <Button text={'Submit'} onPress={() => checkNetwork()} />
                </View>
            </View>
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
        fontFamily: FontFamily.helveticaBold,
        fontSize: 16,
        marginLeft: 20
    },
    headerLeft:
    {
        height: 20,
        width: 20
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
        color: Colors.textColor,
        fontFamily: FontFamily.helvetica,
        margin: 10
    },
    input:
    {
        height: 110,
        marginTop: 10,
        width: '100%',
        borderRadius: 10,
        marginBottom: 10,
        alignSelf: 'center',
        backgroundColor: Colors.backgroundColor
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
        padding: '5%',
        borderColor: Colors.textColor,
        borderRadius: 10,
        marginTop: 20
    },
    profile:
    {
        height: 20,
        width: 20,
        marginRight: 5
    },
    errorStyle: {
        fontSize: 12,
        color: "red",
        paddingLeft: 0,
    },


});
const mapStateToProps = (state) => ({
    user: state.authReducer.userData || {},
    token: state.authReducer.userToken || {}
});


export default connect(
    mapStateToProps,
)(BookingDetails);