// frontend/src/components/HostingFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import HostingForm from './HostingForm';
import './HostingForm.css';

function HostingFormModal({ btnTxt, cName }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={`${cName}`} onClick={() => setShowModal(true)}>{btnTxt}</button>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
        >
          <HostingForm setShowModal={ setShowModal }/>
        </Modal>
      )}
    </>
  );
}

export default HostingFormModal;
