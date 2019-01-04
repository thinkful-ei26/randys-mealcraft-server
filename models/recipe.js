'use strict';

const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  id: {type: Number, required: true},
  image: {type: String},
  imageType: {type: String},
  instructions: {type: Array},
  rating: {type: Number},
  title: {
    type: String,
    required: true,
  },
});

// RecipeSchema.methods.serialize = function() {
//   return {
//   };
// };

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = {Recipe};