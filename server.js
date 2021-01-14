require('dotenv').config();
require('./database');
require('./middleware/estrategia-auth');

const express = require('express');
const app = express();
const routes = require('./Router');


app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});