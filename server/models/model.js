const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('Business', businessSchema);
