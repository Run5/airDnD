// frontend/src/components/Navigation/index.js
import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../store/session';
import { d20, userIcon, barsIcon, searchIcon } from '../icons';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    // document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className='NavigationContainer'>
      <div className='NavHome'>
        <NavLink exact to='/'>{d20} airdnd</NavLink>
      </div>
      <div className='NavSearchBar'>
        <div className='NavSearch'>
          Start your search
        </div>
        <button type='button' class='NavSearchButton'>
          {searchIcon}
        </button>
      </div>
      <div className='NavRightContainer'>
        <div className='NavBecomeHost'>
          <button type='button' class='NavHostButton'>
            Become a host
          </button>
        </div>
        <div className='NavLoginSignup'>
          <button type='button' class='NavProfileButton' onClick={openMenu}>
            {barsIcon}&ensp;{userIcon}
          </button>
          {isLoaded ? (showMenu && (
            <ul className="profile-dropdown">
              <li><LoginFormModal /></li>
              <li><SignupFormModal /></li>
            </ul>
          )) : (showMenu && (
            <ul className="profile-dropdown">
              <li>{sessionUser.username}</li>
              <li>{sessionUser.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
