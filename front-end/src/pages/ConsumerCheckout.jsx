import './styles/bodyAplication.css';
import React from 'react';
import CheckoutList from '../components/CheckoutList';
import ShippingDetails from '../components/ShippingDetails';
import UserNavBar from '../components/UserNavBar';

function ConsumerCheckout() {
  return (
    <div className="body-aplication">
      <UserNavBar />
      <CheckoutList />
      <ShippingDetails />
    </div>
  );
}

export default ConsumerCheckout;
