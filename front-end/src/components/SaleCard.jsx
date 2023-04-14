import './styles/cardOrder.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function SaleCard({ id, status, date, price, address, addressNumber }) {
  const url = useLocation().pathname;
  const role = url.split('/')[1];

  function formatDate(data) {
    const d = new Date(data);
    const dia = d.getUTCDate();
    const mes = d.getUTCMonth() + 1;
    const ano = d.getUTCFullYear();
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString()
      .padStart(2, '0')}/${ano}`;

    return dataFormatada;
  }

  return (
    <a
      href={ `/${role}/orders/${id}` }
      className={ `card-order ${status.replace(' ', '')}` }
    >
      <div>
        <div data-testid={ `${role}_orders__element-order-id-${id}` }>
          <h4>{`Pedido ${id}`}</h4>
        </div>
      </div>
      <div>
        <div className="card-data">
          <div data-testid={ `${role}_orders__element-delivery-status-${id}` }>
            {status}
          </div>
          <div>
            <div data-testid={ `${role}_orders__element-order-date-${id}` }>
              {formatDate(date)}
            </div>
            <div data-testid={ `${role}_orders__element-card-price-${id}` }>
              {`R$ ${price.replace(/\./, ',')}`}
            </div>
          </div>
        </div>
        <div data-testid={ `${role}_orders__element-card-address-${id}` }>
          {`${address}, ${addressNumber}`}
        </div>
      </div>
    </a>
  );
}

SaleCard.propTypes = {
  status: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  addressNumber: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default SaleCard;
