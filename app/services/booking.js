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
    getMyActiveBookings: function (id, token) {
        return axiosInstance.get(`athlete/getBookings`, configToken(token))
    },
    completedBookings: function (id, token) {
        return axiosInstance.get(`athlete/getBookings?AthleteId=${id}&status=completionAccepted`, configToken(token))
    },
    createRequest: function (userData, token) {
        return axiosInstance.post('athlete/coachRequest', userData, configToken(token))
    },
    getBookingDetails: function (id, token) {
        return axiosInstance.get(`athlete/getBookingDetails/${id}`, configToken(token))
    },
    getRequests:function (userData, token) {
        return axiosInstance.get(`athlete/getRequests`, userData, configToken(token))
    },
    cancelRequest:function (userData, token) {
        return axiosInstance.get(`athlete/cancelRequest`, userData, configToken(token))
    },
    addRatingtoCoach: function (userData, token) {
        return axiosInstance.post(`athlete/coachRating`, userData, configToken(token))
    },
    completionRequest: function (userData, token) {
        return axiosInstance.post(`athlete/completionRequest`, userData, configToken(token))
    }

};

export default Api;