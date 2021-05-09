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
const height = Dimensions.get('window').height
const AthleteDetails = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
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
                    <Text style={styles.headertext}>ZIMR MATFIELD</Text>
                </View>

            </View>
            <ScrollView style={styles.bottom}>
                <View style={styles.mainView}>
                    <Text style={styles.text}>Name</Text>
                    <Text style={styles.text1}>Zimry Mayfield</Text>
                </View>
                <View style={styles.mainView}>
                    <Text style={styles.text}>Sport</Text>
                    <Text style={styles.text1}>Softball</Text>
                </View>
                <View style={styles.mainView}>
                    <Text style={styles.text}>Skill Leve;</Text>
                    <Text style={styles.text1}>Division 1</Text>
                </View>
                <View style={styles.mainView}>
                    <Text style={styles.text}>Instruction type</Text>
                    <Text style={styles.text1}>Outo=field</Text>
                </View>
                <View style={styles.mainView}>
                    <Text style={styles.text}>Age Group Qualification</Text>
                    <Text style={styles.text1}>18+</Text>
                </View>
                <Text style={styles.text1}>Reviews</Text>
                <FlatList
        data={[1,2,3]}
        keyExtractor={(item,index) =>index.toString()}
        renderItem={({item,index})=>{return(
          <PlayerReviewsCard />

        )}}
        />
        <View style={{height:40}}></View>
            </ScrollView>
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
        height: 600,
        paddingHorizontal: 20,
        paddingTop:20
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
    }

});

export default AthleteDetails;
