import React from 'react';
import { Link } from 'react-router-dom';

function CartButton(props) {
  const { totalPrice } = props;
  return (
    <Link data-testid="customer_products__button-cart" to="/customer/checkout">
      <button type="button" data-testid="customer_products__button-cart">
        <div data-testid="customer_products__checkout-bottom-value">
          { `Ver Carrinho: R$${totalPrice}` }
        </div>
      </button>
    </Link>
  );
}

export default CartButton;
