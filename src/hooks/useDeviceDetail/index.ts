import {useQuery} from '@tanstack/react-query';
import {Device} from "../useDevices";

const fetchDeviceDetail = async (deviceId: string): Promise<Device> => {
  const url = `https://localhost:3001/devices/${deviceId}`;
  const response = await fetch(url);

  return await response.json();
};

export const useDeviceDetail = (deviceId: string) => {
  return useQuery<Device>({
    queryKey: ['device',deviceId],
    queryFn: () => fetchDeviceDetail(deviceId),
  })
}
