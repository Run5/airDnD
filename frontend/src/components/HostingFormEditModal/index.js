// frontend/src/components/HostingFormEditModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import HostingFormEdit from './HostingFormEdit';
import './HostingFormEdit.css';

function HostingFormEditModal({ btnTxt, sessionId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='HostingFormActualButton' onClick={() => setShowModal(true)}>{btnTxt}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <HostingFormEdit sessionId={ sessionId }/>
        </Modal>
      )}
    </>
  );
}

export default HostingFormEditModal;
