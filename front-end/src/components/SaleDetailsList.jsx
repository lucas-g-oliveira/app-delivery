// import './styles/orderDetailSeller.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestData, setToken, requestPatchStatus } from '../services/requests';

function SaleDetailsList() {
  const { id } = useParams();
  const [sale, setSale] = useState({});
  const [changeStatus, setChangeStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sellerDtId = 'customer_order_details__element-order-details-label-seller-name';
  const stt = `customer_order_details__element-order-details-label-delivery-status${id}`;
  const dateDtId = 'customer_order_details__element-order-details-label-order-date';
  // const label = 'customer_order_details__element-order-details-label-order-id';

  const className = (idProduct, key) => {
    const keys = {
      id: 'customer_order_details__element-order-table-item-number-<index>',
      name: 'customer_order_details__element-order-table-name-<index>',
      quantity: 'customer_order_details__element-order-table-quantity-<index>',
      price: 'customer_order_details__element-order-table-unit-price-<index>',
      subtotal: 'customer_order_details__element-order-table-sub-total-<index>',
      total: 'customer_order_details__element-order-total-price',
    };
    const result = keys[key].replace('<index>', idProduct);
    return result;
  };

  useEffect(() => {
    const getSale = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      setToken(token);
      const { data } = await requestData(`/customer/orders/${id}`);
      console.log(data);
      setSale(data);
      setIsLoading(false);
    };
    getSale();
  }, [id, changeStatus]);

  function renderItem(item, i) {
    const subtotal = Number(item.productDetails.price) * Number(item.quantity);
    return (
      <tr key={ item.id }>
        <td data-testid={ className(i, 'id') }>{ i + 1 }</td>
        <td data-testid={ className(i, 'name') }>{item.productDetails.name}</td>
        <td data-testid={ className(i, 'quantity') }>{item.quantity}</td>
        <td data-testid={ className(i, 'price') }>{`R$ ${item.productDetails.price.replace(/\./, ',')}`}</td>
        <td data-testid={ className(i, 'subtotal') }>{`R$ ${subtotal.toFixed(2).toString().replace(/\./, ',')}`}</td>
      </tr>
    );
  }

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

    await requestPatchStatus(`/seller/orders/${id}`, 'Entregue');
    setChangeStatus(!changeStatus);
  }

  return isLoading ? (<div>Carregando...</div>) : (
    <div className="order-detail-seller-card">
      <h2>{`Detalhes do pedido ${id}`}</h2>
      <div className="order-detail-head-info">
        <h3 data-testid={ sellerDtId }>
          {sale.name}
        </h3>
        <h3 data-testid={ stt }>
          {sale.orders.status}
        </h3>
        <h3 data-testid={ dateDtId }>
          {formatDate(sale.orders.saleDate)}
        </h3>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ sale.orders.status !== 'Em Trânsito' }
          onClick={ handleStatus }
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
      <br />
      <br />
      <table>
        <tbody>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
          {sale.orders.saleProducts.map((e, i) => renderItem(e, i))}
        </tbody>
      </table>
      <h3 data-testid={ className(0, 'total') } className="total-checkout">
        {`Total R$ ${sale.orders.totalPrice.replace(/\./, ',')}`}
      </h3>
    </div>
  );
}

export default SaleDetailsList;
