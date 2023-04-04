import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { handleQuantityCart, getTotal } from '../util';
import CartContext from '../Context/CartContext';

function ProductCard({ price, img, drinkName, id }) {
  const [quantity, setQuantity] = useState(0);
  const { setTotalPrice } = useContext(CartContext);

  const handleIncrease = (event) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      handleQuantityCart(event.target.name, newQuantity);
      return newQuantity;
    });
    setTotalPrice(getTotal());
  };

  const handleDecrease = (event) => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        handleQuantityCart(event.target.name, newQuantity);
        return newQuantity;
      });
      setTotalPrice(getTotal());
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10) || 0;
    handleQuantityCart(event.target.name, newQuantity);
    setQuantity(newQuantity);
    setTotalPrice(getTotal());
  };

  const handleQuantityBlur = () => {
    if (quantity < 0) {
      setQuantity(0);
    }
  };

  return (
    <div>
      <h4 data-testid={ `customer_products__element-card-price-${id}` }>
        {
          price.replace(/\./, ',')
        }
      </h4>
      <img
        src={ img }
        alt={ drinkName }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        className="drink-image"
      />
      <h3 data-testid={ `customer_products__element-card-title-${id}` }>{drinkName}</h3>
      <div className="quantity-controls">
        <button
          type="button"
          onClick={ handleDecrease }
          name={ id }
          data-testid={ `customer_products__button-card-rm-item-${id}` }
        >
          -
        </button>
        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          name={ id }
          value={ quantity }
          onChange={ handleQuantityChange }
          onBlur={ handleQuantityBlur }
          min="0"
        />
        <button
          type="button"
          onClick={ handleIncrease }
          name={ id }
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          +
        </button>
      </div>

    </div>
  );
}

ProductCard.propTypes = {
  drinkName: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default ProductCard;
