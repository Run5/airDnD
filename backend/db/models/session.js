'use strict';

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    host_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' },
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 1000],
      },
    },
    location: {
      type: DataTypes.STRING(255),
    },
    map: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    party_max_size: {
      type: DataTypes.INTEGER,
      validate: {
        min: 2,
        max: 16,
      },
    },
    public: {
      type: DataTypes.BOOLEAN,
    },
    in_person: {
      type: DataTypes.BOOLEAN
    },
  }, {});
  Session.associate = function(models) {
    // associations can be defined here
    Session.belongsTo(models.User, { foreignKey: 'host_id' });
  };
  return Session;
};
