import Modal from '../../../components/modal';
import Button from '../../../components/button';
import DeviceForm from '../../../components/deviceForm';
import { useDeviceForm } from '../../../hooks/useDeviceForm';
import { ModalButtonText, ModalHeaderText } from '../../../styles/common';

interface DeviceModalProps {
  isOpen: boolean;
  deviceId: string | null;
  onClose: () => void;
}

const DeviceModal = ({ isOpen, deviceId, onClose }: DeviceModalProps) => {
  const { formState, handleChange, handleDropdownChange, handleSubmit } = useDeviceForm(deviceId);

  const handleFormSubmit = async () => {
    const result = await handleSubmit();
    if (result.status === 'success') {
      onClose();
    } else {
      alert(result.message);
    }
  };

  return (
    <Modal
      modalTitle={
        deviceId ? <ModalHeaderText>Edit device</ModalHeaderText> : <ModalHeaderText> Create device</ModalHeaderText>
      }
      isOpen={isOpen}
      onClose={onClose}
      actions={
        <>
          <Button buttonLabel={<ModalButtonText>Cancel</ModalButtonText>} onClick={onClose} buttonType="secondary" />
          <Button
            buttonLabel={<ModalButtonText>Submit</ModalButtonText>}
            onClick={handleFormSubmit}
            buttonType="primary"
          />
        </>
      }
    >
      <DeviceForm formState={formState} handleChange={handleChange} handleDropdownChange={handleDropdownChange} />
    </Modal>
  );
};

export default DeviceModal;
