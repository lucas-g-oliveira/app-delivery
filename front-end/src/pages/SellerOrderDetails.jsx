import React, { useState, useEffect } from 'react';
import UserNavBar from '../components/UserNavBar';
import OrderDetailCard from '../components/OrderDetailCard';

function SellerOrdersDetails(props) {
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log(props);

  const getDetails = async () => {
    try {
      const data = await requestData('/seller/orders');
      const thisSale = data.filter((sales) => sales.id === id)[0];
      const { status, date, price } = thisSale;
      setDetails({ saleId, status, date, price });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  return (
    <div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        (<UserNavBar />)(<OrderDetailCard
          id={ id }
          status={ details.status }
          date={ details.date }
          price={ details.price }
        />)
      )}
    </div>
  );
}

SellerOrdersDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.func.isRequired,
  }).isRequired,
};

export default SellerOrdersDetails;
