const { Sequelize, DataTypes } = require('sequelize');

const sequelize = process.env.DATABASE_URL 
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Required for Render/ElephantSQL
            }
        }
    })
    : new Sequelize({
        dialect: 'sqlite',
        storage: './db.sqlite3'
    });

const Event = sequelize.define('Event', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT,
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('upcoming', 'ongoing', 'finished'),
        defaultValue: 'upcoming'
    }
});

const Participant = sequelize.define('Participant', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

sequelize.sync();

module.exports = { sequelize, Event, Participant };