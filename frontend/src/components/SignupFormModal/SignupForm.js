// frontend/src/components/SignupFormModal/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { fbSquare, gpSquare, twSquare, userIcon, keyIcon, emailSquare, lockIcon, errIcon } from '../icons';
import './SignupForm.css';
import LoginFormModal from "../LoginFormModal";

function SignupForm({ setShowMenu }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const menu = document.querySelector('.profile-dropdown')
  menu.classList.add('hidden');
  setShowMenu(false);

  return (
    <div className='SignupFormContainer'>
      <h3 className='SignupFormTitle'>
        Register
      </h3>
      <form className='SignupForm' onSubmit={handleSubmit}>
        { (errors.length > 0) ? <ul className='SignupFormErrors'>{errors.map((error, idx) => <li key={idx}>{errIcon} {error}</li>)}</ul> : null }
        <label className='SignupFormEmailLabel'>
          <div className='SignupFormInputIcon'>
            {/* Email */}
            {emailSquare}
          </div>
          <input
            className='SignupFormEmailInput'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='email'
          />
        </label>
        <label className='SignupFormUsernameLabel'>
          <div className='SignupFormInputIcon'>
            {/* Username */}
            {userIcon}
          </div>
          <input
            className='SignupFormUsernameInput'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder='username'
          />
        </label>
        <label className='SignupFormPasswordLabel'>
          <div className='SignupFormInputIcon'>
            {/* Password */}
            {keyIcon}
          </div>
          <input
            className='SignupFormPasswordInput'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='password'
          />
        </label>
        <label className='SignupFormConfirmPasswordLabel'>
          <div className='SignupFormInputIcon'>
            {/* Confirm Password */}
            {lockIcon}
          </div>
          <input
            className='SignupFormConfirmPasswordInput'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder='confirm password'
          />
        </label>
        <button type="submit" className='SignupFormSubmitButton'>Sign Up</button>
      </form>
      <div className='SignupFormSignup'>
        Already have an account?&ensp;
        <LoginFormModal setShowMenu={ setShowMenu }/>
      </div>
      {/* <div className='SignupFormIcons'>
        <div className='SignupFormIcon'>{fbSquare}</div>
        <div className='SignupFormIcon'>{gpSquare}</div>
        <div className='SignupFormIcon'>{twSquare}</div>
      </div> */}
    </div>
  );
}

export default SignupForm;
