import React from 'react';
import PropTypes from 'prop-types';

function SaleCard({ id, status, date, price, address, addressNumber }) {
  return (
    <div>
      <div>
        <div>
          Pedido
        </div>
        <div data-testid={ `seller_orders__element-order-id-${id}` }>
          {saleId}
        </div>
      </div>
      <div>
        <div>
          <div data-testid={ `seller_orders__element-delivery-status-${id}` }>
            {status}
          </div>
          <div>
            <div data-testid={ `seller_orders__element-order-date-${id}` }>
              {date}
            </div>
            <div data-testid={ `seller_orders__element-card-price-${id}` }>
              {`R$ ${price}`}
            </div>
          </div>
        </div>
        <div data-testid={ `seller_orders__element-card-address-${id}` }>
          {`${address}, ${addressNumber}`}
        </div>
      </div>
    </div>
  );
}

SaleCard.propTypes = {
  status: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  addressNumber: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default SaleCard;
