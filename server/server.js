const express = require('express');

const path = require('path');
const publicPath = path.join(__dirname, '../public');

const PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));

console.log();
console.log('publicPath: ', publicPath);
console.log();

app.listen(PORT, () => {
    console.log('app is running on port: ', PORT);
});