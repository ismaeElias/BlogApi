require('dotenv').config();
require('./database');
require('./middleware/estrategia-auth');
require('./redis/BlockListAccessToken');
require('./redis/allowlistRefreshToken');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./Router');


app.use(express.json());
app.use(bodyParser.json());
app.use(routes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});