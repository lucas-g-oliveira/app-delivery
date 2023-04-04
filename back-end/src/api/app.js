const express = require('express');
const cors = require('cors');
const route = require('../routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(route.productRoute);
app.use(route.saleRoute);
app.use(route.userRoute);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use((error, _req, res, _next) => {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    console.log(error);
    console.error(`***** Erro ${error.message}`);
    return res.status(500).json({ message: 'internal server error' });
});

module.exports = app;
