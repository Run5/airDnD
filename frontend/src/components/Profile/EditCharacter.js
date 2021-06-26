import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { patchCharacter } from '../../store/charStore';

const EditCharacter = ({ hideForm, charId }) => {
  const dispatch = useDispatch();
  const myCharacters = useSelector(state => state.characters);
  const races = ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Halfling', 'Half-Orc', 'Human', 'Tiefling', 'Orc of Exandria', 'Leonin', 'Satyr', 'Aarakocra', 'Genasi', 'Goliath', 'Aasimar', 'Bugbear', 'Firbolg', 'Goblin', 'Hobgoblin', 'Kenku', 'Kobold', 'Lizardfolk', 'Orc', 'Tabaxi', 'Triton', 'Yuan-ti Pureblood', 'Feral Tiefling', 'Tortle', 'Changeling', 'Kalashtar', 'Shifter', 'Warforged', 'Gith', 'Centaur', 'Loxodon', 'Minotaur', 'Simic Hybrid', 'Vedalken', 'Locathah', 'Verdan', 'Grung']
  const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard', 'Artificer']

  const [name, setName] = useState(`${myCharacters[charId].name}`);
  const [myRace, setRace] = useState(`${myCharacters[charId].race}`);
  const [dndClass, setClass] = useState(`${myCharacters[charId].class}`);
  const [level, setLevel] = useState(myCharacters[charId].level);

  const updateName = (e) => setName(e.target.value);
  const updateRace = (e) => setRace(e.target.value);
  const updateClass = (e) => setClass(e.target.value);
  const updateLevel = (e) => setLevel(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(myRace)

    const payload = {
      name,
      myRace,
      dndClass,
      level,
    };

    console.log(payload)

    let patchedChar = await dispatch(patchCharacter(payload, charId));
    if (patchedChar) hideForm();
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
            <option key={race} selected={ race === myRace ? true : false }>{race}</option>
          )}
        </select>
        <select onChange={updateClass}>
          {classes.map(dndclass =>
            <option key={dndclass} selected={ dndclass === dndClass ? true : false }>{dndclass}</option>
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
        <button type="submit">Edit Character</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default EditCharacter;
