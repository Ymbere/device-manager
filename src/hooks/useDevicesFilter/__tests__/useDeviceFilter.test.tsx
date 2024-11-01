import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useDeviceFilters } from '../index';
import { Device } from '../../useDevices';
import { DropdownItem } from '../../../components/dropdown';

const mockDevices: Device[] = [
    { id: '1', system_name: 'Device A', type: 'WINDOWS_WORKSTATION', hdd_capacity: 500 },
    { id: '2', system_name: 'Device B', type: 'MAC', hdd_capacity: 250 },
    { id: '3', system_name: 'Device C', type: 'WINDOWS_SERVER', hdd_capacity: 1000 },
];

describe('useDeviceFilters', () => {
    it('should filter devices by search term', () => {
        const { result } = renderHook(() => useDeviceFilters(mockDevices));

        act(() => {
            result.current.handleSearchFilterChange({ target: { value: 'Device A' } } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.filteredDevicesList).toEqual([mockDevices[0]]);
    });

    it('should filter devices by type', () => {
        const { result } = renderHook(() => useDeviceFilters(mockDevices));

        act(() => {
            result.current.handleChangeDeviceTypeFilter([{ value: 'MAC' }] as DropdownItem[]);
        });

        expect(result.current.filteredDevicesList).toEqual([mockDevices[1]]);
    });

    it('should sort devices by system name in ascending order', () => {
        const { result } = renderHook(() => useDeviceFilters(mockDevices));

        act(() => {
            result.current.handleChangeDeviceSortingFilter({ value: 'system_name-ASC' } as DropdownItem);
        });

        expect(result.current.filteredDevicesList).toEqual([mockDevices[0], mockDevices[1], mockDevices[2]]);
    });

    it('should sort devices by hdd capacity in descending order', () => {
        const { result } = renderHook(() => useDeviceFilters(mockDevices));

        act(() => {
            result.current.handleChangeDeviceSortingFilter({ value: 'hdd_capacity-DSC' } as DropdownItem);
        });

        expect(result.current.filteredDevicesList).toEqual([mockDevices[2], mockDevices[0], mockDevices[1]]);
    });
});
