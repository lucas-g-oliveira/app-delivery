import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OrderDetailTable from './OrderDetailTable';
import { setToken, requestPatchStatus, requestData } from '../services/requests';

function OrderDetailCard({ saleInfos }) {
  const { id, saleDate, totalPrice, saleProducts } = saleInfos;
  let { status } = saleInfos;
  console.log(typeof id);
  console.log(id);

  const [atualStatus, setAtualStatus] = useState(status);
  const [changeStatus, setChangeStatus] = useState(false);

  const dataTestPrefix = 'seller_order_details__element-order-';
  // const saleStatus = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];

  function formatDate(data) {
    const date = new Date(data);
    const dia = date.getUTCDate();
    const mes = date.getUTCMonth() + 1;
    const ano = date.getUTCFullYear();
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString()
      .padStart(2, '0')}/${ano}`;

    return dataFormatada;
  }

  async function handleStatus(event) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);

    const button = event.target.name;
    if (button === 'botao-preparar') {
      await requestPatchStatus(`/seller/orders/${id}`, 'Preparando');
    }
    if (button === 'botao-entregar') {
      await requestPatchStatus(`/seller/orders/${id}`, 'Em Trânsito');
    }
    setChangeStatus(!changeStatus);
  }

  useEffect(() => {
    const getSaleStatus = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      setToken(token);

      const { data } = await requestData('/seller/orders');
      // console.log(data);
      // console.log(typeof data[0].id);
      const findSaleId = data.filter((venda) => venda.id === id);
      console.log(findSaleId[0]);
      status = findSaleId[0].status;
      setAtualStatus(findSaleId[0].status);
    };
    getSaleStatus();
  }, [id, changeStatus]);

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
            {atualStatus}
          </div>
          <button
            type="button"
            name="botao-preparar"
            data-testid="seller_order_details__button-preparing-check"
            disabled={ atualStatus !== 'Pendente' }
            onClick={ handleStatus }
          >
            Preparar Pedido
          </button>
          <button
            type="button"
            name="botao-entregar"
            data-testid="seller_order_details__button-dispatch-check"
            disabled={ atualStatus !== 'Preparando' }
            onClick={ handleStatus }
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
