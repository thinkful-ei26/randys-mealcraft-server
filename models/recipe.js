'use strict';

const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {type: String, required: true},
  ingredients: {type: Array, required: true}
});

// RecipeSchema.methods.serialize = function() {
//   return {
//   };
// };

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = {Recipe};