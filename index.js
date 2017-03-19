// Basic structure for running the app
'use strict';
import express from 'express';
import routes from './backend/routes';

let app = express();

app.use(express.static('public'));
app.use(routes);

app.listen(3000, () => {
  console.log('Your app is running on 3000 port')
})
