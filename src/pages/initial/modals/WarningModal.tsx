import Modal from "../../../components/modal"
import Button from "../../../components/button"
import { useDeleteDevice } from "../../../hooks/useDeleteDevice";
import { useDeviceDetail } from "../../../hooks/useDeviceDetail";

interface WarningModalProps {
    isOpen: boolean;
    deviceId: string;
    onClose: () => void;
}

const WarningModal = ({ isOpen, deviceId, onClose }: WarningModalProps) => {
    const { mutateAsync: deleteDevice } = useDeleteDevice();
    const { data: deviceToDelete } = useDeviceDetail(deviceId);

    const handleDelete = async () => {
        if (deviceId) {
            await deleteDevice(deviceId);
            onClose();
        }
    }

    return (
        <Modal
            modalTitle="Delete device?"
            isOpen={isOpen}
            onClose={onClose}
            actions={(
                <>
                    <Button
                        buttonLabel="Cancel"
                        onClick={() => onClose()}
                        buttonType='secondary'
                    />
                    <Button
                        buttonLabel="Delete"
                        onClick={() => handleDelete()}
                        buttonType='danger'
                    />
                </>
            )}
        >
            <div>
                You are about to delete the device <strong>{deviceToDelete?.system_name}</strong>. This action cannot be undone.
            </div>
        </Modal>
    )
}

export default WarningModal;
