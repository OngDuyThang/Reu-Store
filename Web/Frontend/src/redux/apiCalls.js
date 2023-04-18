import { publicRequest } from '../requestMethod';
import { loginStart, loginFailure, loginSuccess } from './userRedux'

export const login = async (dispatch, inputUser) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post('/api/auth/login', inputUser)
        if (res.data.errCode === 0) {
            dispatch(loginSuccess(res.data.user))
        } else {
            dispatch(loginFailure())
        }
    } catch (err) {
        dispatch(loginFailure())
    }
}