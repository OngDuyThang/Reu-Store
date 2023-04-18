import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import './ProductDetail.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { publicRequest } from '../requestMethod.js';
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

export default function ProductDetail() {
    const location = useLocation();
    const [color, setColor] = useState('color');
    const [size, setSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const [checked, setChecked] = useState(-1);
    useEffect(() => {
        window.scrollTo(0, 0);
        const productId = location.pathname.split('/')[2];
        let getProduct = async () => {
            const result = await publicRequest.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/find/${productId}`);
            setProduct(result);
        }
        getProduct()
    }, [])
    function selectColor(color, index) {
        setColor(color);
        setChecked(index)
    }
    const dispatch = useDispatch()
    function handleAddProduct() {
        dispatch(addProduct({ ...product, color, size, productQuantity: quantity }))
    }
    return (
        <div style={{ overflow: 'hidden' }}>
            <Navbar />
            <Announcement />
            <div className="productDetailContainer">
                <div className="imgContainer">
                    <img src='https://i.ibb.co/cXFnLLV/3.png' />
                </div>
                <div className="contentContainer">
                    <h1 className="title">Denim Jumpsuit</h1>
                    <p className="description">Reu. is a leading edge fashion streetwear specialist, providing style conscious customers with innovative clothes  to suit every occasion. We pride on our unique product range - created by our in-house design team and global brand partnerships, all of which are recognisable by their individuality, design and quality.</p>
                    <span className="price">$ 20.00</span>
                    <div className="choose">
                        <div className="color">
                            <span>Color:</span>
                            <div onClick={() => selectColor('abcxyz', 1)}>{checked === 1 ? <FontAwesomeIcon icon={faCheck} /> : <></>}</div>
                            <div onClick={() => selectColor('efg', 2)}>{checked === 2 ? <FontAwesomeIcon icon={faCheck} /> : <></>}</div>
                            <div onClick={() => selectColor('ijk', 3)}>{checked === 3 ? <FontAwesomeIcon icon={faCheck} /> : <></>}</div>
                        </div>
                        <div className="size">
                            <span>Size:</span>
                            <div className="expand">
                                <span className="selected">{size}<FontAwesomeIcon icon={faAngleDown} /></span>
                                <div className="sub">
                                    <span onClick={() => setSize('M')}>M</span>
                                    <span onClick={() => setSize('L')}>L</span>
                                    <span onClick={() => setSize('XL')}>XL</span>
                                    <span onClick={() => setSize('XXL')}>XXL</span>
                                </div>
                            </div>
                        </div>
                        <div className="quantity">
                            <span onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}>-</span>
                            <div>{quantity}</div>
                            <span onClick={() => setQuantity(quantity + 1)}>+</span>
                        </div>
                    </div>
                    <div className="button" onClick={() => handleAddProduct()}>
                        Add to cart
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </div>
    )
}