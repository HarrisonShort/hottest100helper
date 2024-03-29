import React from 'react';
import './Footer.css';

const kofiImage = process.env.NODE_ENV === 'production' ? './images/kofi_button_dark.png' : require('./images/kofi_button_dark.png');

export default function Footer() {
    return (
        <div className="footer-container">
            <p className="footer-copyright">
                <a href="https://harrisonshort.com" target="_blank">Harrison Short</a> (c) 2022
            </p>
            <p className="kofi-button">
                <a href="https://ko-fi.com/harrishun" target="_blank">
                    <img src={kofiImage} alt="kofi-button" />
                </a>
            </p>
        </div>
    )
}