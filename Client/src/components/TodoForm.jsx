import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import api from '../services/api';

import { pegaUsuarioLogado } from "../services/usuarioLogado.js";
var usuario = pegaUsuarioLogado();

function TodoForm(props) {
    const [input, setInput] = useState("");
    const [importancia, setImportancia] = useState(1);


    useEffect(() => {
        usuario = pegaUsuarioLogado();
    })

    const addTarefa = (user) => {
        api.post("tarefa", {
            descricao: input,
            importancia: importancia,
            user: user.PkIdUser,
        }).then((response) => {
            console.log(response);
        });
    };

    const alteraTarefa = () => {
        api.post("alteraTarefa", {
            id: props.edit.id,
            NomeTarefa: input,
            importancia: importancia
        }).then((response) => {
            console.log(response)
        });
    };

    return (
        <form className='todo-form'>
            {props.edit ? (
                <>
                    <Form.Check
                        inline
                        type="radio"
                        label={<span class="badge badge-success">Sem pressa</span>}
                        name="importancia"
                        id="importancia1"
                        onChange={(event) => { setImportancia(event.target.value) }}
                        Value='1'
                    />
                    <Form.Check
                        inline
                        type="radio"
                        label={<span class="badge badge-warning">importante</span>}
                        name="importancia"
                        id="importancia2"
                        onChange={(event) => { setImportancia(event.target.value) }}
                        value='2'
                    />
                    <Form.Check
                        inline
                        type="radio"
                        label={<span class="badge badge-danger">Urgente</span>}
                        name="importancia"
                        id="importancia3"
                        onChange={(event) => { setImportancia(event.target.value) }}
                        value='3'
                    />
                    <br />
                    <input
                        placeholder='Atualizar Tarefa'
                        value={input}
                        onChange={(event) => { setInput(event.target.value) }}
                        name='text'
                        className='todo-input edit'
                    />
                    <button onClick={() => alteraTarefa(props.edit.id)} className='todo-button edit'>
                        Atualizar
                    </button>
                </>
            ) : (
                <>
                    <Form.Check
                        inline
                        type="radio"
                        label={<span class="badge badge-success">Sem pressa</span>}
                        name="importancia"
                        id="importancia1"
                        onChange={(event) => { setImportancia(event.target.value) }}
                        value='1'
                    />
                    <Form.Check
                        inline
                        type="radio"
                        label={<span class="badge badge-warning">importante</span>}
                        name="importancia"
                        id="importancia2"
                        onChange={(event) => { setImportancia(event.target.value) }}
                        value='2'
                    />
                    <Form.Check
                        inline
                        type="radio"
                        label={<span class="badge badge-danger">Urgente</span>}
                        name="importancia"
                        id="importancia3"
                        onChange={(event) => { setImportancia(event.target.value) }}
                        value='3'
                    />
                    <br />
                    <input
                        placeholder='Adicionar Tarefa'
                        value={input}
                        onChange={(event) => { setInput(event.target.value) }}
                        name='text'
                        className='todo-input'
                    />

                    <button onClick={() => (addTarefa(usuario))} className='todo-button'>
                        <i className="fa fa-plus-circle" style={{ fontSize: '20px' }} />
                    </button>
                </>
            )
            }
        </form >
    );
}

export default TodoForm;