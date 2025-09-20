const express = require('express');
const { sequelize } = require('./db');


require('dotenv').config();
console.log(process.env.DB_NAME);

const routes = require('./routes'); 
const app = express();

app.use(express.json());
app.use('/api', routes);


sequelize.authenticate()
.then(() => console.log("Connected to the DB"))
.catch(err=> console.error('Error connecting DB'));

app.get('/', (req, res) => {
  res.json({ message: 'Server running' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});