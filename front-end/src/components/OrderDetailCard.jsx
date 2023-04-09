import React from 'react';
import PropTypes from 'prop-types';
import OrderDetailTable from './OrderDetailTable';
import { setToken, requestPut } from '../services/requests';

function OrderDetailCard({ saleInfos }) {
  const { id, saleDate, status, totalPrice, saleProducts } = saleInfos;

  // const [statusStatus, setStatusStatus] = useState(status);

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

  async function handleStatus() {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);

    const data = await requestPut(`/seller/orders/${id}`);
    console.log(data);
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
            disabled={ status !== 'Pendente' }
            onClick={ handleStatus }
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
