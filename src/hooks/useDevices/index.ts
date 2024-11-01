import {useQuery} from '@tanstack/react-query';
import { BASE_API_URL } from '../../consts';

export interface Device {
  id: string,
  system_name: string,
  type: string,
  hdd_capacity: number,
}

const fetchDevices = async (): Promise<Array<Device>> => {
  const url = `${BASE_API_URL}/devices`;
  const response = await fetch(url);

  const devices:Device[] = await response.json();

  return devices.map(device => ({
    ...device,
    hdd_capacity: Number(device.hdd_capacity)
  }));
}

export const useDevices = () => {
  return useQuery<Array<Device>, Error>({
    queryKey: ['devices'],
    queryFn: fetchDevices,
  });
}
