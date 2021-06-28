// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ setShowMenu }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='UserButton' onClick={() => setShowModal(true)}>Login</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowMenu={ setShowMenu }/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
