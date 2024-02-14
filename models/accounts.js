const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Account = sequelize.define('Account', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    UID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    favouriteClub: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dob: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    // Define the table name explicitly
    tableName: 'accounts',
});

async function createOrUpdateAccount(UID, email) {
    try {
        const [account, created] = await Account.findOrCreate({
            where: { UID }, 
            defaults: { email }   
        });

        if (!created) {
            await account.update({ email });
            return account.toJSON();
        } else {
            console.log('Account created:', account.toJSON());
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {
    createOrUpdateAccount,
    Account
};
