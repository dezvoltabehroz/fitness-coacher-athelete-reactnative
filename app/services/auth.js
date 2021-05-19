import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './Interceptor';
let config = { headers: { 'Content-Type': 'application/json' } }
let configToken = (token) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
}
const Api = {
    userLogin: function (userData) {
        return axiosInstance.post('login', {
            email: userData.email,
            password: userData.password
        }, config)
    },
    getUserProfile: function (token) {
        return axiosInstance.get('user/current', configToken(token))
    },
    updateProfile: function (id, userData, token) {
        return axiosInstance.put(`athlete/update/${id}`, userData, configToken(token))
    },
    userRegister: function (userData) {
        return axiosInstance.post('athlete/registerAthlete', userData, config)
    },
    forgotPassword: function (email) {
        return axiosInstance.post('forgot-password', {
            "email": email
        }, config)
    },
    reSendOtp: function (email) {
        return axiosInstance.post('resend-otp', {
            "email": email
        }, config)
    },
    verifyOtp: function (code) {
        return axiosInstance.post('verify-otp', {
            "email": userData.email,
            "otp": userData.otp
        }, config)
    },
    resetPassword: function (userData) {
        return axiosInstance.post('reset-password', {
            "email": userData.email,
            "password": userData.password,
            "otp": userData.otp
        }, config)
    },
    changePassword: function (userData) {
        return axiosInstance.post('change-password', {
            // "id": userData.id,
            "oldPassword": userData.current_password,
            "newPassword": userData.new_password
        }, configToken(userData.token))
    },


};

export default Api;