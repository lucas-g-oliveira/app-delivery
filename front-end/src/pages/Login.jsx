import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { requestLogin, setToken } from '../services/requests';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const MIN_PASSWORD_LENGTH = 6;

  const validadeInputs = () => {
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    if (isEmailValid && password.length >= MIN_PASSWORD_LENGTH) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const { token, role, name } = await requestLogin('/login', { email, password });

      setToken(token);
      localStorage.setItem('user', JSON.stringify({ name, email, role, token }));

      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };

  const handleClick = async () => {
    const { history } = props;
    history.push('/register');
  };

  useEffect(() => {
    setFailedTryLogin(false);
    validadeInputs();
    localStorage.removeItem('user');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  if (isLogged) {
    const user = JSON.parse(localStorage.getItem('user'));
    const { role } = user;
    switch (role) {
    case 'seller':
      return <Redirect to="/seller/orders" />;
    case 'administrator':
      return <Redirect to="/admin/manage" />;
    default:
      return <Redirect to="/customer/products" />;
    }
  }
  // return <Redirect to="/customer/products" />;

  return (
    <section className="user-login-area">
      <h1>Área do usuário</h1>
      <input
        className="login__login_input"
        type="text"
        value={ email }
        onChange={ ({ target: { value } }) => {
          setEmail(value);
          validadeInputs();
        } }
        data-testid="common_login__input-email"
        placeholder="Login"
      />
      <label htmlFor="password-input">
        <input
          type="password"
          value={ password }
          onChange={ ({ target: { value } }) => {
            setPassword(value);
            validadeInputs();
          } }
          data-testid="common_login__input-password"
          placeholder="Senha"
        />
      </label>
      <button
        data-testid="common_login__button-login"
        type="submit"
        disabled={ isBtnDisabled }
        onClick={ (event) => login(event) }
      >
        Entrar
      </button>
      <button
        data-testid="common_login__button-register"
        type="submit"
        onClick={ handleClick }
      >
        Registre-se
      </button>
      {
        (failedTryLogin)
          ? (
            <p data-testid="common_login__element-invalid-email">
              {
                `O endereço de e-mail ou a senha não estão corretos.
                  Por favor, tente novamente.`
              }
            </p>
          )
          : null
      }
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
