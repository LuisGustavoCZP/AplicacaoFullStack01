const port = 8000;
const express = require('express');

const path = `${__dirname}/src`;
const app = express();
app.use(express.static(path));

app.listen(port, () => {`Iniciado Frontend na porta ${port}`});