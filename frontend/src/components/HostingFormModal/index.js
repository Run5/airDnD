// frontend/src/components/SignupFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import HostingForm from './HostingForm';

function HostingFormModal({ setShowMenu }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Let's Go!</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <HostingForm setShowMenu={ setShowMenu }/>
        </Modal>
      )}
    </>
  );
}

export default HostingFormModal;
