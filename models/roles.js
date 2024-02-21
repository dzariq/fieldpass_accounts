const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
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


async function updateRole(roleId, name, model, operation) {
    try {
        const [role, updated] = await Role.update({
            where: { roleId },
            name: name,
            model: model,
            operation: operation
        }).then((result) => {
            // 'result' contains the number of affected rows
            console.log(`${result} rows updated`);
        })
    } catch (error) {
        console.error('Error:', error);
    }
}

async function createRole(name, model, operation) {
    try {
        const [role, updated] = await Role.create({
            name: name,
            model: model,
            operation: operation
        }).then((result) => {
            // 'result' contains the number of affected rows
            console.log(`${result} rows updated`);
        })
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = { Role, updateRole, createRole };
