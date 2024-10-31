import {useQuery} from '@tanstack/react-query';

export interface Device {
  id: string,
  system_name: string,
  type: string,
  hdd_capacity: string,
}

const fetchDevices = async (): Promise<Array<Device>> => {
  const url = 'https://localhost:3001/devices';
  const response = await fetch(url);

  return await response.json();
};

export const useDevices = () => {
  return useQuery<Array<Device>, Error>({
    queryKey: ['devices'],
    queryFn: fetchDevices,
  });
}
