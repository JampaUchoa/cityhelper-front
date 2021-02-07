import React, { useState } from 'react';
import './navbar.scss';
// import logo from 'media/livox-normal.png';
// import logoOut from 'media/livox-outline.png';
import { Link } from 'react-router-dom'

export default function Navbar() {

    const [navStyle, setStyle] = useState("dark");
    const scrollFunction = () => {
        if (window.scrollY > 20) {
            setStyle("normal");
        } else {
            setStyle("dark");
        }
    }

    window.addEventListener('scroll', scrollFunction);
    return (
        <>
            <div className={`navbar ${navStyle}`}>
                <div className="container">
                    <div className="logo">
                        <Link to={"/dashboard"}>
                            <img src={"https://aiboxlab.org/img/logo-aibox.png"} alt="logo" className="normal-img" />
                            <img src={"https://aiboxlab.org/img/logo-aibox.png"} alt="logo" className="outline-img" />
                        </Link>
                    </div>

                    <div className="aside">



                    </div>
                </div>
            </div>
        </>
    )

}