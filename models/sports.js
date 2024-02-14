const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Sport = sequelize.define('Sport', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    sportName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    // Define the table name explicitly
    tableName: 'sports'
});

module.exports = Sport;
