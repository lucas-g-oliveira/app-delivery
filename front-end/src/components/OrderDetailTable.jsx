import React from 'react';
import PropTypes from 'prop-types';
// import { TableCell, TableHead, Table, TableRow, TableBody } from '@mui/material';

function OrderDetailTable({ saleProducts }) {
  const dataTestPrefix = 'seller_order_details__element-order-table-';

  return (
    <table>
      <tr>
        <th>Item</th>
        <th align="right">Descrição</th>
        <th align="right">Quantidade</th>
        <th align="right">Valor Unitário</th>
        <th align="right">Sub-total</th>
      </tr>
      <tbody>
        {
          (saleProducts.map((product, index) => (
            <tr key={ index + 1 }>
              <td data-testid={ `${dataTestPrefix}item-number-${index + 1}` }>
                {index + 1}
              </td>
              <td
                align="right"
                data-testid={ `${dataTestPrefix}name-${index + 1}` }
              >
                {product.productDetails.name}
              </td>
              <td
                align="right"
                data-testid={ `${dataTestPrefix}quantity-${index + 1}` }
              >
                {product.quantity}
              </td>
              <td
                align="right"
                data-testid={ `R$ ${dataTestPrefix}unit-price-${index + 1}` }
              >
                {`R$${product.productDetails.price.replace(/\./, ',')}`}
              </td>
              <td
                align="right"
                data-testid={ `R$ ${dataTestPrefix}sub-total-${index + 1}` }
              >
                {`R$${(JSON.parse(product.productDetails.price) * product.quantity).toFixed(2).replace(/\./, ',')}`}
              </td>
            </tr>
          )))
        }
      </tbody>
    </table>
  );
}

OrderDetailTable.propTypes = {
  saleProducts: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    productDetails: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default OrderDetailTable;
