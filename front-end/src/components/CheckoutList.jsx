import React, { useState, useEffect } from 'react';
import { getAll, getTotal, removeItem } from '../util';

function CheckoutList() {
  const [product, setProduct] = useState([]);

  const className = (id, key) => {
    const keys = {
      id: 'customer_checkout__element-order-table-item-number-<index>',
      name: 'customer_checkout__element-order-table-name-<index>',
      quantity: 'customer_checkout__element-order-table-quantity-<index>',
      price: 'customer_checkout__element-order-table-unit-price-<index>',
      subtotal: 'customer_checkout__element-order-table-sub-total-<index>',
      total: 'customer_checkout__element-order-total-price',
      btnRemove: 'customer_checkout__element-order-table-remove-<index>',
    };
    const result = keys[key].replace('<index>', id);
    return result;
  };

  useEffect(() => {
    const storageProducts = getAll();
    setProduct(storageProducts.filter((e) => e.quantity));
  }, []);

  function deleteItem(id) {
    removeItem(id);
    const storageProducts = getAll();
    setProduct(storageProducts.filter((e) => e.quantity));
  }

  function renderItem(item, i) {
    const { id } = item;
    return (
      <tr key={ item.id }>
        <td className={ className((i + 1), 'id') }>{ i + 1 }</td>
        <td className={ className(id, 'name') }>{item.name}</td>
        <td className={ className(id, 'quantity') }>{item.quantity}</td>
        <td className={ className(id, 'price') }>{item.price}</td>
        <td className={ className(id, 'subtotal') }>{item.subtotal}</td>
        <td>
          <button
            className={ className(item.id, 'btnRemove') }
            type="button"
            onClick={ () => deleteItem(item.id) }
          >
            Remover
          </button>
        </td>
      </tr>
    );
  }

  return (
    <div>
      <h2>Finalizar Pedido</h2>
      <table>
        <tbody>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
          {product.map((e, i) => renderItem(e, i))}
        </tbody>
      </table>
      <h3>{getTotal()}</h3>
    </div>
  );
}

export default CheckoutList;
