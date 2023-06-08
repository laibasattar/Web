
const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  name: String,
  sugarQuantity: Number,
  carbonated: String,
});

let Drink = mongoose.model('Drink', drinkSchema);

module.exports = Drink;
