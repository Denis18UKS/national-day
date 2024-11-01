const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('Event', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    start_date: { type: DataTypes.DATEONLY, allowNull: false },
    start_time: { type: DataTypes.TIME, allowNull: false },
    end_time: { type: DataTypes.TIME, allowNull: false },
    status: { type: DataTypes.ENUM('отправлена', 'принята', 'отклонена'), defaultValue: 'отправлена' },
    organizer_id: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Event;
