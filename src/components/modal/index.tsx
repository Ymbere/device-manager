import React from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from "../../assets/svgs";
import { StyledModalContainer, StyledModalContent, StyledModalFooter, StyledModalHeader, StyledOverlay } from './styles';

interface ModalProps {
  isOpen?: boolean;
  children: React.ReactNode;
  onClose: () => void;
  actions: React.ReactNode;
  modalTitle: string | React.ReactNode;
}

interface ModalWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
  actions: React.ReactNode;
  title: string | React.ReactNode;
}

const ModalWrapper = ({ children, onClose, actions, title }: ModalWrapperProps) => {
  const handleClickOverlay = React.useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      <StyledOverlay onClick={handleClickOverlay} />
      <StyledModalContainer>
        <StyledModalHeader>
          <span>{title}</span>
          <CloseIcon style={{ cursor: 'pointer' }} data-testid="close-modal-button" onClick={onClose} />
        </StyledModalHeader>
        <StyledModalContent>
          {children}
        </StyledModalContent>
        <StyledModalFooter>
          {actions}
        </StyledModalFooter>
      </StyledModalContainer>
    </>
  );
};

const Modal = ({ onClose, actions, isOpen, children, modalTitle }: ModalProps) => {
  return (
    <>
      {isOpen && createPortal(
        <ModalWrapper onClose={onClose} actions={actions} title={modalTitle}>
          {children}
        </ModalWrapper>,
        document.body
      )}
    </>
  );
};

export default Modal;
