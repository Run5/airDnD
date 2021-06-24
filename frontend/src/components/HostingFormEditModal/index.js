// frontend/src/components/HostingFormEditModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import HostingFormEdit from './HostingFormEdit';

function HostingFormEditModal({ btnTxt }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>{btnTxt}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <HostingFormEdit />
        </Modal>
      )}
    </>
  );
}

export default HostingFormEditModal;
