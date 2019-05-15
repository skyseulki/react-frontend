import React, { Component } from 'react';
import './Modal.css'

// modal component will receive things in {} down as props from 'ShowUser'
const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section ClassName='modal-main'>
            {children}
            <button onClick={handleClose}>Close window</button>
            </section>
        </div>
    )
}

export default Modal;