import { useMemo } from 'react';
import { capitalizeFirstLatter } from '../../utils/wordFormatter';
import { getIconBasedOnSystem } from '../../utils/iconUtils';
import { Device } from '../useDevices';
import { TableRowData } from '../../components/table';

export const useTableRows = (devices: Device[]): TableRowData[]  => {
  return useMemo(() => {
    return devices.map((device) => ({
      id: device.id,
      title: device.system_name,
      description: `${capitalizeFirstLatter(device.type)} workstation - ${device.hdd_capacity} GB`,
      icon: getIconBasedOnSystem(device.type),
    }));
  }, [devices]);
};
