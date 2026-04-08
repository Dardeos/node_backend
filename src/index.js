const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    console.log("Base de données prête.");
    app.listen(PORT, () => console.log(`Node.js running on port ${PORT}`));
}).catch(err => console.error("Erreur BDD :", err));