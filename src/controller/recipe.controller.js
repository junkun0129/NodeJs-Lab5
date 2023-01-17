const Recipe = require('../model/recipe.model')

exports.getRecipesPage = (req,res,next) => {
    // res.render('recipes', { recipes })
    Recipe.fetchAllRecipes((recipeData) => {
        if(recipeData.message){
            res.render('400', { title: "Something went wrong", message: recipeData.message })
        }

        
        res.render('recipes', { recipes: recipeData })
    })
}
exports.getRecipesUpdatePage = (req,res,next) => {
    // res.render('recipes', { recipes })
    Recipe.fetchAllRecipes((recipeData) => {
        if(recipeData.message){
            res.render('400', { title: "Something went wrong", message: recipeData.message })
        }

        
        res.render('update', { recipes: recipeData })
    })
}
exports.getRecipesUpdateSubmmit = (req,res,next) => {
    
    if(req.body.condition===true){
        let {condition, id} = req.body;
        const newRecipe = new Recipe("name", "ingredients", "instruction", id)
        newRecipe.delete(({message, status})=>{
            if(status === 200){
                return res.redirect('/recipes/update')
            }
            console.log(message);
            res.status(status).json({message})
        })
    }else{

        let { name, ingredient, quantity, instruction, id } = req.body
    
        if(!Array.isArray(ingredient)){
            ingredient = [ingredient]
            quantity = [quantity]
        }
    
        if(!Array.isArray(instruction)){
            instruction = [instruction]
        }
    
        const ingredients = ingredient.map((ing, i) => {
            //ingredient --> [ 'flour', 'sugar', 'butter' ]
            //quantity -->   [ '1 cup', '4 cups', '2 cups' ]
            return { name: ing, quantity: quantity[i] }
        })
        
    
        const newRecipe = new Recipe(name, ingredients, instruction, id)
        newRecipe.update(({ message, status}) => {
            if(status === 200){
                return res.redirect('/recipes/update')
            }
            console.log(message);
            res.status(status).json({message})
        })
    
        
    }

    return res.redirect('/recipes/update')

    
}

exports.getAddRecipePage = (req, res, next) => {
    res.render('create')
}

exports.postAddRecipe = (req, res, next) => {
    let { name, ingredient, quantity, instruction } = req.body

    if(!Array.isArray(ingredient)){
        ingredient = [ingredient]
        quantity = [quantity]
    }

    if(!Array.isArray(instruction)){
        instruction = [instruction]
    }

    const ingredients = ingredient.map((ing, i) => {
        //ingredient --> [ 'flour', 'sugar', 'butter' ]
        //quantity -->   [ '1 cup', '4 cups', '2 cups' ]
        return { name: ing, quantity: quantity[i] }
    })

    const newRecipe = new Recipe(name, ingredients, instruction)
    newRecipe.save(({ message, status}) => {
        if(status === 200){
            return res.redirect('/recipes')
        }

        res.status(status).json({message})
    })
}



exports.getRecipeById = (req,res,next) => {
    const fetchRecipe = Recipe.findById(req.params.id)

    if(fetchRecipe.message){
        res.render('400', { title: "Something went wrong", message: fetchRecipe.message })
    }

    res.json(fetchRecipe)
}