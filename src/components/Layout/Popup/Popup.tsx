import React from 'react';
import Modal from 'react-bootstrap/Modal';

type Props = {
  open: boolean;
  onHandleOpen(open: boolean): void;
};

export const Popup = ({ open, onHandleOpen }: Props): React.ReactElement => {
  return (
    <Modal id="modal" onHide={onHandleOpen} aria-labelledby="form-dialog" show={open}>
      <Modal.Header closeButton>
        <Modal.Title>Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>Feedback was submitted successfully.</Modal.Body>
    </Modal>
  );
};

export default Popup;
