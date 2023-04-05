import React, { useState, useEffect } from 'react';
import { getAll } from '../util';

function ConsumerCheckout() {
  console.log('consumerCheckout');
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const storageProducts = getAll();
    setProduct(storageProducts.filter((e) => e.quantity));
    console.log(storageProducts);
  }, []);

  return (
    <div>
      <h6>{products.map((e) => <h6 key={ e.name }>{e.name}</h6>)}</h6>
    </div>
  );
}

export default ConsumerCheckout;
