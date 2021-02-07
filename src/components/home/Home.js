import React from 'react';
import "./home.scss";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi"
import { Link } from 'react-router-dom';
export default function Home() {

    return (
        <div className="home-page">
            <header className="banner">
                <div className="skew-bg">
                </div>

                <div className="container">
                    <div className="text">
                        <h1> Ajuda.AI </h1>
                        <h3> Abra chamados e ajuda sua cidade. </h3>
                        <Link to={"/chamados"}>
                            <button>
                                Ver chamados
                            </button>
                        </Link>

                    </div>
                    <div className="graphics">
                    </div>

                </div>

            </header>


            <div className="last">
                <div className="social-networks">
                    <h2> Redes sociais</h2>
                    <a href="/" aria-label="Ver nosso facebook">
                        <FiFacebook />
                    </a>
                    <a href="/" aria-label="Ver nosso Instagram">
                        <FiInstagram />
                    </a>
                    <a href="/" aria-label="Ver nosso Instagram">
                        <FiYoutube />
                    </a>

                </div>
                <div className="copyright">
                    Copyright © Ajuda.ai - Todos direitos reservados.
                </div>
            </div>
        </div>

    )


}