const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
    console.log('MW 1');
    res.send('on users page');
})

app.use('/',(req, res, next) => {
    console.log('MW 2');
    res.send('on home page');
})

app.listen(3001);