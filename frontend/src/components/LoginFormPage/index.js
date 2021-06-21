import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faGooglePlusSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import './LoginForm.css';


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const fbSquare = <FontAwesomeIcon icon={ faFacebookSquare } />
  const gpSquare = <FontAwesomeIcon icon={ faGooglePlusSquare } />
  const twSquare = <FontAwesomeIcon icon={ faTwitterSquare } />
  const userIcon = <FontAwesomeIcon icon={ faUser } />
  const keyIcon = <FontAwesomeIcon icon={ faKey } />

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='LoginFormContainer'>
      <h3 className='LoginFormTitle'>
        Sign In
      </h3>
      <form className='LoginForm' onSubmit={handleSubmit}>
        { (errors.length > 0) ? <ul className='LoginFormErrors'>{errors.map((error, idx) => <li key={idx}>{error}</li>)}</ul> : null }
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
        <button type="submit" className='LoginFormSubmitButton'>Login</button>
      </form>
      <div className='LoginFormSignup'>
        Don't have an account?&ensp;
        <a href=''>Sign Up</a>
      </div>
      <div className='LoginFormIcons'>
        {fbSquare}
        {gpSquare}
        {twSquare}
      </div>
    </div>
  );
}

export default LoginFormPage;
