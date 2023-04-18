import React from 'react';
import './Navbar.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTree, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
    const navigate = useNavigate();
    function navigation(whichPage) {
        navigate(`/${whichPage}`)
    }
    const cart = useSelector(state => state.cart)
    return (
        <div className='navbarContainer'>
            <div className='left containerChild'>
                <span className='register' onClick={() => navigation('login')}>Register</span>
                <span className='signin' onClick={() => navigation('login')}>Sign in</span>
                <div className='badge' onClick={() => navigation('cart')}>
                    <FontAwesomeIcon icon={faCartShopping} className='icon' />
                    {cart.cartQuantity > 0 ? <span>{cart.cartQuantity}</span> : <></>}
                </div>
            </div>
            <div className='center containerChild'>
                <h1 onClick={() => navigation('home')}>rêu. <FontAwesomeIcon icon={faTree} className='icon' /></h1>
            </div>
            <div className='right containerChild'>
                <div className='searchBar'>
                    <input type='text' className='' />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' />
                </div>
                <div className='languages'>
                    <span>EN</span>
                </div>
            </div>
        </div>
    )
}
