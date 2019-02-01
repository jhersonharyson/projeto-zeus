import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/Principal.style.css';
import SideBar from '../component/SidebarFuncionario.component';
import HeaderTotvs from '../component/HeaderTotvs.component';
// import Home from './../component/Home.component';
// import GestaoFuncionarios from '../component/GestaoFuncionario.component';
// import GestaoProjetos from './../component/GestaoProjetos.componnet';

class Principal extends Component {
    render() {
        return (<div>
        <HeaderTotvs />
            <SideBar>
                    <Link to="/" >asdasdsasasdasdasdasdasd32321dasd</Link><br />
                    <Link to="/home/dash" >asdasdsasasdasdasdasdasd32321dasd</Link> <br />
                    <Link to="/" >asdasdsasasdasdasdasdasd32321dasd</Link><br />
                    <Link to="/" >asdasdsasasdasdasdasdasd32321dasd</Link><br />
            </SideBar>]
        </div>
        );
    }
}

export default Principal;


