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
import StripeCheckout from 'react-stripe-checkout';
import { checkout } from 'src/redux/apiCalls';
import Delay from 'src/components/delay/Delay';
import Popup from 'src/components/popup/Popup';

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

    const { isSession } = useSelector(state => state.user)
    const { isFetching, error } = useSelector(state => state.order)
    const { showPopup } = useSelector(state => state.popup)
    async function onToken(resToken) {
        await checkout(dispatch, { tokenId: resToken.id, amount: total })
    }

    function preventCheckout(e) {
        if (!isSession) {
            e.preventDefault()
            alert('You must sign in before checkout!')
        }
    }

    return (
        <div style={{ overflow: 'hidden' }}>
            <Delay showDelay={isFetching} />
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
                    <div className="button"><a href='#checkout'>checkout now</a></div>
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

                    <div className="right" id='checkout'>
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
                        <StripeCheckout
                            name='Rêu Store'
                            billingAddress
                            shippingAddress
                            description={`Your total is $${total}`}
                            amount={total}
                            token={onToken}
                            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                        >
                            <div className='button' onClick={(e) => preventCheckout(e)}>checkout now</div>
                        </StripeCheckout>
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
            <Popup isShow={showPopup === 1 ? true : false}
                isSuccess={error === false ? true : false}
                successMess='Your order has been recorded!'
                failMess='Something went wrong! Please order again' />
        </div>
    )
}