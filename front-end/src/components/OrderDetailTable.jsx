import React, { useState, useEffect } from 'react';
import { TableCell, TableHead, Table, TableRow, TableBody } from '@mui/material';
import { requestData } from '../services/requests';

export default async function OrderDetailTable({ saleId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const dataTestPrefix = 'seller_order_details__element-order-table-';

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await requestData(`seller/orders/${saleId}`);
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, [saleId]);

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
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          (products.map((product, index) => (
            <TableRow key={ index + 1 }>
              <TableCell data-testid={ `${dataTestPrefix}item-number-${index + 1}` }>
                {index + 1}
              </TableCell>
              <TableCell data-testid={ `${dataTestPrefix}name-${index + 1}` }>
                {product.productDetails.name}
              </TableCell>
              <TableCell data-testid={ `${dataTestPrefix}quantity-${index + 1}` }>
                {product.quantity}
              </TableCell>
              <TableCell data-testid={ `${dataTestPrefix}unit-price-${index + 1}` }>
                {`R$${product.productDetails.price}`}
              </TableCell>
              <TableCell data-testid={ `${dataTestPrefix}sub-total-${index + 1}` }>
                {`R$${product.productDetails.price * product.quantity}`}
              </TableCell>
            </TableRow>
          )))
        )}
      </TableBody>
    </Table>
  );
}
