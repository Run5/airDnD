'use strict';
module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' },
    },
    race: {
      type: DataTypes.STRING(20),
      allowNull: false,
      isIn: [['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Halfling', 'Half-Orc', 'Human', 'Tiefling', 'Orc of Exandria', 'Leonin', 'Satyr', 'Aarakocra', 'Genasi', 'Goliath', 'Aasimar', 'Bugbear', 'Firbolg', 'Goblin', 'Hobgoblin', 'Kenku', 'Kobold', 'Lizardfolk', 'Orc', 'Tabaxi', 'Triton', 'Yuan-ti Pureblood', 'Feral Tiefling', 'Tortle', 'Changeling', 'Kalashtar', 'Shifter', 'Warforged', 'Gith', 'Centaur', 'Loxodon', 'Minotaur', 'Simic Hybrid', 'Vedalken', 'Locathah', 'Verdan', 'Grung']]
    },
    class: {
      type: DataTypes.STRING(10),
      allowNull: false,
      isIn: [['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard', 'Artificer', 'Blood Hunter']],
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 20,
      },
    },
  }, {});
  Character.associate = function(models) {
    // associations can be defined here
    Character.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return Character;
};
