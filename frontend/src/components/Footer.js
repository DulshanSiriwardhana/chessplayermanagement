import React from 'react';
import '../App.css';
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row" style={{padding:'20px',paddingLeft:'150px'}}>
                    <div className="col-md-6">
                        <h2>Contact Us</h2>
                        <p>If you have any questions or need assistance, feel free to reach out:</p>
                        <ul>
                            <li>Email: MantisOfficial@gmail.com</li>
                            <li>Phone: +94 77-3948165</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h2>Follow Us</h2>
                        <p>Stay connected with us on social media for updates and news:</p>
                        <div style={{marginLeft:'100px'}}>
                            <FaFacebook style={{marginRight:'50px'}} />
                            <FaInstagram style={{marginRight:'50px'}} />
                            <FaTwitter style={{marginRight:'50px'}} />
                            <FaLinkedin style={{marginRight:'50px'}} />
                        </div>

                    </div>
                </div>
                <hr />
                <div className="text-center">
                    <p>&copy; {new Date().getFullYear()} Chess Player Management Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
