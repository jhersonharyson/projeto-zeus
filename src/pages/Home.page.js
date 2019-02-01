import React, { Component } from 'react';
// import HeaderTotvs from '../component/HeaderTotvs.component';

import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from '../component/Login.component';
import Principal from '../pages/Principal.page';
import GestaoFuncionario from '../component/GestaoFuncionario.component';
import GestaoProjetos from '../component/GestaoProjetos.component';
// import GestaoProjetos from '../component/Usuario.component';
import HomeComponent from '../component/Home.component';
import './style/Principal.style.css';

class Home extends Component {
    render() {
        return (
            <div>
                <div style={{ "marginTop": "-20px" }}>
                    {/* <HeaderTotvs /> */}
                    {/* <div className="over" id="over-main" style={{backgroundColor: "white"}} /> */}
                </div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact={true} component={Login} />
                        <Route path="/home/" exact={true} component={Principal} />
                        {/* <Route path="/home/usuario" exact={true} component={Usuario} /> */}
                        <Route path="/home/dash" exact={true} component={HomeComponent} />
                        <Route path="/home/gestao-funcionarios" exact={true} component={GestaoFuncionario} />
                        <Route path="/home/gestao-projetos" exact={true} component={GestaoProjetos} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default Home;