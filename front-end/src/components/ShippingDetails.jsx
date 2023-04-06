import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { clearCart, getAll, getTotal } from '../util';
import { requestData, requestRegister, setToken } from '../services/requests';

function ShippingDetails() {
  const [seller, setSeller] = useState([]);
  const [address, setAddress] = useState('');
  const [numberHouse, setnumberHouse] = useState('');
  const [sellerSelected, setSellerSelected] = useState('');
  const [redirect, setRedirect] = useState(0);

  const className = {
    seller: 'customer_checkout__select-seller',
    address: 'customer_checkout__input-address',
    addressNumber: 'customer_checkout__input-address-number',
    finishCheckout: 'customer_checkout__button-submit-order',
  };

  const handleInputAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleInputHouseNumber = (event) => {
    setnumberHouse(event.target.value);
  };

  const handleSelectSeller = (event) => {
    setSellerSelected(event.target.value);
  };

  const sendOrder = async () => {
    const itens = getAll().filter((e) => e.quantity);
    const body = {
      sellerId: seller.filter((e) => e.name === sellerSelected)[0].id,
      totalPrice: getTotal().replace(',', '.'),
      deliveryAddress: address,
      deliveryNumber: numberHouse,
      products: itens.map((e) => ({ productId: e.id, quantity: e.quantity })),
    };

    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
    const { saleId } = await requestRegister('/customer/orders', body);
    setRedirect(saleId);
    clearCart();
  };

  useEffect(() => {
    const reqSellers = async () => {
      const data = await requestData('/seller');
      setSeller(data);
      setSellerSelected(data[0].name);
    };
    reqSellers();
  }, []);

  return (redirect === 0) ? (
    <div>
      <h2>Detalhes e Endereço para Entrega:</h2>
      <form action="submmit">
        <label htmlFor="selectSeller">
          Vendedor(a) Responsável
          <select
            className={ className.seller }
            id="selectSeller"
            value={ sellerSelected }
            onChange={ handleSelectSeller }
          >
            {seller.map((e) => (<option key={ e.id }>{e.name}</option>))}
          </select>
        </label>
        <br />
        <label htmlFor="inputAddress">
          Endereço:
          <input
            className={ className.address }
            type="text"
            id="inputAddress"
            value={ address }
            onChange={ handleInputAddress }
          />
        </label>
        <br />
        <label htmlFor="inputHouseNumber">
          Número:
          <input
            className={ className.addressNumber }
            type="number"
            id="inputHouseNumber"
            value={ numberHouse }
            onChange={ handleInputHouseNumber }
          />
        </label>
        <br />
        {`${sellerSelected},  ${address},  ${numberHouse}`}
        <br />
        <br />
        <button
          className={ className.finishCheckout }
          disabled={ [sellerSelected, address, numberHouse].includes('') }
          type="button"
          onClick={ () => sendOrder() }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  ) : (<Redirect to={ `orders/${redirect}` } />);
}

export default ShippingDetails;
