import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ProductCard({ price, img, drinkName, id }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div>
      <h4 data-testid={ `customer_products__element-card-price-${id}` }>
        {
          price.toLocaleString(
            'pt-BR',
            { minimumFractionDigits: 2, maximumFractionDigits: 2 },
          )
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
          data-testid={ `customer_products__button-card-rm-item-${id}` }
        >
          -
        </button>
        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ quantity }
          readOnly
        />
        <button
          type="button"
          onClick={ handleIncrease }
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
