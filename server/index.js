const express = require('express');
const app = express();
const path = require("path");
app.listen(3000, () => console.log('listening on the 3000'));
app.use(express.static('public'));
app.use('/iss',express.static(path.join(__dirname, '../json')));