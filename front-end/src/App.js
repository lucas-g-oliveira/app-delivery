import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import SellerOrders from './pages/SellerOrders';
import SellerOrdersDetails from './pages/SellerOrderDetails';
import CartProvider from './Context/CartProvider';
import ConsumerCheckout from './pages/ConsumerCheckout';
import SaleDetails from './pages/SaleDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/checkout" component={ ConsumerCheckout } />
        <Route exact path="/seller/orders" component={ SellerOrders } />
        <Route exact path="/seller/orders/:id" component={ SellerOrdersDetails } />
        <Route exact path="/customer/orders/:id" component={ SaleDetails } />
        <Route exact path="/customer/orders" component={ SellerOrders } />
        <CartProvider>
          <Route exact path="/customer/products" component={ CustomerProducts } />
        </CartProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
