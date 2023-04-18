import React, { useEffect, useState } from 'react';
import './RegisterAndLogin.scss';
import { publicRequest } from '../requestMethod';
import { login } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

export default function RegisterAndLogin() {
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector(state => state.user)
    const [exchange, setExchange] = useState(false);
    const [done, setDone] = useState(false);
    const [data, setData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        email: '',
        password: '',
    });
    function slide() {
        setExchange(!exchange);
        setTimeout(() => {
            setDone(!done);
        }, 500)
    }
    function onChangeInput(event, whichInput) {
        let copyState = { ...data };
        copyState[whichInput] = event.target.value;
        setData({
            ...copyState,
        });
    }
    async function submit(type) {
        switch (type) {
            case 'login':
                await login(dispatch, { userName: data.userName, password: data.password })
                break;
            case 'register':
                try {
                    await publicRequest.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, data)
                } catch (err) {
                    console.log('register error')
                }
                break;
        }
    }
    return (
        <div className="bodyContainer">
            <div className="form">
                <div className="left"
                    style={{ transform: exchange ? 'translateX(300px)' : '' }}>
                    <div className="circle">
                        <div className="one"></div>
                        <div className="two"></div>
                        <div className="three"></div>
                    </div>
                    <h1>{done ? 'Register' : 'Welcome'}</h1>
                    <input type='text' className="userName" placeholder="User name" onChange={(event) => onChangeInput(event, 'userName')} />
                    <input type="password" className="password" placeholder='Password' autocomplete="off" onChange={(event) => onChangeInput(event, 'password')} />
                    {done ? <>
                        <input type="email" className="email" placeholder="Email" autocomplete="off" onChange={(event) => onChangeInput(event, 'email')} />
                        <input type='text' className="firstName" placeholder="First name" onChange={(event) => onChangeInput(event, 'firstName')} />
                        <input type='text' className="lastName" placeholder="Last name" onChange={(event) => onChangeInput(event, 'lastName')} />
                        <input type='text' className="phoneNumber" placeholder="Phone number" onChange={(event) => onChangeInput(event, 'phoneNumber')} />
                        <input type='text' className="address" placeholder="Address" onChange={(event) => onChangeInput(event, 'address')} />
                    </> : ''}
                    {done
                        ? <div className="button" onClick={() => submit('register')}>Sign up</div>
                        : <div className="button" onClick={() => submit('login')} disabled={isFetching}>Login</div>}
                </div>
                <div className="right"
                    style={{ transform: exchange ? 'translateX(-700px)' : '' }}>
                    {done ? <span>If you already has an account, just sign in.</span>
                        : <span>Don't have an account?<br />Please sign up!</span>}
                    <div className="button"
                        onClick={() => slide()}>{done ? 'Login' : 'Sign up'}</div>
                </div>
            </div>
        </div>
    )
}