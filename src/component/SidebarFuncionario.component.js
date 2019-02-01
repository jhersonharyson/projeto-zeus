import React, { Component } from 'react';
import './style/SidebarFuncionario.style.css';
import {Link} from 'react-router-dom';
// import {Link,Switch, Route} from 'react-router-dom';

class SidebarFuncionario extends Component {
    render() {
        return (<div>
            <div className="s-layout">
                <div className="s-layout__sidebar">
                    <a className="s-sidebar__trigger" href="#0">
                        <i className="fa fa-bars"></i>
                    </a>
                    
                    <nav className="s-sidebar__nav" style={{zIndex:"10000"}}>
                
                        <ul>
                            <li>
                                <div className="s-sidebar__nav-link" href="#0">
                                    <i className="fa fa-address-card-o"></i>
                                    <em>Usuário<br /><small>Função</small></em>
                                </div>
                            </li>
                            <li>
                                {/* <Link to='/home/' component={Home}>Home</Link> */}
                                <Link to="/home/dash" className="s-sidebar__nav-link">
                                
                                    <i className="fa fa-home"></i><em>Home</em>
                                </Link>
                            </li>
                            <li>
                              <Link to="/home/gestao-funcionarios" className="s-sidebar__nav-link">
                                    <i className="fa fa-user-circle-o"></i><em>Gestão de Funcionários </em>
                             </Link>
                            </li>
                            <li>
                              <Link to="/home/gestao-projetos" className="s-sidebar__nav-link">
                                    <i className="fa fa-calendar-check-o"></i><em>Gestão de Projetos</em>
                             </Link>
                            </li>
                            <Link to="/" className="s-sidebar__nav-link">
                                <i className="fa fa-remove"></i><em>Sair</em>
                            </Link>
                        </ul>             
                    </nav>
                </div>
                <main className="s-layout__content">
                    {this.props.children}
                </main>
            </div>
        </div>
        );
    }
}

export default SidebarFuncionario;