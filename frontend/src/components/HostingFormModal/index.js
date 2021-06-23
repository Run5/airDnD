// frontend/src/components/HostingFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import HostingForm from './HostingForm';

function HostingFormModal({ btnTxt }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>{btnTxt}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <HostingForm />
        </Modal>
      )}
    </>
  );
}

export default HostingFormModal;
