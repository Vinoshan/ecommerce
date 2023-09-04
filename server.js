const express = require('express');
const routes = require('./routes');
const Sequelize = require('sequelize');
require('dotenv').config(); 

const { Category, Product, Tag, ProductTag } = require('./models'); 
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost', 
  dialect: 'mysql',
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Sync Sequelize models to the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('All models are synchronized with the database.');
  })
  .catch((err) => {
    console.error('An error occurred while syncing the models:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
