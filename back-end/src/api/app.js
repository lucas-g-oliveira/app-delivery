const express = require('express');
const route = require('../routes');

const app = express();
app.use(express.json());
app.use(route.userRoute);
app.use(route.productRoute);

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
