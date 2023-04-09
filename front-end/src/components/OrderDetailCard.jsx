import React, { useState } from 'react';
import PropTypes from 'prop-types';
import OrderDetailTable from './OrderDetailTable';

function OrderDetailCard({ saleInfos }) {
  const { id, saleDate, status, totalPrice, saleProducts } = saleInfos;

  const [isPreparing, setIsPreparing] = useState(false);

  const dataTestPrefix = 'seller_order_details__element-order-';

  function formatDate(data) {
    const date = new Date(data);
    const dia = date.getUTCDate();
    const mes = date.getUTCMonth() + 1;
    const ano = date.getUTCFullYear();
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString()
      .padStart(2, '0')}/${ano}`;

    return dataFormatada;
  }

  function handlePreparing() {
    if (!isPreparing) {
      setIsPreparing(true);
    }
  }

  return (
    <div>
      Detalhe do Pedido
      <div>
        <div
          style={
            { display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              marginTop: '10px' }
          }
        >
          <div data-testid={ `${dataTestPrefix}details-label-order-id` }>
            {`Pedido ${id}`}
          </div>
          <div data-testid={ `${dataTestPrefix}details-label-order-date` }>
            {formatDate(saleDate)}
          </div>
          <div data-testid={ `${dataTestPrefix}details-label-delivery-status` }>
            {status}
          </div>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            disabled={ isPreparing }
            onClick={ handlePreparing }
          >
            Preparar Pedido
          </button>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            disabled={ !isPreparing }
          >
            Saiu para Entrega
          </button>
        </div>
        <OrderDetailTable saleProducts={ saleProducts } />
        <div data-testid={ `${dataTestPrefix}total-price` }>
          {`Total: R$${totalPrice.replace(/\./, ',')}`}
        </div>
      </div>
    </div>
  );
}

OrderDetailCard.propTypes = {
  saleInfos: PropTypes.shape({
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    saleDate: PropTypes.string.isRequired,
    saleProducts: PropTypes.arrayOf(PropTypes.shape({
      productId: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      productDetails: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
    sellerId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderDetailCard;
