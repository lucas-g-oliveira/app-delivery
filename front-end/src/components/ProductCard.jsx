import './styles/productCard.css';
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { handleQuantityCart, getTotal, getQtdById } from '../util';
import CartContext from '../Context/CartContext';

function ProductCard({ price, img, drinkName, id, qtdParam }) {
  const [quantity, setQuantity] = useState(qtdParam);
  const { setTotalPrice } = useContext(CartContext);

  const handleIncrease = (event) => {
    const qtd = getQtdById(event.target.name);
    const newQuantity = handleQuantityCart(event.target.name, qtd + 1);
    setQuantity(newQuantity);
    setTotalPrice(getTotal());
    return newQuantity;
  };

  const handleDecrease = (event) => {
    if (quantity > 0) {
      const qtd = getQtdById(event.target.name);
      const newQuantity = handleQuantityCart(event.target.name, qtd - 1);
      setQuantity(newQuantity);
      setTotalPrice(getTotal());
      return newQuantity;
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
    <div className="card">
      <h4 data-testid={ `customer_products__element-card-price-${id}` }>
        {
          `R$ ${price.replace(/\./, ',')}`
        }
      </h4>
      <img
        src={ img }
        width="150px"
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
  qtdParam: PropTypes.number.isRequired,
  drinkName: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ProductCard;
