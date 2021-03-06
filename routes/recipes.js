'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const {Recipe} = require('../models/recipe');

const router = express.Router();

router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

router.get('/', (req, res, next) => {
  const userId = req.user.id;

  let filter = {};
  if (userId) {
    filter.userId = userId;
  }

  Recipe.find(filter)
    .then((results) => res.json(results))
    .catch(err => next(err));
});

router.post('/', jsonParser, (req, res, next) => {
  const userId = req.user.id;
  let newRecipe = {spoonacularId: req.body.id, 
    userId: userId,
    image: req.body.image,
    instructions: req.body.instructions,
    rating: null,
    title: req.body.title,
  };

  Recipe.create(newRecipe)
    .then(data => res.json(data))
    .catch(err => {
      next(err);
    });
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const  userId  = req.user.id;

  const toUpdate = {};
  const updateableFields = ['title', 'image', 'instructions', 'rating'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  if (toUpdate.title === '') {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  Recipe.findOneAndUpdate({ _id: id, userId }, toUpdate, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;
  console.log(id);
  console.log('recipe id',id, 'userId', userId);

  Recipe.findOneAndRemove({_id: id, userId})
    .then(data => res.json(data))
    .catch(err => {
      next(err);
    });
});

module.exports = {router};