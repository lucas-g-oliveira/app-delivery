import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function SaleCard({ id, status, date, price, address, addressNumber }) {
  const url = useLocation().pathname;
  const role = url.split('/')[1];
  return (
    <a href={ `/${role}/orders/${id}` }>
      <div>
        <div>
          Pedido
        </div>
        <div data-testid={ `${role}_orders__element-order-id-${id}` }>
          {id}
        </div>
      </div>
      <div>
        <div>
          <div data-testid={ `${role}_orders__element-delivery-status-${id}` }>
            {status}
          </div>
          <div>
            <div data-testid={ `${role}_orders__element-order-date-${id}` }>
              {date}
            </div>
            <div data-testid={ `${role}_orders__element-card-price-${id}` }>
              {`R$ ${price}`}
            </div>
          </div>
        </div>
        <div data-testid={ `${role}_orders__element-card-address-${id}` }>
          {`${address}, ${addressNumber}`}
        </div>
      </div>
    </a>
  );
}

SaleCard.propTypes = {
  status: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  addressNumber: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default SaleCard;
