import './styles/customerProducts.css';
import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { requestData } from '../services/requests';
import UserNavBar from '../components/UserNavBar';
import CartButton from '../components/CartButton';
import CartContext from '../Context/CartContext';
import { getAll, getTotal, replaceData } from '../util';
// import { getAll } from '../util';

function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { totalPrice, setTotalPrice } = useContext(CartContext);

  useEffect(() => {
    const getDrinks = async () => {
      try {
        const storage = getAll();
        const { data } = await requestData('/products');
        const items = data.map((e) => (storage
          .some(((j) => j.id === e.id)) ? storage.find((j) => j.id === e.id) : e));

        setProducts(items);
        setIsLoading(false);
        setTotalPrice(getTotal());
        replaceData(items);
      } catch (error) {
        console.error(error);
      }
    };
    getDrinks();
  }, [setTotalPrice]);

  return (
    <div className="product-page">
      <UserNavBar />
      <div className="product-grid">
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
              qtdParam={ product.quantity || 0 }
            />
          ))
        )}
      </div>
      <CartButton { ...totalPrice } totalPrice={ totalPrice.toString() } />
    </div>
  );
}

export default CustomerProducts;
