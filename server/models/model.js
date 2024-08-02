const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  alias: String,
  title: String
});

const coordinateSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number
});

const locationSchema = new mongoose.Schema({
  address1: String
});

const businessSchema = new mongoose.Schema({
  id: String,
  alias: String,
  name: String,
  image_url: String,
  is_closed: Boolean,
  url: String,
  review_count: Number,
  categories: [categorySchema],
  rating: Number,
  coordinates: coordinateSchema,
  transactions: [String],
  price: String,
  location: locationSchema
});

const restaurantSchema = new mongoose.Schema({
  businesses: [businessSchema]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
