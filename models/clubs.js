const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Country = require('./countries');

const Club = sequelize.define('Club', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    clubName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    // Define the table name explicitly
    tableName: 'clubs',
});

Club.belongsTo(Country);

module.exports = Club;
