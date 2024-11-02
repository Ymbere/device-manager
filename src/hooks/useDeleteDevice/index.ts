import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BASE_API_URL } from '../../consts';

const deleteDevice = async (deviceId: string): Promise<void> => {
  const url = `${BASE_API_URL}/devices/${deviceId}`;
  const response = await fetch(url, { method: 'DELETE' });

  return response.json();
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deviceId: string) => deleteDevice(deviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });
};
