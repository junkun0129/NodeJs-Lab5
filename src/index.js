//import 3rd party modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan')

//import routes
const indexRoute = require('./routes/index.route');
const recipeRoutes = require('./routes/recipe.route');
const rootDirectory = require('./utils/path-helper');

//config and instance of express
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(rootDirectory, 'public')));

//routes
app.use('/', indexRoute);
app.use('/recipes', recipeRoutes)

//catch-all route/middleware
app.use((req,res,next) => {
    res.status(404).send('<h1>Page not found</h1>')
})

//start server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})


// Client(Browser) ---> Entry File ---> Routes ---> Controllers ---> Models
