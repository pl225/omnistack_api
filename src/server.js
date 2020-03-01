const express = require('express');

const server = express();

server.get('/', (req, res) => {
    return res.json({ mensagem: `Haha ${req.query.nome}` });
});

server.listen(5000);