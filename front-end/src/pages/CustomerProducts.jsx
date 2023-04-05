import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { requestData } from '../services/requests';
import UserNavBar from '../components/UserNavBar';
import CartButton from '../components/CartButton';
import CartContext from '../Context/CartContext';

function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { totalPrice } = useContext(CartContext);

  useEffect(() => {
    const getDrinks = async () => {
      try {
        const { data } = await requestData('/products');
        setProducts(data);
        setIsLoading(false);
        localStorage.setItem('Carrinho', JSON.stringify(data));
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
              img={ product.urlImage }
              price={ product.price }
            />
          ))
        )}
      </div>
      <CartButton { ...totalPrice } totalPrice={ totalPrice.toSring() } />
    </div>
  );
}

export default CustomerProducts;
