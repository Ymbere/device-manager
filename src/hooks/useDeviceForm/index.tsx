import React from 'react';
import { useDeviceDetail } from '../useDeviceDetail';
import { useDeviceUpdate } from '../useDeviceUpdate';
import { useCreateDevice } from '../useCreateDevice';

const initialFormState = {
    system_name: '',
    type: '',
    hdd_capacity: ''
};

export const useDeviceForm = (deviceId?: string | null) => {
    const { data: deviceDetail } = useDeviceDetail(
        deviceId ? deviceId : '',
        { enabled: !!deviceId }
    );

    const { mutateAsync: updateDevice } = useDeviceUpdate();
    const { mutateAsync: createDevice } = useCreateDevice();

    const [formState, setFormState] = React.useState(initialFormState);

    React.useEffect(() => {
        if (deviceDetail) {
            setFormState(
                {
                    system_name: deviceDetail.system_name,
                    type: deviceDetail.type,
                    hdd_capacity: String(deviceDetail.hdd_capacity)
                }
            )
        }

    }, [deviceDetail])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDropdownChange = (selectedValues: any) => {
        setFormState(prevState => ({
            ...prevState,
            type: !Array.isArray(selectedValues) ? selectedValues.value : ''
        }));
    };

    const handleSubmit = async () => {
        const { system_name, type, hdd_capacity } = formState;
        if (!system_name || !type || !hdd_capacity) {
            alert('Please fill in all required fields.');
            return { status: 'error', message: 'Please fill in all required fields.' };
        }
        try {
            if (deviceId) {
                await updateDevice({ id: deviceId, ...formState });
            } else {
                await createDevice(formState);
            }
            return { status: 'success' };
        } catch (error: any) {
            return { status: 'error', message: error.message };
        }
    };

    return {
        formState,
        handleChange,
        handleDropdownChange,
        handleSubmit
    };
};
