// frontend/src/components/HostingFormModal/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/dndsession";
import { errIcon } from '../icons';
import './HostingForm.css';

function HostingForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [map, setMap] = useState("");
  const [party, setParty] = useState(4);
  const [isPublic, setIsPublic] = useState(false);
  const [inPerson, setInPerson] = useState(false);
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;
  const host_id = sessionUser.id;

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    return dispatch(sessionActions.createDndSession({ host_id, name, description, location, map, party, isPublic, inPerson }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className='HostingFormContainer'>
      <h3 className='HostingFormTitle'>
        Host a Session
      </h3>
      <form className='HostingForm' onSubmit={handleSubmit}>
        { (errors.length > 0) ? <ul className='HostingFormErrors'>{errors.map((error, idx) => <li key={idx}>{errIcon} {error}</li>)}</ul> : null }
        <label className='HostingFormLabel'>
          <input
            className='HostingFormNameInput'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='name'
            required
          />
        </label>
        <label className='HostingFormLabel'>
          <input
            className='HostingFormDescriptionInput'
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='description'
          />
        </label>
        <label className='HostingFormLabel'>
          <input
            className='HostingFormLocationInput'
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='location'
          />
        </label>
        <label className='HostingFormLabel'>
          <input
            className='HostingFormMapInput'
            type="text"
            value={map}
            onChange={(e) => setMap(e.target.value)}
            required
            placeholder='map url'
          />
        </label>
        <label className='HostingFormLabel'>
          <input
            className='HostingFormPartyInput'
            type="number"
            value={party}
            onChange={(e) => setParty(Number(e.target.value))}
            min='2'
            max='16'
            required
          />
        </label>
        <label className='HostingFormLabel'>
          <input
            className='HostingFormIsPublicInput'
            type="checkbox"
            value={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />Set this session as public.
        </label>
        <label className='HostingFormLabel'>
        <input
            className='HostingFormInPersonInput'
            type="checkbox"
            value={inPerson}
            onChange={() => setInPerson(!inPerson)}
          />Is this session going to be in person?
        </label>
        <button type="submit" className='HostingFormSubmitButton'>Host my session!</button>
      </form>
      <div className='HostingFormView'>
        <a>View sessions you're hosting.</a>
      </div>
    </div>
  );
}

export default HostingForm;
