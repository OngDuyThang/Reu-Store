import React from 'react';
import Navbar from "src/components/navbar/Navbar";
import Announcement from "src/components/announcement/Announcement";
import Footer from 'src/components/footer/Footer';
import Newsletter from 'src/components/newsletter/Newsletter';
import Info from 'src/components/info/Info';

export default function Introduction() {
    return (
        <div style={{
            overflow: 'hidden',
            position: 'relative'
        }}>
            <Announcement />
            <Navbar />
            <Info />
            <Newsletter />
            <Footer />
        </div>
    )
}