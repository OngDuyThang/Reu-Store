import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import ProductList from "../components/ProductList";
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import './ProductPage.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom';

export default function ProductPage() {
    const location = useLocation();
    const [category, setCategory] = useState();
    const [filter, setFilter] = useState({
        color: 'Color',
        size: 'Size',
    });
    const [sort, setSort] = useState('Sort');

    useEffect(() => {
        window.scrollTo(0, 0);
        setCategory(location.pathname.split('/')[2]);
    })

    function handleFilter(which, value) {
        let copyState = { ...filter };
        copyState[which] = value;
        setFilter({
            ...copyState
        });
    }

    return (
        <div style={{ overflow: 'hidden' }}>
            <Announcement />
            <Navbar />
            <div className="productPageContainer">
                <div className="header">
                    <h1>Dresses</h1>
                    <div className="filter">
                        <div className="left">
                            <span className="title">Products Filter:</span>
                            <div className="expand">
                                <span className="selected">{filter.color}<FontAwesomeIcon icon={faAngleDown} className='icon' /></span>
                                <div className="sub">
                                    <span onClick={() => handleFilter('color', 'White')}>White</span>
                                    <span onClick={() => handleFilter('color', 'Black')}>Black</span>
                                    <span onClick={() => handleFilter('color', 'Red')}>Red</span>
                                    <span onClick={() => handleFilter('color', 'Blue')}>Blue</span>
                                    <span onClick={() => handleFilter('color', 'Yellow')}>Yellow</span>
                                    <span onClick={() => handleFilter('color', 'Green')}>Green</span>
                                </div>
                            </div>
                            <div className="expand">
                                <span className="selected">{filter.size}<FontAwesomeIcon icon={faAngleDown} className='icon' /></span>
                                <div className="sub">
                                    <span onClick={() => handleFilter('size', 'S')}>S</span>
                                    <span onClick={() => handleFilter('size', 'M')}>M</span>
                                    <span onClick={() => handleFilter('size', 'L')}>L</span>
                                    <span onClick={() => handleFilter('size', 'XL')}>XL</span>
                                    <span onClick={() => handleFilter('size', 'XXL')}>XXL</span>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <span className="title">Products Filter:</span>
                            <div className="expand">
                                <span className="selected">{sort}<FontAwesomeIcon icon={faAngleDown} className='icon' /></span>
                                <div className="sub">
                                    <span onClick={() => setSort('Newest')}>Newest</span>
                                    <span onClick={() => setSort('Ascending')}>Ascending</span>
                                    <span onClick={() => setSort('Descending')}>Descending</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductList
                    isShowHeader={false}
                    category={category}
                    filter={filter}
                    sort={sort} />
                <Newsletter />
            </div>
            <Footer />
        </div>
    )
}