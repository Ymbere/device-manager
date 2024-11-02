import React from 'react';
import Button from '../../../../components/button';
import { PlusIcon } from '../../../../assets/svgs';
import DeviceModal from '../../modals/DeviceModal';
import StyledDeviceHeader from "./styles";
import { ButtonText, HeaderText } from '../../../../styles/common';

const DevicesHeader = () => {
    const [isDeviceModalOpen, setIsDeviceModalOpen] = React.useState(false);

    return (
        <StyledDeviceHeader>
            <HeaderText>
                Devices
            </HeaderText>
            <Button
                buttonLabel={(<ButtonText>Add Device</ButtonText>)}
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
