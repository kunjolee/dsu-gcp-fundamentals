const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Photo = require('./photo');
const Album = require('./album');

const AlbumDetail = db.define('albumDetail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
});

Photo.belongsToMany(Album, { through: AlbumDetail , uniqueKey: 'idPhoto'});
Album.belongsToMany(Photo, { through: AlbumDetail, uniqueKey: 'idAlbum' });


module.exports = AlbumDetail;