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


async function createOrUpdateAccount(name,model, operation) {
    try {
        const [role, created] = await Role.findOrCreate({
            where: { name }, 
            defaults: { model,operation }   
        });

        if (!created) {
            await role.update({ operation,model });
            return role.toJSON();
        } else {
            console.log('Role created:', role.toJSON());
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {Role,createOrUpdateAccount};
