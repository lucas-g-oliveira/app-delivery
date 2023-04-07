import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserNavBar from '../components/UserNavBar';
import { setToken, requestData } from '../services/requests';
// import SellerDetailsPageComponent from '../components/SellerDetailsPageComponent';
import OrderDetailCard from '../components/OrderDetailCard';

function SellerOrderDetails() {
  const [sale, setSale] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getSale = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      setToken(token);
      const { data } = await requestData(`/seller/orders/${id}`);
      console.log(data);
      setSale(data);
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
        id={ id }
        status={ sale.status }
        date={ sale.saleDate }
        price={ sale.totalPrice }
      />)}
    </div>
  );
}

export default SellerOrderDetails;
