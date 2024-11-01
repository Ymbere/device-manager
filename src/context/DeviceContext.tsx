import React from 'react';
import { useDevices } from '../hooks/useDevices';
import { FiltersState, useDeviceFilters } from '../hooks/useDevicesFilter';
import { useTableRows } from '../hooks/useTableRows';
import { TableRowData } from '../components/table';
import { DropdownItem } from '../components/dropdown';

interface DeviceContextType {
    tableRows: TableRowData[];
    filters: FiltersState;
    handleSearchFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeDeviceSortingFilter: (selectedValue: DropdownItem | DropdownItem[]) => void;
    handleChangeDeviceTypeFilter: (selectedValues: DropdownItem | DropdownItem[]) => void;
}

const DeviceContext = React.createContext<DeviceContextType | undefined>(undefined);

interface DeviceProviderProps {
    children: React.ReactNode;
}

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
    const { data: devices } = useDevices();

    const {
        filteredDevicesList,
        filters,
        handleSearchFilterChange,
        handleChangeDeviceSortingFilter,
        handleChangeDeviceTypeFilter
    } = useDeviceFilters(devices ?? []);

    const tableRows = useTableRows(filteredDevicesList);

    return (
        <DeviceContext.Provider
            value={{
                tableRows,
                filters,
                handleSearchFilterChange,
                handleChangeDeviceSortingFilter,
                handleChangeDeviceTypeFilter
            }}
        >
            {children}
        </DeviceContext.Provider>
    );

}

export const useDeviceContext = () => {
    const context = React.useContext(DeviceContext);
    if (context === undefined) {
        throw new Error('useDeviceContext must be used within a DeviceProvider');
    }
    return context;
}
