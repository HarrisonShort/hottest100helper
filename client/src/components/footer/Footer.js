import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <div className="footer-container">
            <p className="footer-copyright">
                <a href="https://harrisonshort.com" target="_blank">Harrison Short</a> (c) 2022
            </p>
            <p className="kofi-button">
                <a href="https://ko-fi.com/harrishun" target="_blank">
                    <img src={require('./images/kofi_button_dark.png')} alt="kofi-button" />
                </a>
            </p>
        </div>
    )
}