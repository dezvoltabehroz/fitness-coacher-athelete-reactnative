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
import { FontFamily } from '../../style/typograpy';
import Button from '../../common/Button'
import { RadioButton } from 'react-native-paper';
import RegisterationModal from '../../common/RegisterationModal'
const height = Dimensions.get('window').height
const CompleteProfile = (props) => {
    const [checked, setChecked] = useState('baseBall')
    const [skillLevel, setSkillLevel] = useState('recreational')
    const [ageGroup,setAgeGroup]=useState('9')
    const[modalVisible,setModalVisible]=useState(false)
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor={'transparent'}
            />
            <ScrollView style={styles.bottom}>
                <View style={styles.profile}>
                    <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
                    <View style={styles.icon}>
                        <Image source={require('../../assets/plus.png')} style={styles.avatar1} />

                    </View>
                </View>
                <Text style={styles.text}>Athlete Sport</Text>
                <View style={styles.outerView}>
                    <View style={[styles.innerView, { borderColor: checked == 'baseBall' ? Colors.blackColor : Colors.textColor }]}>
                        <RadioButton
                            color={Colors.blackColor}
                            uncheckedColor={Colors.blackColor}
                            value="baseall"
                            status={checked === 'baseBall' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('baseBall')}
                        />
                        <Text style={styles.innertext}>Baseball</Text>

                    </View>
                    <View style={[styles.innerView, { borderColor: checked == 'softBall' ? Colors.blackColor : Colors.textColor }]}>
                        <RadioButton
                            color={Colors.blackColor}
                            uncheckedColor={Colors.blackColor}
                            value="softBall"
                            status={checked === 'softBall' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('softBall')}
                        />
                        <Text style={styles.innertext}>Softball</Text>
                    </View>
                </View>
                <Text style={[styles.text, { marginTop: 15 }]}>Skill Level</Text>
                <View style={styles.outerView}>
                    <View style={[styles.innerView1,{width:'35%'}]}>
                            <RadioButton
                                size={20}
                                color={Colors.blackColor}
                                uncheckedColor={Colors.blackColor}
                                value="recreational"
                                status={skillLevel === 'recreational' ? 'checked' : 'unchecked'}
                                onPress={() => setSkillLevel('recreational')}
                            />
                        <Text style={styles.innertext}>Recreational</Text>

                    </View>
                    <View style={[styles.innerView1,{width:'28%'}]}>
                            <RadioButton
                                color={Colors.blackColor}
                                uncheckedColor={Colors.blackColor}
                                value="travel"
                                status={skillLevel === 'travel' ? 'checked' : 'unchecked'}
                                onPress={() => setSkillLevel('travel')}
                            />
                        <Text style={styles.innertext}>Travel</Text>
                    </View>
                    <View style={[styles.innerView1]}>
                            <RadioButton
                                color={Colors.blackColor}
                                uncheckedColor={Colors.blackColor}
                                value="collegiate"
                                status={skillLevel === 'collegiate' ? 'checked' : 'unchecked'}
                                onPress={() => setSkillLevel('collegiate')}
                            />
                        <Text style={styles.innertext}>Collegiate</Text>
                    </View>
                </View>
                <View style={[styles.outerView1]}>
                    <View style={[styles.innerView1]}>
                            <RadioButton
                                size={20}
                                color={Colors.blackColor}
                                uncheckedColor={Colors.blackColor}
                                value="division"
                                status={skillLevel === 'division' ? 'checked' : 'unchecked'}
                                onPress={() => setSkillLevel('division')}
                            />
                        <Text style={styles.innertext}>Division-1</Text>

                    </View>
                    <View style={[styles.innerView1,{marginLeft:10}]}>
                            <RadioButton
                                color={Colors.blackColor}
                                uncheckedColor={Colors.blackColor}
                                value="professional"
                                status={skillLevel === 'professional' ? 'checked' : 'unchecked'}
                                onPress={() => setSkillLevel('professional')}
                            />
                        <Text style={styles.innertext}>professional</Text>
                    </View>
                    </View>
                    <Text style={[styles.text, { marginTop: 15 }]}>Athlete Age Group</Text>
                    <View style={styles.outerView}>
                    <View style={[styles.innerView2]}>
                            <RadioButton
                                size={20}
                                color={Colors.blackColor}
                                uncheckedColor={Colors.blackColor}
                                value="9"
                                status={ageGroup === '9' ? 'checked' : 'unchecked'}
                                onPress={() => setAgeGroup('9')}
                            />
                        <Text style={styles.innertext}>Under 9</Text>

                    </View>
                    <View style={[styles.innerView2]}>
                            <RadioButton
                                color={Colors.blackColor}
                                uncheckedColor={Colors.blackColor}
                                value="10"
                                status={ageGroup === '10' ? 'checked' : 'unchecked'}
                                onPress={() => setAgeGroup('10')}
                            />
                        <Text style={styles.innertext}>10/11u</Text>
                    </View>
                    <View style={[styles.innerView2]}>
                            <RadioButton
                                color={Colors.blackColor}
                                uncheckedColor={Colors.blackColor}
                                value="12"
                                status={ageGroup === '12' ? 'checked' : 'unchecked'}
                                onPress={() => setAgeGroup('12')}
                            />
                        <Text style={styles.innertext}>12u</Text>
                    </View>
                </View>
                <View style={styles.outerView1}>
                    <View style={[styles.innerView2]}>
                            <RadioButton
                                size={20}
                                color={Colors.blackColor}
                                uncheckedColor={Colors.blackColor}
                                value="13"
                                status={ageGroup === '13' ? 'checked' : 'unchecked'}
                                onPress={() => setAgeGroup('13')}
                            />
                        <Text style={styles.innertext}>13-15</Text>

                    </View>
                    <View style={[styles.innerView2,{marginLeft:10}]}>
                            <RadioButton
                                color={Colors.blackColor}
                                uncheckedColor={Colors.blackColor}
                                value="16"
                                status={ageGroup === '16' ? 'checked' : 'unchecked'}
                                onPress={() => setAgeGroup('16')}
                            />
                        <Text style={styles.innertext}>16-17u</Text>
                    </View>
                    <View style={[styles.innerView1,{marginLeft:10}]}>
                            <RadioButton
                                color={Colors.blackColor}
                                uncheckedColor={Colors.blackColor}
                                value="18"
                                status={ageGroup === '18' ? 'checked' : 'unchecked'}
                                onPress={() => setAgeGroup('18')}
                            />
                        <Text style={styles.innertext}>18+</Text>
                    </View>
                </View>
                <Button text={'Register'} onPress={()=>{setModalVisible(!modalVisible)}} />
                <View style={{marhinBottom:20}}></View>
            </ScrollView>
            <RegisterationModal modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={props.navigation} />
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
        backgroundColor: 'red',
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
   
    innerView1:
    {
        height: 40,
        // width: '33%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.textColor,
        paddingRight: 10,
        alignItems: 'center',
        flexDirection: 'row'
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
  


});

export default CompleteProfile;
