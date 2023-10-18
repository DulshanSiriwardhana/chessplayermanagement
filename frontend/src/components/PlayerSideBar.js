import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt
} from "react-icons/fa";
import logo from '../Icons/knight.jpg';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/PlayerDashBoard",
            name: "DashBoard",
            icon: <FaTh />
        },
        {
            path: "/Games",
            name: "Games",
            icon: <FaRegChartBar />
        },
        {
            path: "/about",
            name: "About",
            icon: <FaUserAlt />
        }
        
    ];

    return (
        <div className={`containerforNavBar ${isOpen ? 'open' : ''}`}>
            <div style={{ width: isOpen ? "160px" : "60px" }} className="sidebar">
                <div className="top_section">
                    <img style={{ display: isOpen ? "block" : "none" }} className="logo" src={logo} alt="Logo" />
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link" activeClassName="active">
                        <div className="icon">{item.icon}</div>
                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                    </NavLink>
                ))}
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
