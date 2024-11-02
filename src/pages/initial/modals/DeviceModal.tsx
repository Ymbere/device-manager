import Modal from '../../../components/modal';
import Button from '../../../components/button';
import DeviceForm from '../../../components/deviceForm';
import { useDeviceForm } from '../../../hooks/useDeviceForm';

interface DeviceModalProps {
    isOpen: boolean;
    deviceId: string | null;
    onClose: () => void;
}

const DeviceModal = ({ isOpen, deviceId, onClose }: DeviceModalProps) => {
    const {
        formState,
        handleChange,
        handleDropdownChange,
        handleSubmit
    } = useDeviceForm(deviceId);

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
            modalTitle={deviceId ? 'Edit device' : 'Create device'}
            isOpen={isOpen}
            onClose={onClose}
            actions={(
                <>
                    <Button
                        buttonLabel="Cancel"
                        onClick={onClose}
                        buttonType='secondary'
                    />
                    <Button
                        buttonLabel="Submit"
                        onClick={handleFormSubmit}
                        buttonType='primary'
                    />
                </>
            )}
        >
            <DeviceForm
                formState={formState}
                handleChange={handleChange}
                handleDropdownChange={handleDropdownChange}
            />
        </Modal>
    );
};

export default DeviceModal;
