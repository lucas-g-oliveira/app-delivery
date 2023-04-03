import React from 'react';
import { Redirect } from 'react-router-dom';
import { requestRegister, setToken } from '../services/requests';

export default class Register extends React.Component {
  state = {
    name: '',
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
    const { name } = this.state;
    const MIN_LENGTH = 12;
    return name.length >= MIN_LENGTH;
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

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;

    try {
      const { token } = await requestRegister('/register', { name, email, password });
      console.log(token);

      setToken(token);
      const objStorage = {
        name,
        email,
        token,
        role: 'customer',
      };
      localStorage.setItem('user', JSON.stringify(objStorage));
      this.setState({ doneRegister: true });
    } catch (error) {
      this.setState({ doneRegister: false });
      this.setState({ errorRegister: true });
    }
  };

  render() {
    const {
      name,
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
                name="name"
                value={ name }
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
