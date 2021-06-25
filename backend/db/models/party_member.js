'use strict';
module.exports = (sequelize, DataTypes) => {
  const Party_member = sequelize.define('Party_member', {
    character_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Party_member.associate = function(models) {
    // associations can be defined here
    Party_member.belongsTo(models.Character, { foreignKey: 'charcter_id' });
    Party_member.belongsTo(models.Session, { foreignKey: 'session_id' });
  };
  return Party_member;
};
