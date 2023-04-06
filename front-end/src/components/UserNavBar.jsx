import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class UserNavBar extends React.Component {
  state = {
    redirect: false,
  };

  handleLogout = () => {
    this.setState({ redirect: true });
    localStorage.removeItem('user');
  };

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    const nomeCompleto = user.name;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/login" />;
    }

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
          onClick={ this.handleLogout }
        >
          Sair
        </button>
      </nav>
    );
  }
}

export default (UserNavBar);
