import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Device } from '../useDevices';
import { BASE_API_URL } from '../../consts';
export interface DevicePayload extends Omit<Device, 'hdd_capacity'> {
  hdd_capacity: string;
}

const updateDevice = async (device: DevicePayload): Promise<void> => {
  const url = `${BASE_API_URL}/devices/${device.id}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(device),
  });

  return response.json();
};

export const useDeviceUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (device: DevicePayload) => updateDevice(device),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};
