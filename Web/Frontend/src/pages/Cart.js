import React, { useState } from 'react';
import './Cart.scss';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeQuantity, removeProduct } from '../redux/cartRedux';

export default function Cart() {
    const navigate = useNavigate();
    function navigation(whichPage) {
        navigate(`/${whichPage}`)
    }

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)

    function setProductQuantity(index, unit) {
        dispatch(changeQuantity({ index, unit }))
    }

    return (
        <div style={{ overflow: 'hidden' }}>
            <Announcement />
            <Navbar />
            <div className="cartContainer">
                <h1>Your Bag</h1>

                <div className="navigate">
                    <div className="back">continue shopping</div>
                    <div className="center">
                        <span>Shopping Bag (2)</span>
                        <span>Your Wishlist (0)</span>
                    </div>
                    <div className="button">checkout now</div>
                </div>

                <div className="cart">
                    <div className="left">
                        <div className="product">
                            <img src='https://i.ibb.co/cXFnLLV/3.png' onClick={() => navigation('product/1')} />
                            <div className="detail">
                                <span><b>Product: </b>T-Shirt</span>
                                <span><b>ID: </b>123456</span>
                                <span className='color'><b>Color: </b><div></div></span>
                                <span><b>Size: </b>37.5</span>
                            </div>
                            <div className="edit">
                                <div className="quantity">
                                    <span onClick={() => setProductQuantity(0, -1)}>-</span>
                                    <div>123</div>
                                    <span onClick={() => setProductQuantity(0, 1)}>+</span>
                                </div>
                                <span className="price">$ 20.00</span>
                                <span className="remove" onClick={() => dispatch(removeProduct({ index: 0 }))}>Remove</span>
                            </div>
                        </div>
                        <div className="product">
                            <img src='https://i.ibb.co/cXFnLLV/3.png' />
                            <div className="detail">
                                <span><b>Product: </b>T-Shirt</span>
                                <span><b>ID: </b>123456</span>
                                <span className='color'><b>Color: </b><div></div></span>
                                <span><b>Size: </b>37.5</span>
                            </div>
                            <div className="edit">
                                <div className="quantity">
                                    <span>-</span>
                                    <div>123</div>
                                    <span>+</span>
                                </div>
                                <span className="price">$ 20.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="right">
                        <h1>order summary</h1>
                        <div className='row'>
                            <span>Subtotal</span>
                            <span>$ 20.00</span>
                        </div>
                        <div className='row'>
                            <span>Estimated Shipping</span>
                            <span>$ 20.00</span>
                        </div>
                        <div className='row'>
                            <span>Shipping Discount</span>
                            <span>$ 20.00</span>
                        </div>
                        <div className='total row'>
                            <span>Total</span>
                            <span>$ 20.00</span>
                        </div>
                        <div className='button'>checkout now</div>
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </div>
    )
}