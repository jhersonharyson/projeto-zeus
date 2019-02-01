import React, { Component } from 'react';
import logo from '../img/logof.png';
import zeusbytotvs from '../img/zeusbytotvs.png'
import './style/HeaderTotvs.style.css';

class HeaderTotvs extends Component {
    render() {
        return (
            <header className="main-header">
                <div className="thinbar"></div>
                <a className="logo" style={{ "width": "500px" }}>
                    <span className="logo-lg">
                        <img src={logo} height="40" width="40" className="img-circle" alt="TOTVS" />
                    </span>
                    <span>
                        <img src={zeusbytotvs} width="150" style={{
                            marginTop: "23px",
                            height: "60px",
                            width: "auto"
                        }} alt="TOTVS" />
                    </span>
                </a>
                <nav className="navbar navbar-static-top" ></nav>
            </header>
        );
    }
}

export default HeaderTotvs;