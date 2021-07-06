import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCheckboxCircleFill, RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import api from '../services/api';
import { useGlobalUser } from '../user.context';

const Todo = ({ todos, historico }) => {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    const [user, setUser] = useGlobalUser()

    const concluiTarefa = (todo) => {
        api.post("concluiTarefa", {
            id: todo.PkCodTarefa,
        }).then((response) => {
            console.log(response.data);
            setUser(!user);
        });
    };

    const deletaTarefa = (todo) => {
        api.post("deleta", {
            id: todo.PkCodTarefa,
        }).then((response) => {
            console.log(response.data);
            setUser(!user);
        });
    };

    if (edit.id) {
        return <TodoForm edit={edit} />;
    }

    return todos.map((todo, index) => (
        <>
            {historico ?
                (
                    <div className='todo-row-historico' key={index}>
                        <div key={todo.id}>
                            {todo.NomeTarefa}
                        </div>
                        <div className='icons'>
                            <RiCloseCircleLine
                                onClick={() => deletaTarefa(todo)}
                                className='concluido-icon'
                            />
                        </div>
                    </div>
                ) : (
                    <div className='todo-row' key={index}>
                        <div key={todo.id}>
                            {todo.NomeTarefa}
                        </div>
                        <div className='icons'>
                            <RiCheckboxCircleFill
                                onClick={() => concluiTarefa(todo)}
                                className='concluido-icon'
                            />
                            <TiEdit
                                onClick={() => setEdit({ id: todo.PkCodTarefa, value: todo.nomeTarefa })}
                                className='edit-icon'
                            />
                        </div>
                    </div>
                )
            }
        </>
    ));
};

export default Todo;