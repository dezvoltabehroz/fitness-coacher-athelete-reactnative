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
    Dimensions
} from 'react-native';
import { Colors } from '../../style/colors'
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Input from '../../common/Input'
import { FontFamily } from '../../style/typograpy'
import Button from '../../common/Button'
import { useKeyboard } from './../index'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
var keyheight=''
const SplashScreen = (props) => {
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
        keyheight=keyboardHeigth
    }, [keyboardHeigth])

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor={'transparent'}
            />
            <Image source={require('../../assets/logo.png')} style={[styles.logo,{marginTop: keyboardHeigth!=0?0:'23%',}]} />

            <View style={styles.bottom}>
                <Tabs tabBarUnderlineStyle={[styles.tabUnderline]} tabContainerStyle={{ elevation: 0, borderTopLeftRadius: 30, borderTopRightRadius: 30, height: 70, borderWidth: 0 }}>
                    <Tab heading="Login" tabStyle={[styles.tab, { borderTopLeftRadius: 30 }]} activeTabStyle={[styles.activeTab, { borderTopLeftRadius: 30 }]}
                        textStyle={styles.tabText} activeTextStyle={styles.activeTabText} >
                                 <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{height:380}}>
                        <Input text={'Email-Address'}  />
                        <Input secureTextEntry={true} text={"Password"} 
                       />
                                               <View style={{paddingHorizontal:20}}>

                        <Button text={'Login'}  onPress={()=>{props.navigation.navigate('TabContainer')}} />
                        </View>
                        </View>
                        </ScrollView>
                    </Tab>
                    <Tab heading="Register" tabStyle={[styles.tab, { borderTopRightRadius: 30 }]} activeTabStyle={[styles.activeTab, { borderTopRightRadius: 30 }]}
                        textStyle={styles.tabText} activeTextStyle={styles.activeTabText} >
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{height:610}}>
                        <Input text={'Name'}  />
                        <Input text={'Email-Address'}  />
                        <Input secureTextEntry={true}  text={'Password'} />
                        <Input secureTextEntry={true}  text={'Confirm Password'} />
                        <View style={{paddingHorizontal:20}}>
                        <Button text={'Next'} onPress={()=>{props.navigation.navigate('CompleteProfile')}}/>
                        </View>
                        <Text style={styles.text}>By signing up, you agree to ECHO's Terms of Use & Provacy Policy</Text>
                        <View style={{marginBottom:150}}></View>
                        </View>
                        </ScrollView>
                    </Tab>
                </Tabs>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
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
    logo:
    {
        height: 100,
        width: 500,
        alignSelf: 'center',
        marginTop:'23%',
        marginBottom: '10%'

    },
    text:
    {
        fontSize: 11,
        color: Colors.blackColor,
        fontFamily:FontFamily.helveticaBold,
        marginHorizontal:25,
        marginTop:10

    },
    bottom:
    {
        height: '80%',
        width: '100%',
        backgroundColor: Colors.whiteColor,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35
    }

});

export default SplashScreen;
