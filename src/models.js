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

module.exports = { sequelize, Event, Participant };