import React from 'react';
import { Link } from 'react-router-dom';

export default class UserNavBar extends React.Component {
  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    const nomeCompleto = user.name;
    return (
      <nav>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          to="/customer/orders"
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
          onClick={ () => localStorage.removeItem('user') }
        >
          Sair
        </button>
      </nav>
    );
  }
}
