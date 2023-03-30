import React from 'react';
import { Redirect } from 'react-router-dom';
import { requestRegister } from '../services/requests';

export default class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    buttonEnabled: false,
    doneRegister: false,
    errorRegister: false,
  };

  async componentDidUpdate() {
    this.validaDados();
  }

  validaNome = () => {
    const { username } = this.state;
    const MIN_LENGTH = 12;
    return username.length >= MIN_LENGTH;
  };

  validaEmail = () => {
    const { email } = this.state;
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  validaPassword = () => {
    const { password } = this.state;
    const MIN_LENGTH = 6;
    return password.length >= MIN_LENGTH;
  };

  validaDados = () => {
    const { buttonEnabled } = this.state;
    if (this.validaNome() && this.validaEmail() && this.validaPassword()) {
      if (!buttonEnabled) {
        this.setState({ buttonEnabled: true });
      }
    } else if (buttonEnabled) {
      this.setState({ buttonEnabled: false });
    }
  };

  handleEvent = (event) => {
    const eventName = event.target.name;
    this.setState({ [eventName]: event.target.value });
  };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   const { username, email, password } = this.state;
  //   axios
  //     .post('localhost:3004/register', {
  //       username,
  //       email,
  //       password,
  //     })
  //     .then((response) => {
  //       const OK_STATUS = 201;
  //       if (response.status === OK_STATUS) {
  //         this.setState({ message: 'User created succesfully ' });
  //       } else {
  //         this.setState({ message: 'Some error occured' });
  //       }
  //       this.setState({ username: '' });
  //       this.setState({ email: '' });
  //       this.setState({ password: '' });
  //     })
  //     .catch((error) => console.log(error));
  // };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;

    try {
      await requestRegister('/register', { username, email, password });
      this.setState({ doneRegister: true });
    } catch (error) {
      this.setState({ doneRegister: false });
      this.setState({ errorRegister: true });
    }
  };

  render() {
    const {
      username,
      email,
      password,
      buttonEnabled,
      doneRegister,
      errorRegister,
    } = this.state;

    if (doneRegister) return <Redirect to="/customer/products" />;

    return (
      <div>
        <div>
          <div>
            Cadastro
          </div>
          <form>
            <label htmlFor="input-name">
              Nome
              <input
                id="input-name"
                name="username"
                value={ username }
                data-testid="common_register__input-name"
                type="text"
                placeholder="Seu Nome"
                onChange={ this.handleEvent }
              />
            </label>
            <label htmlFor="input-email">
              Email
              <input
                id="input-email"
                name="email"
                value={ email }
                data-testid="common_register__input-email"
                type="email"
                placeholder="seu-email@site.com.br"
                onChange={ this.handleEvent }
              />
            </label>
            <label htmlFor="input-password">
              Senha
              <input
                id="input-password"
                name="password"
                value={ password }
                data-testid="common_register__input-password"
                type="password"
                placeholder="Sua Senha"
                onChange={ this.handleEvent }
              />
            </label>
            <button
              data-testid="common_register__button-register"
              type="button"
              disabled={ !buttonEnabled }
              onClick={ this.handleSubmit }
            >
              Cadastrar
            </button>
          </form>
          {
            (errorRegister)
              ? (
                <div data-testid="common_register__element-invalid_register">
                  Usuário já cadastrado.
                </div>
              )
              : null
          }
        </div>
      </div>
    );
  }
}
