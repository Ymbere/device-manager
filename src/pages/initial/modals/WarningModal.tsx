import Modal from "../../../components/modal"
import Button from "../../../components/button"
import { useDeleteDevice } from "../../../hooks/useDeleteDevice";
import { useDeviceDetail } from "../../../hooks/useDeviceDetail";
import { ModalButtonText, ModalHeaderText } from "../../../styles/common";

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
            modalTitle={(<ModalHeaderText>Delete device?</ModalHeaderText>)}
            isOpen={isOpen}
            onClose={onClose}
            actions={(
                <>
                    <Button
                        buttonLabel={(<ModalButtonText>Cancel</ModalButtonText>)}
                        onClick={() => onClose()}
                        buttonType='accessory'
                    />
                    <Button
                        buttonLabel={(<ModalButtonText>Delete</ModalButtonText>)}
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
