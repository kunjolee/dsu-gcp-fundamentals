const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const User = require('./user');

const Photo = db.define('photo', {
    url: {
        allowNull: false,
        type: DataTypes.STRING
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING
    },
    state: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});


User.hasMany(Photo, {
    as: 'UserPhoto',
    foreignKey: 'idUser'
});

Photo.belongsTo(User, { as: 'UserPhoto', foreignKey: 'idUser' });

module.exports = Photo;