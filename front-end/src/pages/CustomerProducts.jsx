import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { requestData } from '../services/requests';
import UserNavBar from '../components/UserNavBar';

function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDrinks = async () => {
      try {
        const { data } = await requestData('/products');
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getDrinks();
  }, []);

  return (
    <div>
      <UserNavBar />
      <div>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={ product.id }
              id={ product.id }
              drinkName={ product.name }
              img={ product.url_image }
              price={ product.price }
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CustomerProducts;
