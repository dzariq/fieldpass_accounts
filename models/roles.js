const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    operation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    // Define the table name explicitly
    tableName: 'roles',
});


module.exports = Role;
