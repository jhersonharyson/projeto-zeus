import React, { Component } from 'react';
import logo from '../img/logo.png';
import './style/Login.style.css';
import * as $ from 'jquery'

class Login extends Component{
  constructor(){
  super();
  this.state = {user: "", pass: ""};
  this.submissao = this.submissao.bind(this);
  this.onChange = this.onChange.bind(this);
}
onChange = (evento)=>{
  if(evento.target.name === "user"){
    const user = evento.target.value;
    this.setState({user: user});
  }else if(evento.target.name === "pass"){
    const pass = evento.target.value;
    this.setState({pass: pass});
  }
}
submissao = (evento)=>{
  evento.preventDefault();
  //const dados = this.state;
  //  $.ajax({
  //     url:'http://localhost:4000/dados',
  //     contentType:'application/json',
  //     dataType:'json',
  //     type:'post',
  //     data: JSON.stringify(dados),
  //     success: function(resposta){
  //       console.log(resposta);
  //     },
  //     error: function(resposta){
  //       console.log(resposta);
  //     }
  //   });
    
  //alert('oi');
}
componentDidMount(){
  //alert('1');
}
componentWillMount(){
  //alert('2');
}
render(){
  $(document).ready(
    function(){
      $('.logo').fadeIn(4000);  
    });
 
  return(
    <div className="container">
    <div id="login" className="login">
    <div className="login-icon-field">
    <img className="logo" src={logo} style={{width: "140px", margin: "25%"}} alt="totvs" />    </div>
    <div className="login-form">
    <div className="username-row row">
    <label htmlFor="username_input">
    <svg  className="user-icon" x="0px" y="0px"
    viewBox="-255 347 100 100"  height="36px" width="30px">
    <path className="user-path" d="
    M-203.7,350.3c-6.8,0-12.4,6.2-12.4,13.8c0,4.5,2.4,8.6,5.4,11.1c0,0,2.2,1.6,1.9,3.7c-0.2,1.3-1.7,2.8-2.4,2.8c-0.7,0-6.2,0-6.2,0
    c-6.8,0-12.3,5.6-12.3,12.3v2.9v14.6c0,0.8,0.7,1.5,1.5,1.5h10.5h1h13.1h13.1h1h10.6c0.8,0,1.5-0.7,1.5-1.5v-14.6v-2.9
    c0-6.8-5.6-12.3-12.3-12.3c0,0-5.5,0-6.2,0c-0.8,0-2.3-1.6-2.4-2.8c-0.4-2.1,1.9-3.7,1.9-3.7c2.9-2.5,5.4-6.5,5.4-11.1
    C-191.3,356.5-196.9,350.3-203.7,350.3L-203.7,350.3z"/>
    </svg>
    </label>
    <input name="user" value={this.state.user} onChange={this.onChange} type="text" id="username_input" className="username-input" placeholder="Usuário" required/>
    </div>
    <div className="password-row row">
    <label htmlFor="password_input">
    <svg  className="password-icon" x="0px" y="0px"
    viewBox="-255 347 100 100" height="36px" width="30px">
    <path className="key-path" d="M-191.5,347.8c-11.9,0-21.6,9.7-21.6,21.6c0,4,1.1,7.8,3.1,11.1l-26.5,26.2l-0.9,10h10.6l3.8-5.7l6.1-1.1
    l1.6-6.7l7.1-0.3l0.6-7.2l7.2-6.6c2.8,1.3,5.8,2,9.1,2c11.9,0,21.6-9.7,21.6-21.6C-169.9,357.4-179.6,347.8-191.5,347.8z"/>
    </svg>
    </label>
    <input name="pass" value={this.state.pass} onChange={this.onChange} type="password" id="password_input" className="password-input input"  placeholder="Senha" required></input>
    </div>
    </div>
    <div className="call-to-action">
    <button id="login-button" style={{margin: "auto"}} type="submit" onClick={this.submissao}>Entrar</button>
  
  </div>
  </div>
  </div>
  );
}
}


export default Login;