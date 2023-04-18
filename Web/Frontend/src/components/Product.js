import React, { useEffect } from "react";
import './Product.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from "react-redux";

export default function Product(props) {
    const navigate = useNavigate();
    function navigation(whichPage) {
        navigate(`/${whichPage}`)
    }
    const dispatch = useDispatch()
    function handleAddProduct() {
        dispatch(addProduct({ product: 'abc', color: "", size: "", productQuantity: 1 }))
    }
    return (
        <div className="productContainer">
            <div className="circle"></div>
            <img src={`${props.itemImg}`} />
            <div className="icons">
                <div className='icon' ><FontAwesomeIcon icon={faCartShopping}
                    onClick={() => handleAddProduct()} /></div>
                <div className='icon' onClick={() => navigation(`product/${props.itemId}`)}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                <div className='icon' ><FontAwesomeIcon icon={faHeart} /></div>
            </div>
        </div>
    )
}