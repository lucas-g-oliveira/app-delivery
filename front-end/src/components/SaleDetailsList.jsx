import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTotal } from '../util';
import { requestData } from '../services/requests';

function SaleDetailsList() {
  const { id } = useParams();
  const [sale, setSale] = useState([]);

  const className = (idProduct, key) => {
    const keys = {
      id: 'customer_checkout__element-order-table-item-number-<index>',
      name: 'customer_checkout__element-order-table-name-<index>',
      quantity: 'customer_checkout__element-order-table-quantity-<index>',
      price: 'customer_checkout__element-order-table-unit-price-<index>',
      subtotal: 'customer_checkout__element-order-table-sub-total-<index>',
      total: 'customer_checkout__element-order-total-price',
    };
    const result = keys[key].replace('<index>', idProduct);
    return result;
  };

  useEffect(() => {
    const { data } = requestData(`/costumer/orders/${id}`);
    setSale(data);
  }, []);

  function renderItem(item, i) {
    const subtotal = Number(item.price) * Number(item.quantity);
    return (
      <tr key={ item.id }>
        <td data-testid={ className(i, 'id') }>{ i + 1 }</td>
        <td data-testid={ className(i, 'name') }>{item.name}</td>
        <td data-testid={ className(i, 'quantity') }>{item.quantity}</td>
        <td data-testid={ className(i, 'price') }>{item.price.replace(/\./, ',')}</td>
        <td data-testid={ className(i, 'subtotal') }>{subtotal.replace(/\./, ',')}</td>
      </tr>
    );
  }

  return (
    <div>
      <h2>Detalher do pedido</h2>
      <div>
        <h3
          data-testid={
            `customer_order_details__element-order-details-label-order-${id}`
          }
        >
          {`PEDIDO ${id}`}
        </h3>
        <h3
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {`P. Vend: ${sale.name}`}
        </h3>
        <h3
          data-testid={
            `customer_order_details__element-order-details-label-delivery-status${id}`
          }
        >
          {sale.orders.status}
        </h3>
        <h3
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {sale.orders.saleDate}
        </h3>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
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
      <h3 data-testid={ className(0, 'total') }>{getTotal()}</h3>
    </div>
  );
}

export default SaleDetailsList;
