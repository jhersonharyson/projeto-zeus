import React, { Component } from 'react';
import HeaderTotvs from '../component/HeaderTotvs.component';
import SideBar from '../component/SidebarFuncionario.component';
class GestaoProjetos extends Component {
    render() {
        return (
            <div>
                <HeaderTotvs />
                <SideBar>
                    <h1>Olá Componente GestaoProjetos</h1>
                </SideBar>
            </div>
        );
    }
}
export default GestaoProjetos;