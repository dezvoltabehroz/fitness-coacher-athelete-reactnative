import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    LOADING_SUCCESS
} from '../types';
import { AuthServices, RegisterUser } from '../../services';
import { Alert, Linking, Platform, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setUserProfile = (userData, token, navigate) => {
    return async (dispatch) => {
        if (userData) {
            await dispatch({ type: USER_LOGIN_SUCCESS, userData: userData, userToken: token, loading: false });
            if (navigate != null)
                navigate('TabContainer');
        }
    }
};

const getUserProfile = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        AuthServices.getUserProfile(userData)
            .then(async (responseData) => {
                if (responseData.data.success) {
                    console.log(responseData.data.athleteDetails)
                    await AsyncStorage.setItem('USER', JSON.stringify(responseData.data.athleteDetails))
                    await dispatch(setUserProfile(responseData.data.athleteDetails, userData.token, navigate))
                }
                else {
                    dispatch(removeUser(navigate));
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }

            })
            .catch(err => { console.log(err) })
    };
};

const removeUser = (navigate) => {
    return async (dispatch) => {
        dispatch({ type: USER_LOGOUT_SUCCESS })
        await navigate('Login')
        await AsyncStorage.removeItem('Token');
        await AsyncStorage.removeItem('USER');

    }
};

const userLogin = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        AuthServices.userLogin(userData)
            .then(async (responseData) => {
                if (responseData.data.success) {
                    // await AsyncStorage.setItem('USER', JSON.stringify(responseData.data.data))
                    // await AsyncStorage.setItem('TOKEN', JSON.stringify(responseData.data.data.token))
                    // await AsyncStorage.setItem('Email', JSON.stringify(userData))
                    await dispatch({ type: USER_LOGIN_SUCCESS, userData: responseData.data.data, loading: !loading })
                    // navigate("Main")
                }
                else {
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                    console.log(responseData.data.message)
                    ToastAndroid.show(`${responseData.data.message}`, ToastAndroid.LONG)
                }
            })
            .catch(err => {
                dispatch({ type: LOADING_SUCCESS, loading: !loading })

                console.log(err)
                // Alert.alert("Email or Password is incorrect")
            })
    }
};

export const authActions = {
    setUserProfile,
    removeUser,
    getUserProfile,
    userLogin
};