// frontend/src/components/SignupFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal({ setShowMenu }) {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      <button className='UserButton' onClick={() => setShowSignupModal(true)}>Sign up</button>
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <SignupForm setShowMenu={ setShowMenu }/>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
