import React, { useState } from 'react';
import './Cart.scss';
import Navbar from "src/components/navbar/Navbar";
import Announcement from "src/components/announcement/Announcement";
import Newsletter from "src/components/newsletter/Newsletter";
import Footer from "src/components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeQuantity, removeProduct } from '../../redux/cartRedux';

export default function Cart() {
    const shipping = 5, discount = 3
    window.scrollTo(0, 0)
    const navigate = useNavigate();
    function navigation(whichPage) {
        navigate(`/${whichPage}`)
    }

    const dispatch = useDispatch();
    const { products, total, cartQuantity } = useSelector(state => state.cart)

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
                    <div className="back"
                        onClick={() => navigation('home')}>continue shopping</div>
                    <div className="center">
                        <span>Shopping Bag ({cartQuantity})</span>
                        <span>Your Wishlist (0)</span>
                    </div>
                    <div className="button">checkout now</div>
                </div>

                <div className="cart">
                    <div className="left">
                        {products.length == 0 && <h1 style={{ marginTop: 'auto', marginBottom: 'auto' }}>Your cart is empty...</h1>}
                        {products && products.length > 0 && products.map((item, index) => {
                            return (
                                <div className="product">
                                    <img src={item.img ? item.img[0] : ''} onClick={() => navigation(`product/${item._id}`)} />
                                    <div className="detail">
                                        <span><b>Product: </b>{item.title}</span>
                                        <span><b>ID: </b>{item._id}</span>
                                        <span className='color'><b>Color: </b><div
                                            style={{ backgroundColor: item.color ? `${item.color}` : 'red' }}></div></span>
                                        <span><b>Size: </b>{item.size}</span>
                                    </div>
                                    <div className="edit">
                                        <div className="quantity">
                                            <span onClick={() => setProductQuantity(index, -1)}>-</span>
                                            <div>{item.productQuantity}</div>
                                            <span onClick={() => setProductQuantity(index, 1)}>+</span>
                                        </div>
                                        <span className="price">$ {item.price * item.productQuantity}</span>
                                        <span className="remove" onClick={() => dispatch(removeProduct(index))}>Remove</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="right">
                        <h1>order summary</h1>
                        <div className='row'>
                            <span>Subtotal</span>
                            <span>$ {total}</span>
                        </div>
                        <div className='row'>
                            <span>Estimated Shipping</span>
                            <span>$ {shipping}</span>
                        </div>
                        <div className='row'>
                            <span>Shipping Discount</span>
                            <span>$ {discount}</span>
                        </div>
                        <div className='total row'>
                            <span>Total</span>
                            <span>$ {total + shipping - discount}</span>
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