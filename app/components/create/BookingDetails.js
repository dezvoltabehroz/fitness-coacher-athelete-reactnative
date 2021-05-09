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
import DetailsModal from '../../common/DetailsModal'
import { Container, Header, Content, Tab, Tabs } from 'native-base';

const height = Dimensions.get('window').height
const BookingDetails = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
    useEffect(()=>{
        if(props.route.params!=undefined)
        {
        const {flag}=props?.route?.params
        if(flag)
        {
            setModalVisible(true)
        }
    }
    },[])
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
                                <TouchableOpacity onPress={()=>{props.navigation.navigate('AthleteDetails')}}>
                                <Image source={require('../../assets/splash.jpg')} style={styles.profile} />
                                </TouchableOpacity>
                                <Text style={styles.text1}>Brad Pit</Text>
                            </View>
                            <View style={styles.mainView}>
                                <Text style={styles.text1}>Requirements</Text>
                                <Image style={styles.image} source={require('../../assets/down-arrow.png')} />
                                {/* <Text style={styles.text1}>Baseball</Text> */}
                            </View>
                            <View style={styles.mainView}>
                                <Text style={styles.text}>Sports Time</Text>
                                <Text style={styles.text1}>Baseball</Text>
                            </View>
                            <View style={styles.mainView}>
                                <Text style={styles.text}>Category</Text>
                                <Text style={styles.text1}>Hitting, pitching, Catcher</Text>
                            </View>
                            <View style={styles.mainView}>
                                <Text style={styles.text}>Age Group</Text>
                                <Text style={styles.text1}>18+</Text>
                            </View>
                            <View style={styles.mainView}>
                                <Text style={styles.text}>Instruction type</Text>
                                <Text style={styles.text1}>Dartfish Ananlytics</Text>
                            </View>
                            <View style={styles.mainView}>
                                <Text style={styles.text}>Dartfish Analytics</Text>
                                <Text style={styles.text1}>Infield, Outfield, Catching</Text>
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
                            <Text style={styles.text1}>+92 3333 3333333</Text>
                        </View>
                        <View style={styles.mainView}>
                    <Text style={styles.text}>Email</Text>
                    <Text style={styles.text1}>xyz@gmail.com</Text>
                </View>
                <View style={styles.mainView}>
                    <Text style={styles.text}>Whatsapp</Text>
                    <Text style={styles.text1}>+92 3333 3333333</Text>
                </View>
                    </Tab>
                </Tabs>

            </View>
            <DetailsModal setModalVisible={setModalVisible} modalVisible={modalVisible} navigation={props.navigation} />
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

export default BookingDetails