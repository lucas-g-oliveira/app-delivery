import React from 'react';
import { Link } from 'react-router-dom';

const LoginBtn = () => (
  <Link data-testid="common_login__button-login" to="/login">
    Login
  </Link>
);

export default LoginBtn;
