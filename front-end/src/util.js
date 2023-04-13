function criptografar(texto) {
  const alfabeto = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const cifra = 'NOPQRSTUVWXYZnopqrstuvwxyzABCDEFGHIJKLMabcdefghijklm4567890123';
  resultado = texto
    .split('').map((e) => alfabeto
      .indexOf(e)).map((j) => cifra[j]).join('');
  return resultado;
}

const keyCart = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return criptografar(user.email.toString().replace(/[@.]/g, ''));
};

function getAll() {
  console.log('util');
  console.log(keyCart());
  const data = localStorage.getItem(keyCart());
  if (data === null) {
    localStorage.setItem(keyCart(), JSON.stringify([]));
    return JSON.parse(localStorage.getItem(keyCart()));
  }
  return JSON.parse(localStorage.getItem(keyCart()));
}

function replaceData(dataUpdated) {
  localStorage.setItem(keyCart(), JSON.stringify(dataUpdated));
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

const getTotal = (num) => {
  const data = getAll();
  const resultAll = data.filter((e) => e.subtotal);
  const total = resultAll.reduce((acc, curr) => acc + Number(curr.subtotal), 0);
  if (num === 'num') return total;
  return total.toFixed(2).replace(/\./, ',');
};

const getQtdById = (id) => {
  const data = getAll();
  return data.filter((e) => e.id === Number(id))[0].quantity || 0;
};

const removeItem = (id) => {
  const data = getAll();
  const filteredData = data.filter((e) => e.id !== Number(id));
  replaceData(filteredData);
  return getAll();
};

const logoutUser = () => localStorage.removeItem('user');
const clearCart = () => localStorage.removeItem(keyCart());
const getUser = () => JSON.parse(localStorage.getItem('user'));

module.exports = {
  handleQuantityCart,
  getTotal,
  getAll,
  getQtdById,
  removeItem,
  clearCart,
  logoutUser,
  replaceData,
  getUser,
};
