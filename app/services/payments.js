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
    changeStatusAndSendRequestToCoach: function (userData, token) {
        return axiosInstance.post(`athlete/changePaymentStatus`, userData, configToken(token))
    },
    getBillings: function (id, token) {
        return axiosInstance.get(`athlete/billings?AthleteId=${id}`, configToken(token))
    },
};

export default Api;