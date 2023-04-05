import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getTotal } from '../util';

function CartButton(props) {
  const { totalPrice } = props;

  return (
    <Link to="/customer/checkout">
      <button
        type="button"
        disabled={ getTotal() === '0,00' }
        data-testid="customer_products__button-cart"
      >
        Ver carrinho: R$
        <div data-testid="customer_products__checkout-bottom-value">
          { totalPrice }
        </div>
      </button>
    </Link>
  );
}

CartButton.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default CartButton;
