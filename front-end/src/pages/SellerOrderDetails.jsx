import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserNavBar from '../components/UserNavBar';
import { setToken, requestData } from '../services/requests';
import OrderDetailCard from '../components/OrderDetailCard';

function SellerOrderDetails() {
  const [sale, setSale] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    const getSale = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      setToken(token);

      const { data } = await requestData('/seller/orders');
      // console.log(data);
      const findSaleId = data.filter((venda) => JSON.stringify(venda.id) === id);
      // console.log(findSaleId[0]);
      setSale(findSaleId[0]);

      setIsLoading(false);
    };
    getSale();
  }, [id]);

  return (
    <div>
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
