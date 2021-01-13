require('./database');

const express = require('express');
const app = express();
const routes = require('./Router');
const EstrategiaAuth = require('./middleware/estrategia-auth');

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});