var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
  name: String,
  ingredients: String,
  countryOfOrigin: String,
  recipeUrl: String,
  rating: Number
})

var Food = mongoose.model('Food', FoodSchema)
module.exports = Food;
