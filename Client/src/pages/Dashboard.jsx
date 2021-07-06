/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from 'react';
import '../css/Dashboard.css';
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx';
import Charts from '../components/Charts';
import Bar from '../components/Bar.jsx';

var concluida = 0;
var naoConcluida = 0;

var todos

let semPressa = 0
let importante = 0
let urgencia = 0


function buscaTarefas() {
    todos = JSON.parse(window.localStorage.getItem('tarefas'));
    contaTarefas(todos);
    contaImportancia(todos);
}

const contaTarefas = (todos) => {
    if (todos.length > 1) {
        pegaConcluida(todos);
        pegaNaoConcluida(todos);
    }
}

const pegaNaoConcluida = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key].Concluido === 0) {
            naoConcluida++;
        }
    });
}
const pegaConcluida = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key].Concluido === 1) {
            concluida++;
        }
    });
}

function contaImportancia(obj) {
    Object.keys(obj).forEach((key) => {
        if (obj[key].Importancia <= 1) {
            semPressa++;
        } else if (obj[key].Importancia === 2) {
            importante++;
        } else if (obj[key].Importancia === 3) {
            urgencia++;
        }
    });

}

function limpaCont() {
    naoConcluida = 0;
    concluida = 0;
    semPressa = 0
    importante = 0
    urgencia = 0
}

export const Dashboard = () => {
    buscaTarefas();

    useEffect(() => {
        limpaCont();
    });

    return (
        <>
            <Header />
            <div className="dashboard">
                <h1>Estatisticas das Tarefas</h1>
                <div className="board">
                    <Charts concluida={concluida} naoConcluida={naoConcluida} />
                    <Bar semPressa={semPressa} importante={importante} urgente={urgencia} />
                </div>
            </div>
            <Footer />
        </>
    );
}