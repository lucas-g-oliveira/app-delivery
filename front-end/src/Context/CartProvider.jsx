import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import CartContext from './CartContext';

function CartProvider({ children }) {
  const [totalPrice, setTotalPrice] = useState(0);

  const appDeliveryApp = useMemo(() => ({
    totalPrice,
    setTotalPrice,
  }), [totalPrice]);

  return (
    <CartContext.Provider value={ appDeliveryApp }>
      { children }
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
