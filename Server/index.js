const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'TODOLIST'
});

app.post('/tarefa', (req, res) => {
    console.log(req.body);
    const descricao = req.body.descricao;
    const importancia = req.body.importancia;
    const user = req.body.user;

    db.query('INSERT INTO tbtarefas (NomeTarefa, importancia,FkIdUser,Concluido) VALUES (?,?,?,?)', [descricao, importancia, user, '0'], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Tarefa Adicionada');
        }
    });
})

app.post('/getTarefas', (req, res) => {
    console.log(req.body.idUser);
    const User = req.body.idUser

    const sqlBusca = 'SELECT * FROM tbtarefas WHERE fkIdUser = ?';

    db.query(sqlBusca, [User], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/alteraTarefa', (req, res) => {
    console.log(req.body);
    const idTarefa = req.body.id;
    const tarefa = req.body.NomeTarefa;
    const importancia = req.body.importancia;

    const sqlUpdate = 'UPDATE tbTarefas SET NomeTarefa = ?, importancia = ? WHERE PkCodTarefa = ?';

    db.query(sqlUpdate, [tarefa, importancia, idTarefa], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Tarefa Alterada');
        };
    });
});

app.post('/concluiTarefa', (req, res) => {
    console.log(req.body);
    const idTarefa = req.body.id;

    const sqlUpdate = 'UPDATE tbTarefas SET CONCLUIDO = ? WHERE PkCodTarefa = ?';

    db.query(sqlUpdate, ['1', idTarefa], (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Tarefa Concluida');
        };
    });
});

app.post('/deleta', (req, res) => {
    console.log(req.body);
    const idTarefa = req.body.id;

    const sqlUpdate = 'DELETE FROM tbTarefas WHERE PkCodTarefa = ?';

    db.query(sqlUpdate, [idTarefa], (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Tarefa Apagada');
        };
    });
});

app.post('/Login', (req, res) => {
    console.log(req.body);

    const login = req.body.email;
    const pass = req.body.senha;

    const sqlSelect = 'SELECT * FROM tbusuarios WHERE email = ? AND SENHA = ?';

    db.query(sqlSelect, [login, pass],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result) {
                res.send(result);
            } else {
                res.send({ message: "Senha ou usuario invalido" });
            }
        })
})



app.post('/registro', (req, res) => {
    console.log(req.body);

    const nome = req.body.nome;
    const email = req.body.email;
    const dataNasc = req.body.dataNasc;
    const pass = req.body.pass;

    const sqlInsert = 'INSERT INTO tbusuarios (nome, email, datanasc, senha) values (?,?,?,?) ';

    db.query(sqlInsert, [nome, email, dataNasc, pass],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send('Conta Cadastrada');
            }
        }
    );
});

app.post('/historico', (req, res) => {
    console.log(req.body);
    const User = req.body.idUser;
    const dataTarefa = req.body.Date;

    const sqlBusca = 'SELECT * FROM tbtarefas WHERE fkIdUser = ? and DATE_FORMAT(DataTarefa, "%Y-%m-%d") = ?';

    db.query(sqlBusca, [User, dataTarefa], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log('run server in port 3001')
});

