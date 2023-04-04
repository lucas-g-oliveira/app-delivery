import React, { useState, useEffect } from 'react';
import UserNavBar from '../components/UserNavBar';
import SaleCard from '../components/SaleCard';

function SellerOrders() {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSales = async () => {
    try {
      const data = await requestData('/seller/orders');
      setSales(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        (<UserNavBar />)(sales.map((sale) => (
          <SaleCard
            key={ sale.id }
            id={ sale.id }
            status={ sale.status }
            address={ sale.delivery_address }
            addressNumber={ sale.delivery_number }
            price={ sale.total_price }
            date={ sale.sale_date }
          />
        )))
      )}
    </div>
  );
}

export default SellerOrders;
