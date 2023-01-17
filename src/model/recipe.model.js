const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');

const recipes = require('../data/recipes.json');

const rootDir = require('../utils/path-helper');
const dataPath = path.join(rootDir, 'data', 'recipes.json');

module.exports = class Recipe {
    constructor(name, ingredient, instruction, idIdendify){
        this.id = recipes.length + 1;
        this.idIdendify = idIdendify
        this.name = name;
        this.ingredient = ingredient;
        this.instruction = instruction;
        
    }

    delete(callback){
        fs.readFileSync(dataPath, "utf8", (err, data)=>{
            if(err){
                callback({message:"Could not read recipe.json,", status:500})

            }

            const recipes = JSON.parse(data);
            const integerId = parseInt(this.idIdendify);
            const changeRecipeIndex = recipes.findIndex(recipe=>recipe.id === integerId)
            const newArr = recipes.splice(changeRecipeIndex, 1);

            fs.writeFileSync(dataPath, JSON.stringify(newArr, null, 2), "utf8", (err)=>{
                if(err){
                    callback({ message: "Could not write to recipe.json", status: 500 })
                }

                callback({ message: "Recipe saved successfully", status: 200 })
                
            })

        })
    }

    save(callback) {
        fs.readFile(dataPath, "utf8", (err, data) => {
            if(err){
                callback({ message: "Could not read recipe.json", status: 500 })
            }
    
            //Parse the JSON file
            const recipes = JSON.parse(data)
            recipes.push(this)
    
            //Write the new data to JSON file
            fs.writeFile(dataPath, JSON.stringify(recipes, null, 2),"utf8", (err) => {
                if(err){
                    callback({ message: "Could not write to recipe.json", status: 500 })
                }
                callback({ message: "Recipe saved successfully", status: 200 })
            })
        })
    }

    update(callback){
        fs.readFile(dataPath, "utf8",(err, data)=>{
            if(err){
                callback({ message: "Could not read recipe.json", status: 500 });

            }
            const parsedIdIdentify = parseInt(this.idIdendify);
            const recipes = JSON.parse(data);
            const changeRecipeIndex = recipes.findIndex(recipe=>recipe.id === this.idIdendify)
            const newRecipes = recipes.map((recipe, i)=>{
                if(recipe.id === parsedIdIdentify){
                    recipe.id = parsedIdIdentify;
                    recipe.name = this.name;
                    recipe.ingredient = this.ingredient;
                    recipe.instruction = this.instruction;

                    return recipe;
                }
                
                return recipe;
            })
            // let newRecipes = recipes.splice(changeRecipeIndex, 1, this);
            
            fs.writeFile(dataPath, JSON.stringify(newRecipes, null, 2), "utf8", (err)=>{
                if(err){
                    callback({ message: "Could not write to recipe.json", status: 500 })
                }
                callback({ message: "Recipe saved successfully"+this.idIdendify, status: 200 })
            })
        } )
    }

    static fetchAllRecipes(callback){ 
        fs.readFile(dataPath, (err, data) => {
            if(err){
                callback({ message: "Could not read recipe.json", status: 500 })
            }
            callback(JSON.parse(data))
        })
    }

    static findById(id){
        const recipes = JSON.parse(fs.readFileSync(dataPath))
        const found = recipes.some(recipe => recipe.id === parseInt(id))

        if(!found){
            return { message: "Recipe not found", status: 404 }
        }

        return recipes.find(recipe => recipe.id === parseInt(id))
    }
    
}