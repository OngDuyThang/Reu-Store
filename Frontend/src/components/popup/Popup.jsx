import React, { useState } from 'react';
import './Popup.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { closePopup } from 'src/redux/popupRedux'
import { useDispatch } from 'react-redux';

export default function Popup(props) {
    const dispatch = useDispatch()
    // function closePopup() {
    //     document.querySelector('.popupContainer')
    //         .style.transform = 'translateX(-432px)' 
    // }
    return (
        <div className="popupContainer"
            style={{
                backgroundColor: props.isSuccess ? 'rgb(85, 214, 85)' : 'rgb(253, 83, 83)',
                transform: props.isShow ? 'translateX(432px)' : ''
            }}>
            <FontAwesomeIcon icon={props.isSuccess ? faCircleCheck : faExclamationTriangle} className='icon' />
            <span>
                {props.isSuccess ? props.successMess : props.failMess}
            </span>
            <FontAwesomeIcon icon={faTimes} className='icon x'
                onClick={() => dispatch(closePopup())} />
        </div>
    )
}