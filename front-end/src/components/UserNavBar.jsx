/* eslint-disable no-alert */
import './styles/userNavbar.css';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { clearCart, getAll, logoutUser, getUser } from '../util';

function UserNavBar() {
  const [redirect, setRedirect] = useState(false);

  const handleLogout = () => {
    const ifHaveCart = [...getAll()].some((e) => e.quantity > 0);
    if (ifHaveCart && !window.confirm('Deseja manter seu carrinho ?')) {
      clearCart();
    }
    setRedirect(true);
    logoutUser();
  };

  const user = getUser();
  const nomeCompleto = user && user.name;

  return redirect ? (<Redirect to="/login" />) : (
    <nav>
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </Link>
      <Link
        to={ `/${user.role}/orders` }
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus Pedidos
      </Link>
      <span
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {nomeCompleto}
      </span>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ handleLogout }
      >
        Sair
      </button>
    </nav>
  );
}

export default (UserNavBar);
