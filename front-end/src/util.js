function getAll() {
  const keyStorage = 'Carrinho';
  const data = localStorage.getItem(keyStorage);
  if (data === null) {
    localStorage.setItem(keyStorage, JSON.stringify([]));
    return JSON.parse(localStorage.getItem(keyStorage));
  }
  return JSON.parse(localStorage.getItem(keyStorage));
}

function replaceData(dataUpdated) {
  const keyStorage = 'Carrinho';
  localStorage.setItem(keyStorage, JSON.stringify(dataUpdated));
  return 'ok';
}

const handleQuantityCart = (id, quantity = 0) => {
  const data = getAll();
  const productToAdd = data.filter((e) => e.id === Number(id))[0];
  const filteredData = data.filter((e) => e.id !== Number(id));
  const updated = {
    ...productToAdd,
    quantity,
    subtotal: (Number(productToAdd.price) * quantity).toFixed(2),
  };
  replaceData([...filteredData, updated]);
  return quantity;
};

const getTotal = () => {
  const data = getAll();
  const resultAll = data.filter((e) => e.subtotal);
  const total = resultAll.reduce((acc, curr) => acc + Number(curr.subtotal), 0);
  return total.toFixed(2);
};

const getQtdById = (id) => {
  const data = getAll();
  return data.filter((e) => e.id === Number(id))[0].quantity || 0;
};

module.exports = { handleQuantityCart, getTotal, getAll, getQtdById };
/* {
  "id": 1,
  "name": "Skol Lata 250ml",
  "price": "2.20",
  "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg"
},
{
  "id": 2,
  "name": "Heineken 600ml",
  "price": "7.50",
  "urlImage": "http://localhost:3001/images/heineken_600ml.jpg"
}, */
