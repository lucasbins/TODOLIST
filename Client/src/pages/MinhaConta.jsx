import React from 'react';
import Header from '../components/Header.jsx'
import '../css/Account.css'
import Footer from '../components/Footer.jsx';
import { pegaUsuarioLogado } from "../services/usuarioLogado.js";


export const MinhaConta = () => {

    var usuario = pegaUsuarioLogado();


    return (
        <>
            <div className="account">
                <h2>Minha Conta</h2>
                <div>
                    <h1>Nome:</h1>
                    <span>{usuario.Nome}</span>
                </div>
                <div>
                    <h1>Email:</h1>
                    <span>{usuario.Email}</span>
                </div>
                <div>
                    <h1>Data de nascimento:</h1>
                    <span>{usuario.Datanasc.match(/(.*)T/)[1]}</span>
                </div>
            </div>
            <Header />
            <Footer />
        </>
    );
}