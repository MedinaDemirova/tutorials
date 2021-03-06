const express = require('express');
const app = express();
const {PORT} = require('./config/config');
const routes = require ('./routes');
const errorHandler = require ('./middlewares/errorHandler');
const cors = require ('cors');



require ('./config/mongoose');
require ('./config/express')(app);

app.use (cors());

app.use (routes);

app.use (errorHandler);

app.listen (PORT, ()=> console.log (`Server is listening on port ${PORT}...`));