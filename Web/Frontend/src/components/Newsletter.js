import React from 'react';
import './Newsletter.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Newsletter() {
    return (
        <div className="newsletterContainer">
            <h1>Newsletter</h1>
            <span>Get timely updates from your favorite products</span>
            <div className="email">
                <input type='email' placeholder='Your email' />
                <div className="icon">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>
            </div>
        </div>
    )
}