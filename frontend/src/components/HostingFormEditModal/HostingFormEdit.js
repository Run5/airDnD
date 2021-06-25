// frontend/src/components/HostingFormEditModal/HostingFormEdit.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/dndsession";
import { errIcon } from '../icons';
import './HostingFormEdit.css';

function HostingFormEdit({ sessionId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const singleSession = useSelector((state) => state.dndsession[sessionId]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [map, setMap] = useState("");
  const [party, setParty] = useState(4);
  const [isPublic, setIsPublic] = useState(false);
  const [inPerson, setInPerson] = useState(false);
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    const res = await dispatch(sessionActions.patchDndSession(singleSession?.id, { name, description, location, map, party, isPublic, inPerson }))

    if(res) return res;
    else throw new Error('Failed to update session');

  };

  return (
    <div className='HostingFormEditContainer'>
      <h3 className='HostingFormEditTitle'>
        Edit your session
      </h3>
      <form className='HostingFormEdit' onSubmit={handleSubmit}>
        { (errors.length > 0) ? <ul className='HostingFormEditErrors'>{errors.map((error, idx) => <li key={idx}>{errIcon} {error}</li>)}</ul> : null }
        <label className='HostingFormEditLabel'>
          <input
            className='HostingFormEditNameInput'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='name'
            required
          />
        </label>
        <label className='HostingFormEditLabel'>
          <input
            className='HostingFormEditDescriptionInput'
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='description'
          />
        </label>
        <label className='HostingFormEditLabel'>
          <input
            className='HostingFormEditLocationInput'
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='location'
          />
        </label>
        <label className='HostingFormEditLabel'>
          <input
            className='HostingFormEditMapInput'
            type="text"
            value={map}
            onChange={(e) => setMap(e.target.value)}
            required
            placeholder='map url'
          />
        </label>
        <label className='HostingFormEditLabel'>
          <input
            className='HostingFormEditPartyInput'
            type="number"
            value={party}
            onChange={(e) => setParty(Number(e.target.value))}
            min='2'
            max='16'
            required
          />
        </label>
        <label className='HostingFormEditLabel'>
          <input
            className='HostingFormEditIsPublicInput'
            type="checkbox"
            value={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />Set this session as public.
        </label>
        <label className='HostingFormEditLabel'>
        <input
            className='HostingFormEditInPersonInput'
            type="checkbox"
            value={inPerson}
            onChange={() => setInPerson(!inPerson)}
          />Is this session going to be in person?
        </label>
        <button type="submit" className='HostingFormEditSubmitButton'>Host my session!</button>
      </form>
      <div className='HostingFormEditView'>
        <a>View sessions you're hosting.</a>
      </div>
    </div>
  );
}

export default HostingFormEdit;
