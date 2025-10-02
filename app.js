const express = require('express');
const { sequelize } = require('./db');
const routes = require('./routes');
const app = express();
const path = require('path');
const cors = require('cors');


require('dotenv').config();
console.log(process.env.DB_NAME);

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

sequelize.authenticate()
.then(() => console.log("Connected to the DB"))
.catch(err=> console.error('Error connecting DB'));

app.get('/', (req, res) => {
  res.json({ message: 'Server running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0",() => {
  console.log(`Server running at http://localhost:${PORT}`);
});