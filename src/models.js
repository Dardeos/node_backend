const { Sequelize, DataTypes } = require('sequelize');

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
    })
    : new Sequelize({ dialect: 'sqlite', storage: './db.sqlite3' });

// models.js

const Event = sequelize.define('Event', {
    title:       { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    date:        { type: DataTypes.DATE, allowNull: false },
    // Attention : Dans Django, les choix sont souvent des strings simples, pas des ENUM
    status:      { type: DataTypes.STRING, defaultValue: 'upcoming' } 
}, {
    tableName: 'api_event', // <--- TRÈS IMPORTANT : Le nom exact dans ta DB Render
    timestamps: false       // Django n'utilise pas le format timestamps de Sequelize
});

const Participant = sequelize.define('Participant', {
    name:  { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false }
}, {
    tableName: 'api_participant', // <--- TRÈS IMPORTANT
    timestamps: false
});


// --- CORRECTION DU MODÈLE REGISTRATION ---
const Registration = sequelize.define('Registration', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    // On définit explicitement les clés étrangères pour correspondre à Django
    event_id: {
        type: DataTypes.INTEGER,
        references: { model: 'api_event', key: 'id' }
    },
    participant_id: {
        type: DataTypes.INTEGER,
        references: { model: 'api_participant', key: 'id' }
    }
}, {
    tableName: 'api_registration', // Nom exact de la table pivot Django
    timestamps: false
});

// --- LIAISONS CORRIGÉES ---
Event.belongsToMany(Participant, { 
    through: Registration, 
    foreignKey: 'event_id', 
    otherKey: 'participant_id' 
});
Participant.belongsToMany(Event, { 
    through: Registration, 
    foreignKey: 'participant_id', 
    otherKey: 'event_id' 
});

module.exports = { sequelize, Event, Participant, Registration };