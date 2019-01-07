'use strict';

const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  spoonacularId: {type: Number, required: true},
  image: {type: String},
  imageType: {type: String},
  instructions: {type: Array},
  rating: {type: Number},
  title: {
    type: String,
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


recipeSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = {Recipe};