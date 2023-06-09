import './styles/bodyAplication.css';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserNavBar from '../components/UserNavBar';
import { setToken, requestData } from '../services/requests';
import OrderDetailCard from '../components/OrderDetailCard';

function SellerOrderDetails() {
  const [sale, setSale] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getSale = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      setToken(token);

      const { data } = await requestData('/seller/orders');
      const findSaleId = data.filter((venda) => JSON.stringify(venda.id) === id);
      setSale(findSaleId[0]);

      setIsLoading(false);
    };
    getSale();
  }, [id]);

  return (
    <div className="product-page">
      <UserNavBar />

      { isLoading ? (
        <div> Carregando... </div>
      ) : (<OrderDetailCard
        saleInfos={ sale }
      />)}

    </div>
  );
}

export default SellerOrderDetails;
