import './styles/cartButton.css';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getTotal } from '../util';

function CartButton(props) {
  const { totalPrice } = props;
  const price = totalPrice === '0' ? '0,00' : totalPrice;
  return (
    <Link to="/customer/checkout" className="floating-button">
      <button
        type="button"
        disabled={ getTotal() === '0,00' }
        data-testid="customer_products__button-cart"
      >
        <div data-testid="customer_products__checkout-bottom-value">
          { `Ver carrinho: R$ ${price}` }
        </div>
      </button>
    </Link>
  );
}

CartButton.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default CartButton;
