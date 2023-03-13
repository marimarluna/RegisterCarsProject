import React, { PropsWithChildren, ReactElement, ReactNode, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ActionsButtonType } from '../utils/types';

interface ModalTypes {
  show: boolean,
  handleClose: () => void,
  children: ReactNode,
  title: string,
  actions?: Array<ActionsButtonType>
}

function ModalBoostrap({ show = false, handleClose, children, title, actions = [] }: ModalTypes): JSX.Element {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        {actions.map(({ label, callback, color = "primary" }: ActionsButtonType) => (
          <Button key={`key-${label}`} variant={color} onClick={callback}>
            {label}
          </Button>
        ))}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalBoostrap