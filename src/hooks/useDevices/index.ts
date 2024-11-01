import {useQuery} from '@tanstack/react-query';
import { BASE_API_URL } from '../../consts';

export interface Device {
  id: string,
  system_name: string,
  type: string,
  hdd_capacity: string,
}

const fetchDevices = async (): Promise<Array<Device>> => {
  const url = `${BASE_API_URL}/devices`;
  const response = await fetch(url);

  return await response.json();
};

export const useDevices = () => {
  return useQuery<Array<Device>, Error>({
    queryKey: ['devices'],
    queryFn: fetchDevices,
  });
}
