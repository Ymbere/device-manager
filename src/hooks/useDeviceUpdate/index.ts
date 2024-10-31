import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Device} from "../useDevices";

const updateDevice = async (device: Device): Promise<void> => {
  const url = `https://localhost:3001/devices/${device.id}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(device)
  });

  return response.json();
}

export const useDeviceUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (device: Device) => updateDevice(device),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['devices']})
    }
  })
}
