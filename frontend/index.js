const port = 8000;
const express = require('express');

const path = `${__dirname}/src`;
const app = express();
app.use(express.static(path));

app.listen(port, () => {console.log(`Iniciado Frontend na porta ${port}`)});