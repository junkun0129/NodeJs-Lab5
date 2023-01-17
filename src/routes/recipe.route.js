const express = require('express');

const {getRecipesUpdateSubmmit,getRecipesPage,getRecipesUpdatePage, getAddRecipePage, postAddRecipe, getRecipeById } = require('../controller/recipe.controller')

const router = express.Router();

/**
 * @route GET //localhost:8000/recipes/
 * @desc Get all recipes
 */
router.get('/', getRecipesPage) 

/**
 * @route POST //localhost:8000/recipes/save
 * @desc Save a recipe
 */
router.post('/save', postAddRecipe)

/**
 * @route GET //localhost:8000/recipes/create
 * @desc Get the create recipe form
 */
router.get('/create', getAddRecipePage)

/**
 * @route GET //localhost:8000/recipes/update
 * @desc Get the update recipe form
 */
router.get('/update', getRecipesUpdatePage)
/**
 * @route GET //localhost:8000/recipes/update
 * @desc Post the update recipe form
 */
router.post('/update', getRecipesUpdateSubmmit)

/**
 * @route GET //localhost:8000/recipes/:id
 * @desc Get a single recipe by id
**/
router.get('/:id', getRecipeById)

module.exports = router;