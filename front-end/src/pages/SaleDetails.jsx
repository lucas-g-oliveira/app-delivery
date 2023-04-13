import './styles/bodyAplication.css';
import React from 'react';
import UserNavBar from '../components/UserNavBar';
import SaleDetailsList from '../components/SaleDetailsList';

function SaleDetails() {
  return (
    <div className="body-aplication">
      <UserNavBar />
      <SaleDetailsList />
    </div>
  );
}

export default SaleDetails;
