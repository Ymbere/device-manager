import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteDevice = async (deviceId: string): Promise<void> => {
  const url = `https://localhost:3001/devices/${deviceId}`;
  const response = await fetch(url, { method: 'DELETE'});

  return response.json();
}

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deviceId: string) => deleteDevice(deviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices']})
    }
  })
}
