import { publicRequest, userRequest } from '../requestMethod';
import {
    loginStart, loginFailure, loginSuccess,
    registerStart, registerSuccess, registerFailure,
    editProfileStart, editProfileSuccess, editProfileFailure
} from './userRedux'
import { displayPopup } from 'src/redux/popupRedux';
import { createOrderStart, createOrderSuccess, createOrderFailure } from 'src/redux/orderRedux';
import {
    publicActionStart, publicActionSuccess, publicActionFailure,
    publicSeachStart, publicSeachEnd
} from 'src/redux/publicActionRedux'

export const login = async (dispatch, inputUser) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post('/api/auth/login', inputUser)
        if (res.data.errCode === 0) {
            dispatch(loginSuccess({ ...res.data.user, token: res.data.token }))
            dispatch(displayPopup({ typeSuccess: true, message: 'Login successfully!' }))
        } else {
            dispatch(loginFailure())
            dispatch(displayPopup({ typeSuccess: false, message: 'Invalid user name or password!' }))
        }
    } catch (err) {
        dispatch(loginFailure())
        dispatch(displayPopup({ typeSuccess: false, message: 'Invalid user name or password!' }))
    }
}

export const register = async (dispatch, inputData) => {
    dispatch(registerStart())
    try {
        const res = await publicRequest.post('/api/auth/register', inputData)
        if (res.data.errCode === 0) {
            dispatch(registerSuccess())
            dispatch(displayPopup({ typeSuccess: true, message: 'Sign up successfully!' }))
        } else {
            dispatch(registerFailure())
            dispatch(displayPopup({ typeSuccess: false, message: 'Something went wrong!' }))
        }
    } catch (err) {
        dispatch(registerFailure())
        dispatch(displayPopup({ typeSuccess: false, message: 'Something went wrong!' }))
    }
}

export const editProfile = async (dispatch, userId, editedData) => {
    dispatch(editProfileStart())
    try {
        const res = await userRequest.put(`/api/users/update/${userId}`, editedData)
        console.log(res.data.errCode)
        if (res.data.errCode === 0) {
            dispatch(editProfileSuccess(res.data.updatedUser))
            dispatch(displayPopup({ typeSuccess: true, message: 'Update your account successfully!' }))
        } else {
            dispatch(editProfileFailure())
            dispatch(displayPopup({ typeSuccess: false, message: 'Something went wrong!' }))
        }
    } catch (err) {
        dispatch(editProfileFailure())
        dispatch(displayPopup({ typeSuccess: false, message: 'Something went wrong!' }))
    }
}

export const getNewsletter = async (dispatch, emailAddress) => {
    dispatch(publicActionStart())
    try {
        const res = await publicRequest.post('/api/mail/sendMail', { emailAddress })
        if (res.data.errCode === 0) {
            dispatch(publicActionSuccess())
            dispatch(displayPopup({ typeSuccess: true, message: 'Register newsletter successfully!' }))
        } else {
            dispatch(publicActionFailure())
            dispatch(displayPopup({ typeSuccess: false, message: 'Something went wrong!' }))
        }
    } catch (err) {
        dispatch(publicActionFailure())
        dispatch(displayPopup({ typeSuccess: false, message: 'Something went wrong!' }))
    }
}

export const searchProduct = async (dispatch, search) => {
    dispatch(publicSeachStart())
    try {
        const res = await publicRequest.get(`/api/products/search/${search}`)
        if (res.data.errCode === 0) {
            dispatch(publicSeachEnd())
            return res.data.searchedProducts
        } else {
            dispatch(publicSeachEnd())
        }
    } catch (err) {
        dispatch(publicSeachEnd())
    }
    return []
}

export const checkout = async (dispatch, requestBody) => {
    dispatch(createOrderStart())
    try {
        const res = await publicRequest.post('/api/stripe/payment', requestBody)
        if (res.data.errCode === 0) {
            dispatch(createOrderSuccess())
            dispatch(displayPopup({ typeSuccess: true, message: 'Your payment has been recorded!' }))
        } else {
            dispatch(createOrderFailure())
            dispatch(displayPopup({ typeSuccess: false, message: 'Something went wrong!' }))
        }
    } catch (err) {
        dispatch(createOrderFailure())
        dispatch(displayPopup({ typeSuccess: false, message: 'Something went wrong!' }))
    }
}