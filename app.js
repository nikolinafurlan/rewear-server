const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
app.use(cors());
app.options('*', cors());

//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

//Routers
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const usersRouter = require('./routers/users');
const ordersRouter = require('./routers/orders');

const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);
app.use('public/uploads', express.static(__dirname + '/public/uploads'));
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'mernshop',
  })
  .then(() => {
    console.log('Database connection establisehd...');
  })
  .catch((err) => {
    console.log(err);
  });

//Development
//app.listen(3000, () => {
//console.log('server is running on port 3000');
//});

//Production
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log('Express is working on port' + port);
});
