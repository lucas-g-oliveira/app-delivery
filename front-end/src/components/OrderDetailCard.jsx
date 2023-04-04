import React from 'react';
import PropTypes from 'prop-types';
import OrderDetailTable from './OrderDetailTable';

function OrderDetailCard({ id, status, date, price }) {
  const dataTestPrefix = 'seller_order_details__element-order-';
  return (
    <div>
      Detalhe do Pedido
      <div>
        <div>
          <div data-testid={ `${dataTestPrefix}label-order-id` }>
            {`Pedido ${id}`}
          </div>
          <div data-testid={ `${dataTestPrefix}label-order-date` }>
            {date}
          </div>
          <div data-testid={ `${dataTestPrefix}label-delivery-status` }>
            {status}
          </div>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
          >
            Preparar Pedido
          </button>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
          >
            Saiu para Entrega
          </button>
        </div>
        <OrderDetailTable saleId={ id } />
        <div data-testid={ `${dataTestPrefix}total-price` }>
          {`Total: R$${price}`}
        </div>
      </div>
    </div>
  );
}

OrderDetailCard.propTypes = {
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default OrderDetailCard;
