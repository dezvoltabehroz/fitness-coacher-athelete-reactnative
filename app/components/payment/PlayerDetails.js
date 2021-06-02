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
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Colors } from '../../style/colors'
import { FontFamily } from '../../style/typograpy'
import PlayerReviewsCard from './playerReviewsCard'
import { RadioButton, Checkbox } from 'react-native-paper';
import { AuthServices } from '../../services';
import { connect } from 'react-redux';
import { errorUtils } from '../../common/Utilities';
import Container from '../../common/Container';
const height = Dimensions.get('window').height
const AthleteDetails = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [athleteDetails, setAthleteDetails] = useState({})
    useEffect(() => {

        let userData = {
            id: props.route.params.id,
            token: props?.token,
        }
        AuthServices.getCoachProfile(userData)
            .then((res) => {
                if (res.data.success) {
                    setAthleteDetails(res.data.requestDetails);
                    setLoading(false)
                }
                else {
                    setMessage(`${res.data.msg}`);
                    setVisible(true)
                    setLoading(false)
                }
            })
            .catch((err) => {
                setMessage(`${errorUtils.getError(err)}`);
                setVisible(true)
                setLoading(false)
            })
    }, [])

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
                        <Text style={styles.headertext}>{athleteDetails.firstName} {athleteDetails.lastName}</Text>
                    </View>

                </View>
                <ScrollView style={styles.bottom}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                           source={{uri:athleteDetails.imageUrl != null ? { uri: athleteDetails.imageUrl } : require('../../assets/splash.png')}}
                            style={styles.profile}
                        />
                    </View>
                    <View style={styles.mainView}>
                        <Text style={styles.text}>Name</Text>
                        <Text style={styles.text1}>{athleteDetails.firstName} {athleteDetails.lastName}</Text>
                    </View>
                    <View style={styles.mainView}>
                        <Text style={styles.text}>Sport</Text>
                        <Text style={styles.text1}>{athleteDetails.trainingType}</Text>
                    </View>
                    <View style={styles.mainView}>
                        <Text style={styles.text}>Skill Leve;</Text>
                        <Text style={styles.text1}>{athleteDetails.skill}</Text>
                    </View>
                    <View style={styles.mainView}>
                        <Text style={styles.text}>Instruction type</Text>
                        {
                            athleteDetails.map((item) => {
                                return (<Text style={styles.text1}>{item.title}</Text>)

                            })
                        }
                    </View>
                    <View style={styles.mainView}>
                        <Text style={styles.text}>Age Group Qualification</Text>
                        {
                            athleteDetails.map((item) => {
                                return (<Text style={styles.text1}>{item.ageGroup}</Text>)

                            })
                        }
                    </View>
                    <Text style={styles.text1}>Reviews</Text>
                    <FlatList
                        data={athleteDetails.rating}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <PlayerReviewsCard item={item} />

                            )
                        }}
                    />
                    <View style={{ height: 40 }}></View>
                </ScrollView>
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
        width: '100%',
        backgroundColor: Colors.whiteColor,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        marginTop: '4%',
        height: 600,
        paddingHorizontal: 20,
        paddingTop: 20
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
    },
    profile: {
        height: 75,
        width: 75,
        borderRadius: 75,
      },

});
const mapStateToProps = (state) => ({
    user: state.authReducer.userData || {},
    token: state.authReducer.userToken || {}
});


export default connect(mapStateToProps)(AthleteDetails);
