import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import ProductList from '../components/ProductList'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import Partition from '../components/Partition'

export default function Home() {

    return (
        <div style={{
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Announcement />
            <Navbar />
            <Slider />
            <Partition />
            <Categories />
            <ProductList isShowHeader={true} />
            <Newsletter />
            <Footer />
        </div>
    )
}
