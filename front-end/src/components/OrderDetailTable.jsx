import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, Table, TableRow, TableBody } from '@mui/material';

function OrderDetailTable({ saleProducts }) {
  const dataTestPrefix = 'seller_order_details__element-order-table-';

  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Item</TableCell>
          <TableCell align="right">Descrição</TableCell>
          <TableCell align="right">Quantidade</TableCell>
          <TableCell align="right">Valor Unitário</TableCell>
          <TableCell align="right">Sub-total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          (saleProducts.map((product, index) => (
            <TableRow key={ index + 1 }>
              <TableCell data-testid={ `${dataTestPrefix}item-number-${index + 1}` }>
                {index + 1}
              </TableCell>
              <TableCell
                align="right"
                data-testid={ `${dataTestPrefix}name-${index + 1}` }
              >
                {product.productDetails.name}
              </TableCell>
              <TableCell
                align="right"
                data-testid={ `${dataTestPrefix}quantity-${index + 1}` }
              >
                {product.quantity}
              </TableCell>
              <TableCell
                align="right"
                data-testid={ `${dataTestPrefix}unit-price-${index + 1}` }
              >
                {`R$${product.productDetails.price}`}
              </TableCell>
              <TableCell
                align="right"
                data-testid={ `${dataTestPrefix}sub-total-${index + 1}` }
              >
                {`R$${JSON.parse(product.productDetails.price) * product.quantity}`}
              </TableCell>
            </TableRow>
          )))
        }
      </TableBody>
    </Table>
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
