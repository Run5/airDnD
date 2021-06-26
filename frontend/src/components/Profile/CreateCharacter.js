import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCharacter } from '../../store/charStore';

const CreateCharacter = ({ hideForm }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const myCharacters = useSelector(state => state.characters);
  const races = ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Halfling', 'Half-Orc', 'Human', 'Tiefling', 'Orc of Exandria', 'Leonin', 'Satyr', 'Aarakocra', 'Genasi', 'Goliath', 'Aasimar', 'Bugbear', 'Firbolg', 'Goblin', 'Hobgoblin', 'Kenku', 'Kobold', 'Lizardfolk', 'Orc', 'Tabaxi', 'Triton', 'Yuan-ti Pureblood', 'Feral Tiefling', 'Tortle', 'Changeling', 'Kalashtar', 'Shifter', 'Warforged', 'Gith', 'Centaur', 'Loxodon', 'Minotaur', 'Simic Hybrid', 'Vedalken', 'Locathah', 'Verdan', 'Grung']
  const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard', 'Artificer', 'Blood Hunter']

  const [name, setName] = useState('');
  const [race, setRace] = useState('Human');
  const [dndClass, setClass] = useState('Fighter');
  const [level, setLevel] = useState(1);

  const updateName = (e) => setName(e.target.value);
  const updateRace = (e) => setRace(e.target.value);
  const updateClass = (e) => setClass(e.target.value);
  const updateLevel = (e) => setLevel(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      race,
      dndClass,
      level,
    };

    let createdChar = await dispatch(createCharacter(payload, sessionUser.id));
    if (createdChar) hideForm();
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className=''>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={updateName} />
        <select onChange={updateRace}>
          {races.map(race =>
            <option key={race}>{race}</option>
          )}
        </select>
        <select onChange={updateClass}>
          {classes.map(dndclass =>
            <option key={dndclass}>{dndclass}</option>
          )}
        </select>
        <input
          type="number"
          placeholder="Level"
          min='1'
          max='20'
          required
          value={level}
          onChange={updateLevel} />
        <button type="submit">Create new Character</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default CreateCharacter;
