import React, { Component } from 'react';
import HeaderTotvs from '../component/HeaderTotvs.component';
import SideBar from '../component/SidebarFuncionario.component';
import * as $ from 'jquery';
import * as axios from 'axios';
import { DateRange } from 'react-date-range';
import './style/GestaoFuncionario.style.css'

var CanvasJSReact = require('./third/canvasjs.react');
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class GestaoFuncionarios extends Component {
    constructor() {
        super();
        this.state = {
            funcionarios: [],
            tarefas: [],
            items: [],
            itemsTarefas: [],
            options: {},
            startDate: "",
            endDate: "",
            nomeFuncionario: "",
            hours: 0.0,
            filtroTarefas: ""
        };

        axios.get("http://localhost:8005/zeus_integrator/webresources/funcionarios").then((res) => {
            this.setState({ funcionarios: res.data });
        }).catch((error) => {
            alert('Erro ao Conectar com o Servidor REST');
        });

        this.getFuncionario = this.getFuncionario.bind(this);

        this.filterList = this.filterList.bind(this);

        this.filterListTarefas = this.filterListTarefas.bind(this);

        this.refFiltroTarefas = React.createRef();
    }

    // FUNÇÃO DE PROCESSAMENTO DO ARRAY PARA O PADRÃO ACEITO PELA API DO CANVASJS
    arrayGoogle(task) {
        var a = [];
        var i;
        this.setState({ hours: 0.0 });
        for (i = 0; i < task.length; i++) {
            this.setState({ hours: parseFloat(this.state.hours) + parseFloat(task[i].hour) });
        }
        for (i = 0; i < task.length; i++) {
            a.push({ label: task[i].name, y: parseFloat(task[i].hour).toFixed(1), p: (parseFloat(task[i].hour) * 100 / this.state.hours).toFixed(1) });
        }
        return a;
    }
    // FUNÇÃO RECEBE O RETORNO DA JSON API PARA INFORMAÇÕES DE FUNCIONÁRIOS
    getFuncionario(funcionario) {

        let self = this;

        const id = funcionario.id;

        const nomeFuncionario = funcionario.firstname + " " + funcionario.lastname;

        this.setState({ nomeFuncionario });

        let start = this.state.startDate.split('/');

        let end = this.state.endDate.split('/');

        start = start[2] + start[1] + start[0];

        end = end[2] + end[1] + end[0];

        axios.get("http://localhost:8005/zeus_integrator/webresources/funcionarios/task/" + id + "/" + start + "/" + end + "")
            .then((res) => {
                //this.setState({ funcionarios: res.data });
                const task = res.data;

                const gArray = this.arrayGoogle(task);

                //console.log(gArray);

                var options = {
                    backgroundColor: "rgba(225,255,255,0.0)",
                    exportEnabled: true,
                    theme: 'dark2',
                    exportFileName: "funcionario-" + this.state.nomeFuncionario + "-" + this.state.startDate + "-" + this.state.endDate,
                    title: {
                        text: "Tarefas por Período"
                    },
                    subtitles: [{
                        text: this.state.nomeFuncionario + " trabalhou " + this.state.hours + " horas no periodo de " + this.state.startDate + " até " + this.state.endDate + ""
                    }],
                    animationEnabled: true,
                    animationDuration: 2000,
                    data: [{
                        explodeOnClick: false,
                        click: function (e) {

                            const dataPoint = e.dataPoint;
                            const filtroTarefas = dataPoint.label;
                            //alert(dataPoint.label);
                            self.setState({ filtroTarefas });
                            // self.getFuncionario();
                            // console.log(self.refFiltroTarefas.current.onClick;
                            $('#filtroTarefas').click();
                        },
                        type: "pie",
                        toolTipContent: "<b> {label}</b>: {p}% ",
                        showInLegend: "true",
                        legendText: " {label} | {y}h ",
                        indexLabelFontSize: 16,
                        indexLabel: " {label} - {p}% ",
                        dataPoints: gArray
                    }]
                };

                axios.get("http://localhost:8005/zeus_integrator/webresources/funcionarios/tasks/" + id + "/" + start + "/" + end + "")
                    .then((res) => {
                        const tarefas = res.data;
                        this.setState({ tarefas });
                        this.setState({ itemsTarefas: tarefas });
                    }).catch((error) => {

                        alert('Erro ao Conectar com o Servidor REST');

                    });

                
                this.openRightMenu();

                this.X = true;

                this.setState({ options: options });

            }).catch((error) => {
                alert('Erro ao Conectar com o Servidor REST');
            });

    }

    X = true;

    // FILTRO DA LISTA DE FUNCIONARIOS
    filterList(event) {
        event.preventDefault();
        let updatedList = this.state.funcionarios;
        updatedList = updatedList.filter(function (item) {
            return (
                (item.firstname.toLowerCase() + " " + item.lastname.toLowerCase() + " " + item.id)
                    .search(event.target.value.toLowerCase()) !== -1
            );
        });
        this.setState({ items: updatedList });
    }

    // FILTRO DA LISTA DE TAREFAS
    filterListTarefas(event) {
        this.setState({ filtroTarefas: event.target.value });
        let updatedList = this.state.tarefas;
        updatedList = updatedList.filter(function (item) {
            return (
                (item.projName.toLowerCase() + " "
                    + item.name.toLowerCase() + " "
                    + item.projId + " "
                    + item.spent_on.toLowerCase() + " "
                    + item.comments.toLowerCase() + " ")
                    .search(event.target.value.toLowerCase()) !== -1
            );
        });
        this.setState({ itemsTarefas: updatedList });
    }

    componentDidMount() {
        $(".rdr-Calendar:first()").css('display', 'none');
        $('#in-cld').on('focusin', function () {
            $('#calendar').fadeIn(4000);
        });
        $('#calendar').hide();
    }

    // ATRIBUI O PERIODO DE ANÁLISE PARA OS STATES  
    getRangeData(date) {
        let data = date;
        this.setState({ endDate: data.endDate.format('DD/MM/YYYY'), startDate: data.startDate.format('DD/MM/YYYY') });
    }

    // ABRE ABA LATERAL DIREITA  
    openRightMenu() {
        $('#over-main').css({zIndex: "500"});
        $('#over-main').fadeIn(4000);
        $("#rightMenu").css("display", "block");
    }

    // FECHA ABA LATERAL DIREITA 
    closeRightMenu() {
        $('#over-main').css({zIndex: "-200"});
        $("#rightMenu").fadeOut(1000);
        this.X = false;
    }

    // FECHA ABA LATERAL DIREITA 
    clsCalendar() {
        $('#calendar').hide();
    }

    render() {

        let self = this;

        return (
            <div>
            <HeaderTotvs />
                <SideBar>
                    <div className="w3-sidebar w3-bar-block w3-card w3-animate-right"
                        style={{
                            display: "none",
                            right: "0",
                            width: "100%",
                            backgroundColor: "#000000f9",
                            zIndex: "1000000"
                        }}
                        id="rightMenu">
                        <button
                            onClick={this.closeRightMenu.bind(this)}
                            className="w3-bar-item w3-button w3-large"
                            style={{ borderRadius: "0", color: "white" }}
                        > &times;
                        </button>

                        {this.X ? (<CanvasJSChart options={self.state.options} style={{ maxWidth: "700px", padding: "10%", height: "500px", marginTop: "15px" }} />) : ""}

                        <div style={{ marginTop: "20px", paddingTop: "3px", border: "1px solid white" }}>

                            <i className="fa fa-search"
                                style={{
                                    color: "white",
                                    paddingTop: "5px",
                                    marginLeft: "25px", fontSize: "20px"
                                }}> </i>

                            <input
                                type="text"
                                style={{
                                    display: "inline",
                                    marginLeft: "15px",

                                    width: "200px",
                                    maxWidth: "320px",
                                    padding: "5px"
                                }}
                                id="filtroTarefas"
                                onChange={this.filterListTarefas}
                                onClick={this.filterListTarefas}
                                value={this.state.filtroTarefas}
                                className="w3-input w3-animate-input"
                                placeholder="Filtrar..."
                            />

                            <div
                                style={{
                                    marginTop: "25px",
                                    maxHeight: "450px",
                                    overflow: "auto",
                                    border: "1px solid white",
                                    backgroundColor: "#0a0a0aa8"
                                }}>

                                <ul
                                    style={{
                                        margin: "auto",
                                        width: "85%",
                                        color: "white",
                                        height: "250px"
                                    }}>
                                    {this.state.itemsTarefas.map(function (item, index) {

                                        return (<a key={index}>

                                            <div className="link">
                                                <li>Projeto: {item.projName}</li>
                                                <li>Atividade: {item.name}</li>
                                                <li>Detalhe da Atividade: {item.subject}</li>
                                                <li>Comentário: {item.comments}</li>
                                                <li>Data: {item.spent_on}</li>
                                                <li>Tempo Gasto: {item.hours}</li>
                                            </div>
                                        </a>);
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div
                        className="overBlockFor"
                        style={{
                            width: "80%",
                            margin: "auto",
                            marginTop: "50px",
                            padding: "20px",
                            backgroundColor: "#0a0a0a70",
                            color: "white",
                            display: "block"
                        }}>
                        <h2
                            style={{
                                maxWidth: "313px",
                                margin: "auto",
                                marginTop: "25px",
                                color: "white",
                                borderBottom: "2px solid white"
                            }}
                        >Gestão de Funcionários</h2>

                        <h4
                            style={{
                                maxWidth: "400px",
                                paddingTop: "25px",
                                marginLeft: "15px"
                            }}
                            htmlFor="func">

                            <i className="fa fa-search"> </i>

                            <input
                                id="in"
                                name="func"
                                type="text"
                                style={{
                                    display: "inline",
                                    marginLeft: "15px",
                                    paddingLeft: "5px",
                                    width: "200px", marginRight: "200px", maxWidth: "320px"
                                }}
                                className="w3-input w3-animate-input"
                                placeholder="Pesquisar..."
                                onChange={this.filterList} />

                            <div style={{
                                marginTop: "15px",
                                width: "280px",
                                position: "absolute",
                                zIndex: "200"
                            }}>
                                <input
                                    type="text"
                                    style={{
                                        display: "inline",
                                        marginLeft: "35px",
                                        width: "200px",
                                        maxWidth: "320px",
                                        padding: "5px"
                                    }}
                                    className="w3-input w3-animate-input"
                                    id="in-cld"
                                    placeholder="Periodo..."
                                    value={this.state.startDate ? this.state.startDate + " até " + this.state.endDate : ""} />
                                <i className="fa fa-calendar"></i>

                                {/* }} value={(this.state.dateIni) ? this.state.dateIni+" até "+this.state.dateFim: "" } /> */}

                                <span id="calendar">
                                    <DateRange
                                        onChange={this.getRangeData.bind(this)}
                                        onInit={this.getRangeData.bind(this)} />

                                    <button
                                        id="apl"
                                        className="fa fa-check"
                                        onClick={this.clsCalendar.bind(this)} ></button>

                                </span>
                            </div>
                        </h4>


                        <br />
                        <br />
                        {/* <List items={this.state.items} /> */}

                        <div style={{ marginTop: "15px", maxHeight: "450px", overflow: "auto", border: "1px solid white", backgroundColor: "#0a0a0aa8" }}>
                            <ul style={{ margin: "auto", width: "85%" }}>
                                {this.state.items.map(function (item) {
                                    return (<a key={item.id}>
                                        <div className="link">
                                            <li>Nome: {item.firstname}</li>
                                            <li>Sobrenome: {item.lastname}</li>
                                            <li>id: {item.id}</li>
                                            <div>
                                                <button
                                                    style={{ width: "98%", margin: "10px", color: "rgb(200,200,200)", fontSize: "18px" }}
                                                    onClick={() => { self.getFuncionario(item); }}><i className="fa fa-pie-chart"> </i> Análisar</button>
                                            </div>
                                        </div>
                                    </a>);
                                })}

                            </ul>
                        </div>
                        Quantidade de funcionários: {this.state.funcionarios.length}
                    </div>

                </SideBar>
            </div>
        );
    }
}

// class List extends Component {
//     constructor(){
//         super();
//         this.ok = this.ok.bind(this);
//     }
//     ok(){


//     }
//     render() {

//         return (
//             <div style={{ marginTop: "15px", maxHeight: "450px", overflow: "auto", border: "1px solid white", backgroundColor: "#0a0a0aa8" }}>
//                 <ul style={{ margin: "auto", width: "85%" }}>
//                     {this.props.items.map(function (item) {
//                         return (<a key={item.id}>
//                             <div className="link">
//                                 <li>Nome: {item.firstname}</li>
//                                 <li>Sobrenome: {item.lastname}</li>
//                                 <li >id: {item.id}</li>
//                                 <div>
//                                     <button style={{ width: "98%", margin: "10px" }} 
//                                     onClick={()=>{this.ok}}>Análise</button>
//                                 </div>
//                             </div>
//                         </a>);
//                     })}
//                 </ul>
//             </div>
//         );
//     }
// }

export default GestaoFuncionarios;