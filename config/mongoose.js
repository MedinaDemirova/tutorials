const mongoose = require ('mongoose');
const {MONGODB_URI} = require('./config');

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log ('DB Connected!')
});


module.exports = db;