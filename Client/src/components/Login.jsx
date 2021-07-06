import React, { useState } from "react";
import api from '../services/api';
import { Tabs, Tab, Modal } from "react-bootstrap";
import { useHistory } from "react-router";

const Login = ({ open, handleClose }) => {
  const [emailLogin, setEmailLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState([]);
  const history = useHistory();

  async function handleSubmitLogin(e) {
    e.preventDefault();
    const response = await api.post("Login", {
      email: emailLogin,
      senha: senha,
    });
    //console.log(response);
    if (response.data.length === 0) {
      setErros(['Usuário ou senha incorreta!']);
      return;
    }
    window.localStorage.setItem("usuarioLogado", JSON.stringify(response.data[0]));
    history.push("/home");
    console.log("Usuário logado!");
    handleClose();
  }

  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [senhaRegister, setSenhaRegister] = useState('');

  async function handleSubmitRegister(e) {
    e.preventDefault();
    await api.post("registro", {
      nome: nome,
      email: emailRegister,
      dataNasc: dataNascimento,
      pass: senhaRegister,
    })
    history.push("/");
    handleClose();
  }

  return (
    <Modal show={open} bsSize="lg" onHide={handleClose}>
      <Modal.Body id="modalLogin">
        <Tabs animation={true} id="controlled-tab" style={{ marginBottom: 10 }}>
          <Tab eventKey="singUp" title="Entrar">
            <br />
            {erros.map((erro) => {
              return (
                <div key={erro} className="row col-xs-12" style={{ paddingLeft: '120px' }}>
                  <div className="alert alert-danger col-xs-12 col-md-8 col-md-offset-3 centered">
                    {erro}
                  </div>
                </div>
              );
            })}
            <form onSubmit={handleSubmitLogin}>
              <h3>Login</h3>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email@email.com"
                  onChange={(e) => setEmailLogin(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-dark btn-lg btn-block">
                Entrar
              </button>
            </form>
          </Tab>
          <Tab eventKey="register" title="Cadastre-se">
            <form onSubmit={handleSubmitRegister}>
              <h3>Registrar</h3>
              <div className="form-group">
                <label>Nome Completo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome"
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Data de Nascimento</label>
                <input
                  type="date"
                  className="form-control"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setEmailRegister(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="*******"
                  onChange={(e) => setSenhaRegister(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-dark btn-lg btn-block">
                Cadastrar
              </button>
            </form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
