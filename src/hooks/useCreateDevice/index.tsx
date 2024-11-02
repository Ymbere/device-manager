import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DevicePayload } from '../useDeviceUpdate';
import { BASE_API_URL } from '../../consts';

const createDevice = async (device: Omit<DevicePayload, 'id'>): Promise<void> => {
  const url = `${BASE_API_URL}/devices`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(device),
  });

  return response.json();
};

export const useCreateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (device: Omit<DevicePayload, 'id'>) => createDevice(device),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};
