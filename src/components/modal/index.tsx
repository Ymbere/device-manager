import React from 'react';
import {createPortal} from 'react-dom';
import {CloseIcon} from "../../assets/svgs";
import styled from "styled-components";

interface ModalProps {
  isOpen?: boolean,
  children: React.ReactNode,
  onClose: () => void,
  actions: React.ReactNode,
  modalTitle: string,
}

interface ModalWrapperProps {
  children: React.ReactNode,
  onClose: () => void,
  actions: React.ReactNode,
  title: string,
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 0;
`;

const ModalContainer = styled.div`
    padding: 24px;
    background: white;
    border-radius: 4px;
    max-width: 540px;
    max-height: 388px;
    overflow-y: auto;
    z-index: 1;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
`
const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`

const ModalWrapper = ({children, onClose, actions, title}: ModalWrapperProps) => {
  return (
      <>
        <Overlay/>
        <ModalContainer>
          <ModalHeader>
            {title}
            <CloseIcon data-testid="close-modal-button" onClick={onClose}/>
          </ModalHeader>
          {children}
          <ModalFooter>
            {actions}
          </ModalFooter>
        </ModalContainer>
      </>
  )
}

const Modal = ({onClose, actions, isOpen, children, modalTitle}: ModalProps) => {
  return (
      <>
        {isOpen && createPortal(
            <ModalWrapper onClose={onClose} actions={actions} title={modalTitle}>
              {children}
            </ModalWrapper>,
            document.body
        )}
      </>
  )
};

export default Modal;
