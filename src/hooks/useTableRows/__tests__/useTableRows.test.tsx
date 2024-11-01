import { renderHook } from '@testing-library/react';
import { useTableRows } from '../index';
import { Device } from '../../useDevices';
import * as iconUtils from '../../../utils/iconUtils';

jest.mock('../../../utils/iconUtils', () => ({
  getIconBasedOnSystem: jest.fn(),
}));

describe('useTableRows', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return formatted table row data', () => {
    const devices: Device[] = [
      { id: '1', system_name: 'Device 1', type: 'windows', hdd_capacity: 500 },
      { id: '2', system_name: 'Device 2', type: 'mac', hdd_capacity: 256 },
    ];

    (iconUtils.getIconBasedOnSystem as jest.Mock).mockImplementation((system) => `icon-${system}`);

    const { result } = renderHook(() => useTableRows(devices));

    expect(result.current).toEqual([
      {
        id: '1',
        title: 'Device 1',
        description: 'Windows workstation - 500 GB',
        icon: 'icon-windows',
      },
      {
        id: '2',
        title: 'Device 2',
        description: 'Mac workstation - 256 GB',
        icon: 'icon-mac',
      },
    ]);
  });

  it('should return an empty array when no devices are provided', () => {
    const devices: Device[] = [];

    const { result } = renderHook(() => useTableRows(devices));

    expect(result.current).toEqual([]);
  });
});
