// frontend/src/components/HostingFormModal/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { fbSquare, gpSquare, twSquare, userIcon, keyIcon, emailSquare, lockIcon, errIcon } from '../icons';
import './HostingForm.css';

function HostingFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (password === confirmPassword) {
    //   setErrors([]);
    //   return dispatch(sessionActions.signup({ email, username, password }))
    //     .catch(async (res) => {
    //       const data = await res.json();
    //       if (data && data.errors) setErrors(data.errors);
    //     });
    // }
    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='HostingFormContainer'>
      <h3 className='HostingFormTitle'>
        Register
      </h3>
      <form className='HostingForm' onSubmit={handleSubmit}>
        { (errors.length > 0) ? <ul className='HostingFormErrors'>{errors.map((error, idx) => <li key={idx}>{errIcon} {error}</li>)}</ul> : null }
        <label className='HostingFormEmailLabel'>
          <div className='HostingFormInputIcon'>
            {/* Email */}
            {emailSquare}
          </div>
          <input
            className='HostingFormEmailInput'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='email'
          />
        </label>
        <label className='HostingFormUsernameLabel'>
          <div className='HostingFormInputIcon'>
            {/* Username */}
            {userIcon}
          </div>
          <input
            className='HostingFormUsernameInput'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder='username'
          />
        </label>
        <label className='HostingFormPasswordLabel'>
          <div className='HostingFormInputIcon'>
            {/* Password */}
            {keyIcon}
          </div>
          <input
            className='HostingFormPasswordInput'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='password'
          />
        </label>
        <label className='HostingFormConfirmPasswordLabel'>
          <div className='HostingFormInputIcon'>
            {/* Confirm Password */}
            {lockIcon}
          </div>
          <input
            className='HostingFormConfirmPasswordInput'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder='confirm password'
          />
        </label>
        <button type="submit" className='HostingFormSubmitButton'>Sign Up</button>
      </form>
      <div className='HostingFormHosting'>
        Already have an account?&ensp;
        <a>Log In</a>
      </div>
      <div className='HostingFormIcons'>
        <div className='HostingFormIcon'>{fbSquare}</div>
        <div className='HostingFormIcon'>{gpSquare}</div>
        <div className='HostingFormIcon'>{twSquare}</div>
      </div>
    </div>
  );
}

export default HostingFormModal;
