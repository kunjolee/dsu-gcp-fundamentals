const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const User = require('./user');

const Album = db.define('album', {
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
});


User.hasMany(Album, {
    as: 'UserAlbum',
    foreignKey: 'idUser'
});

Album.belongsTo(User, { as: 'UserAlbum', foreignKey: 'idUser' });

module.exports = Album;