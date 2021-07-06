import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { Tabs, Tab } from 'react-bootstrap';
import Api from '../services/api';

import { useGlobalUser } from "../user.context"

import { pegaUsuarioLogado } from "../services/usuarioLogado.js";

var usuario = pegaUsuarioLogado();


function TodoList() {
  const [todos, setTodos] = useState([]);
  const [historico, sethistorico] = useState([[]]);
  const [user] = useGlobalUser();

  var todo = [];

  function pegaNaoConcluida(obj) {
    Object.keys(obj.data).forEach((key) => {
      if (obj.data[key].Concluido !== 1) {
        todo.push(obj.data[key]);
      }
    });
  }

  const buscaTarefas = (user) => {
    Api.post("getTarefas", {
      idUser: user.PkIdUser
    }).then((response) => {
      window.localStorage.setItem("tarefas", JSON.stringify(response.data));
      sethistorico(response.data)
      pegaNaoConcluida(response)
      setTodos(todo)
    });
  }

  useEffect(() => {
    usuario = pegaUsuarioLogado();
    buscaTarefas(usuario)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <Tabs id="controlled-tab" style={{ marginBottom: 10 }}>
        <Tab eventKey="tarefas" title="Tarefas" className="Tab">
          <h1>Qual sua tarefa para hoje?</h1>
          <TodoForm />
          <Todo
            todos={todos}
          />
        </Tab>
        <Tab eventKey="historico" title="Historico">
          <Todo
            todos={historico}
            historico={true}
          />
        </Tab>
      </Tabs>
    </>
  );
}

export default TodoList;