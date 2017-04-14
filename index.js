// Basic structure for running the app

'use strict';
const port = parseInt(process.env.PORT, 10) || 3000;
const express = require('express');
const routes =  require('./backend/routes');

let app = express();

app.use(express.static('public'));
app.use(routes);

app.listen(port);
