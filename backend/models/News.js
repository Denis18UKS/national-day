const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const News = sequelize.define('News', {
    title: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.TEXT, allowNull: false},
    author_id: {type: DataTypes.INTEGER, allowNull: false},
});

module.exports = News;