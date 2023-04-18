import React, { useEffect, useState } from "react";
import './ProductList.scss';
import Product from '../components/Product'
import { productArray } from '../data.js'
import { publicRequest } from '../requestMethod.js';

export default function ProductList(props) {
    const { category, filter, sort } = props;
    const [products, setProducts] = useState([]);
    useEffect(() => {
        let getProducts = async () => {
            let result = [];
            try {
                result = await publicRequest.get(
                    category
                        ? `${process.env.REACT_APP_BACKEND_URL}/api/products/findAll?getByCategories=${category}`
                        : `${process.env.REACT_APP_BACKEND_URL}/api/products/findAll?getNewest=true`
                );;
                setProducts(result);
                console.log(result);
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [category])
    return (
        <div className="productListContainer">
            <div className="circleLeft"
                style={{
                    display: props.isShowHeader ? 'block' : 'none'
                }}>
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="four"></div>
            </div>
            <div className="circleRight"
                style={{
                    display: props.isShowHeader ? 'block' : 'none'
                }}>
                <div className="one"></div>
                <div className="two"></div>
            </div>
            <div className="title"
                style={{
                    display: props.isShowHeader ? 'block' : 'none'
                }}>
                <h1>Popular Garments</h1>
            </div>
            <div className="content">
                {productArray && productArray.length > 0 && category &&
                    productArray
                        .filter((item, index) => {
                            return item.color === filter.color || item.size === filter.size;
                        })
                        .sort((a, b) => {
                            switch (sort) {
                                case 'Newest':
                                    return a.createdAt - b.createdAt;
                                case 'Ascending':
                                    return a.price - b.price;
                                case 'Descending':
                                    return b.price - a.price;
                            }
                        })
                        .map((item, index) => {
                            return (
                                <Product itemImg={item.img}
                                    itemTitle={item.title}
                                    itemId={item.id} />
                            )
                        })
                }
                {productArray && productArray.length > 0 && !category &&
                    productArray.map((item, index) => {
                        if (index < 8) {
                            return (
                                <Product itemImg={item.img}
                                    itemTitle={item.title}
                                    itemId={item.id} />
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}