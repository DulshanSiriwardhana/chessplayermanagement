import React from 'react';
import logo from '../Icons/knight.jpg';
import '../App.css';

const Header = () => {
    const headerStyle = {
        position: 'sticky',
        top: '0', // Set the background color you prefer
        zIndex: '2', // Ensure the header appears above other content
        //boxShadow:"5px 5px 1px 0px"
    };

    return (
        <div className='header' style={headerStyle}>
            <img src={logo} alt="Logo" />
            <p>Chess Player Management Platform</p>
        </div>
    );
};

export default Header;