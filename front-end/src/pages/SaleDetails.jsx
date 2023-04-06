import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { requestData } from '../services/requests';

function SaleDetails() {
  const [sale, setSale] = useState();

  useEffect(() => {
    const getSale = async () => {
      try {
        const { data } = await requestData('/costumer/order');
        setSale(data);
        console.log(sale);
      } catch (error) {
        console.error(error);
      }
    };

    getSale();
  }, []);

  return (
    <div>
      SaleDetails
    </div>
  );
}

export default SaleDetails;
