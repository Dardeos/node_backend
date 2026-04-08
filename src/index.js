const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. NOUVEAU : On importe ta base de données et le modèle User
const { sequelize, User } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

const eventRoutes = require('./routes');
app.use('/api', eventRoutes);

const PORT = process.env.PORT || 8000;

sequelize.sync().then(async () => {
    console.log("Base de données prête.");
    
    const admin = await User.findOne({ where: { username: 'root' } });
    if (!admin) {
        await User.create({
            username: 'root',
            password: 'root',
            role: 'admin'
        });
        console.log("Compte root (root) créé automatiquement !");
    } else {
        console.log("Le compte root existe déjà.");
    }

    // Lancement du serveur
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch(err => {
    console.error("Erreur de base de données :", err);
});