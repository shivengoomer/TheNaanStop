const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
require('dotenv').config()
const port = process.env.PORT || 3001

app.use(express.json());
// !important! 
// you need to install the following libraries |express|[dotenv > if required]
// or run this command >> npm i express dotenv 

const recipeRoutes = require('./routes/recipeRoutes.js');
app.use('/recipes', recipeRoutes);

// User routes
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./db/database.js')
app.use('/users', userRoutes);
connectDB();

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))