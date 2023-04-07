import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserNavBar from '../components/UserNavBar';
import SaleCard from '../components/SaleCard';
import { requestData, setToken } from '../services/requests';

function SellerOrders() {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = useLocation().pathname;
  // console.log(url);

  useEffect(() => {
    const getSales = async () => {
      try {
        const role = url.split('/')[1];
        const { token } = JSON.parse(localStorage.getItem('user'));
        // console.log(token);
        setToken(token);
        const { data } = await requestData(`/${role}/orders`);
        console.log(data);
        setSales(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getSales();
  }, [url]);

  return (
    <div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          <UserNavBar />
          {
            sales.map((sale) => (
              <SaleCard
                key={ sale.id }
                id={ sale.id }
                status={ sale.status }
                address={ sale.deliveryAddress }
                addressNumber={ sale.deliveryNumber }
                price={ sale.totalPrice }
                date={ sale.saleDate }
              />
            ))
          }
        </div>
      )}
    </div>
  );
}

export default SellerOrders;
