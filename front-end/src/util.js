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
    subtotal: Number(productToAdd.price) * quantity,
  };
  replaceData([...filteredData, updated]);
};

const getTotal = () => {
  const data = getAll();
  const resultAll = data.filter((e) => e.subtotal);
  console.log(resultAll);
  const total = resultAll.reduce((acc, curr) => acc + Number(curr.subtotal), 0);
  console.log(total);
  return total;
};

module.exports = { handleQuantityCart, getTotal, getAll };
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
