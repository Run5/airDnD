// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { fbSquare, gpSquare, twSquare, userIcon, keyIcon, errIcon } from '../icons';
import './LoginForm.css';
import SignupFormModal from "../SignupFormModal";


function LoginForm({ setShowMenu }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const menu = document.querySelector('.profile-dropdown')
  menu.classList.add('hidden');
  setShowMenu(false);

  return (
    <div className='LoginFormContainer'>
      <h3 className='LoginFormTitle'>
        Sign In
      </h3>
      <form className='LoginForm' onSubmit={handleSubmit}>
        { (errors.length > 0) ? <ul className='LoginFormErrors'>{errors.map((error, idx) => <li key={idx}>{errIcon} {error}</li>)}</ul> : null }
        <label className='LoginFormUsernameLabel'>
          <div className='LoginFormInputIcon'>
            {/* Username or Email */}
            {userIcon}
          </div>
          <input
            className='LoginFormUsernameInput'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder='username/email'
          />
        </label>
        <label className='LoginFormPasswordLabel'>
          <div className='LoginFormInputIcon'>
            {/* Password */}
            {keyIcon}
          </div>
          <input
            className='LoginFormPasswordInput'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='password'
          />
        </label>
        <button type="submit" className='LoginFormSubmitButton'>Log In</button>
        <button
          type="submit"
          className='LoginFormSubmitButton'
          onClick={() => {
            setPassword('password')
            setCredential('demo@user.io')
          }}>
          Demo
        </button>
      </form>
      <div className='LoginFormSignup'>
        Don't have an account?&ensp;
        <SignupFormModal setShowMenu={ setShowMenu }/>
      </div>
      {/* <div className='LoginFormIcons'>
        <div className='LoginFormIcon'>{fbSquare}</div>
        <div className='LoginFormIcon'>{gpSquare}</div>
        <div className='LoginFormIcon'>{twSquare}</div>
      </div> */}
    </div>
  );
}

export default LoginForm;
