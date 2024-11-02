import React from 'react';
import Button from '../../../../components/button';
import { PlusIcon } from '../../../../assets/svgs';
import DeviceModal from '../../modals/DeviceModal';
import StyledDeviceHeader from "./styles";

const DevicesHeader = () => {
    const [isDeviceModalOpen, setIsDeviceModalOpen] = React.useState(false);

    return (
        <StyledDeviceHeader>
            <span>
                Devices
            </span>
            <Button
                buttonLabel="Add device"
                onClick={() => setIsDeviceModalOpen(true)}
                buttonType='primary'
                iconLeft={<PlusIcon fill="#FFFFFF" />}
            />

            <DeviceModal
                deviceId={null}
                isOpen={isDeviceModalOpen}
                onClose={() => setIsDeviceModalOpen(false)}
            />
        </StyledDeviceHeader>
    );
};

export default DevicesHeader;
