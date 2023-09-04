import { publicRequest, userRequest } from '../requestMethod';
import {
    loginStart, loginFailure, loginSuccess,
    registerStart, registerSuccess, registerFailure,
    editProfileStart, editProfileSuccess, editProfileFailure
} from './userRedux'
import { displayPopup } from 'src/redux/popupRedux';
import { publicActionStart, publicActionSuccess, publicActionFailure } from 'src/redux/publicActionRedux'

export const login = async (dispatch, inputUser) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post('/api/auth/login', inputUser)
        if (res.data.errCode === 0) {
            dispatch(loginSuccess({ ...res.data.user, token: res.data.token }))
            dispatch(displayPopup())
        } else {
            dispatch(loginFailure())
            dispatch(displayPopup())
        }
    } catch (err) {
        dispatch(loginFailure())
        dispatch(displayPopup())
    }
}

export const register = async (dispatch, inputData) => {
    dispatch(registerStart())
    try {
        const res = await publicRequest.post('/api/auth/register', inputData)
        if (res.data.errCode === 0) {
            dispatch(registerSuccess())
            dispatch(displayPopup())
        } else {
            dispatch(registerFailure())
            dispatch(displayPopup())
        }
    } catch (err) {
        dispatch(registerFailure())
        dispatch(displayPopup())
    }
}

export const editProfile = async (dispatch, userId, editedData) => {
    dispatch(editProfileStart())
    try {
        const res = await userRequest.put(`/api/users/update/${userId}`, editedData)
        console.log(res.data.errCode)
        if (res.data.errCode === 0) {
            dispatch(editProfileSuccess(res.data.updatedUser))
            dispatch(displayPopup())
        } else {
            dispatch(editProfileFailure())
            dispatch(displayPopup())
        }
    } catch (err) {
        dispatch(editProfileFailure())
        dispatch(displayPopup())
    }
}

export const getNewsletter = async (dispatch, emailAddress) => {
    dispatch(publicActionStart())
    try {
        const res = await publicRequest.post('/api/mail/sendMail', { emailAddress })
        if (res.data.errCode === 0) {
            dispatch(publicActionSuccess())
            dispatch(displayPopup())
        } else {
            dispatch(publicActionFailure())
            dispatch(displayPopup())
        }
    } catch (err) {
        dispatch(publicActionFailure())
        dispatch(displayPopup())
    }
}

export const searchProduct = async (dispatch, search) => {
    dispatch(publicActionStart())
    try {
        const res = await publicRequest.get(`/api/products/search/${search}`)
        if (res.data.errCode === 0) {
            dispatch(publicActionSuccess())
            return res.data.searchedProducts
        } else {
            dispatch(publicActionFailure())
        }
    } catch (err) {
        dispatch(publicActionFailure())
    }
    return []
}