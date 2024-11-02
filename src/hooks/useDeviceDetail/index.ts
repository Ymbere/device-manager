import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {Device} from "../useDevices";
import { BASE_API_URL } from '../../consts';

const fetchDeviceDetail = async (deviceId: string): Promise<Device> => {
  const url = `${BASE_API_URL}/devices/${deviceId}`;
  const response = await fetch(url);

  return await response.json();
};

type DeviceDetailQueryOptions = Omit<UseQueryOptions<Device>, 'queryKey'>

export const useDeviceDetail = (deviceId: string, options?: DeviceDetailQueryOptions) => {
  return useQuery<Device>({
    queryKey: ['device', deviceId],
    queryFn: () => fetchDeviceDetail(deviceId),
    ...options,
  })
}
