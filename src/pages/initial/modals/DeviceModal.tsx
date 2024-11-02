import React from 'react';
import Modal from '../../../components/modal';
import Button from '../../../components/button';
import DeviceForm from '../../../components/deviceForm';
import { FormErrors, useDeviceForm } from '../../../hooks/useDeviceForm';
import { ModalButtonText, ModalHeaderText } from '../../../styles/common';

interface DeviceModalProps {
  isOpen: boolean;
  deviceId: string | null;
  onClose: () => void;
}

const formErrorsInitialState: FormErrors = {
  system_name: '',
  type: '',
  hdd_capacity: '',
};

const DeviceModal = ({ isOpen, deviceId, onClose }: DeviceModalProps) => {
  const { formState, handleChange, handleDropdownChange, handleSubmit, clearForm } = useDeviceForm(isOpen ? deviceId : null);
  const [formErrors, setFormErrors] = React.useState<FormErrors>(formErrorsInitialState);

  const handleOnClose = () => {
    setFormErrors(formErrorsInitialState);
    clearForm();
    onClose();
  }

  const handleFormSubmit = async () => {
    const result = await handleSubmit();
    if (result?.status === 'success') {
      setFormErrors(formErrorsInitialState);
      handleOnClose();
    } else if (result?.status === 'formInvalid') {
      setFormErrors(result.errors || formErrorsInitialState);
    } else {
      alert(result.message);
    }
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [event.target.name]: '',
    }));
    handleChange(event);
  };

  const handleChangeDropdown = (selectedValue: any) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      type: '',
    }));
    handleDropdownChange(selectedValue);
  }

  return (
    <Modal
      modalTitle={
        deviceId ? <ModalHeaderText>Edit device</ModalHeaderText> : <ModalHeaderText> Create device</ModalHeaderText>
      }
      isOpen={isOpen}
      onClose={handleOnClose}
      actions={
        <>
          <Button buttonLabel={<ModalButtonText>Cancel</ModalButtonText>} onClick={handleOnClose} buttonType="secondary" />
          <Button
            buttonLabel={<ModalButtonText>Submit</ModalButtonText>}
            onClick={handleFormSubmit}
            buttonType="primary"
          />
        </>
      }
    >
      <DeviceForm formState={formState} formErrors={formErrors} handleChange={handleFieldChange} handleDropdownChange={handleChangeDropdown} />
    </Modal>
  );
};

export default DeviceModal;
