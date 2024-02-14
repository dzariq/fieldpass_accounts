const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Club = require('./clubs');

const Country = sequelize.define('Country', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    countryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    // Define the table name explicitly
    tableName: 'countries',
});


module.exports = Country;
