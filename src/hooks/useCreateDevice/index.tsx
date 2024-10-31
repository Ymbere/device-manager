import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Device} from "../useDevices";

const createDevice = async (device: Omit<Device, 'id'>): Promise<void> => {
  const url = `https://localhost:3001/devices`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(device)
  });

  return response.json();
}

export const useCreateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (device: Omit<Device, 'id'>) => createDevice(device),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['devices']})
    }
  })
}
