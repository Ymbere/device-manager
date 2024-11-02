import React, { useReducer, useCallback, useMemo } from 'react';
import { DropdownItem } from '../../components/dropdown';
import { Device } from '../useDevices';

interface SetDeviceTypeFilterAction {
    type: 'SET_DEVICE_TYPE_FILTER';
    payload: string[];
}

interface SetDeviceSortingFilterAction {
    type: 'SET_DEVICE_SORTING_FILTER';
    payload: string[];
}

interface SetDeviceSearchFilterAction {
    type: 'SET_DEVICE_SEARCH_FILTER';
    payload: string;
}

interface ClearFiltersAction{
    type: 'CLEAR_FILTERS';
}

type FiltersAction =
    | SetDeviceTypeFilterAction
    | SetDeviceSortingFilterAction
    | SetDeviceSearchFilterAction
    | ClearFiltersAction;

export interface FiltersState {
    deviceTypeFilter: string[];
    deviceSortingFilter: string[];
    deviceSearchFilter: string;
}

const initialState: FiltersState = {
    deviceTypeFilter: [],
    deviceSortingFilter: [],
    deviceSearchFilter: ''
};

const filtersReducer = (state: FiltersState, action: FiltersAction): FiltersState => {
    switch (action.type) {
        case 'SET_DEVICE_TYPE_FILTER':
            return { ...state, deviceTypeFilter: action.payload };
        case 'SET_DEVICE_SORTING_FILTER':
            return { ...state, deviceSortingFilter: action.payload };
        case 'SET_DEVICE_SEARCH_FILTER':
            return { ...state, deviceSearchFilter: action.payload };
        case 'CLEAR_FILTERS':
            return initialState;
        default:
            return state;
    }
};

export const useDeviceFilters = (devices: Device[]) => {
    const [filters, dispatch] = useReducer(filtersReducer, initialState);

    const handleChangeDeviceTypeFilter = useCallback((selectedValues: DropdownItem | DropdownItem[]) => {
        if (Array.isArray(selectedValues)) {
            const newSelectedTypes = selectedValues.map((selectedValue) => selectedValue.value);
            dispatch({ type: 'SET_DEVICE_TYPE_FILTER', payload: newSelectedTypes });
        }
    }, []);

    const handleChangeDeviceSortingFilter = useCallback((selectedValue: DropdownItem | DropdownItem[]) => {
        if (!Array.isArray(selectedValue)) {
            dispatch({ type: 'SET_DEVICE_SORTING_FILTER', payload: [selectedValue.value] });
        }
    }, []);

    const handleSearchFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_DEVICE_SEARCH_FILTER', payload: event.target.value });
    };

    const clearFilters = () => {
        dispatch({ type: 'CLEAR_FILTERS' });
    };

    const filteredDevicesList = useMemo(() => {
        let updatedDevicesList = devices ? [...devices] : [];

        if (filters.deviceSearchFilter.length > 0) {
            updatedDevicesList = updatedDevicesList.filter(device =>
                device.system_name.toLowerCase().includes(filters.deviceSearchFilter.toLowerCase())
            );
        }

        if (filters.deviceTypeFilter.length > 0) {
            updatedDevicesList = updatedDevicesList.filter((device) => filters.deviceTypeFilter.includes(device.type));
        }

        if (filters.deviceSortingFilter.length > 0) {
            const sortTerms = filters.deviceSortingFilter[0].split('-')
            const [key, order] = sortTerms;

            if (key === 'system_name') {
                updatedDevicesList.sort((a, b) => a[key].localeCompare(b[key]));
            } else if (key === 'hdd_capacity') {
                updatedDevicesList.sort((a, b) => a[key] - b[key]);
            }

            if (order === 'DSC') {
                updatedDevicesList.reverse();
            }
        }

        return updatedDevicesList;
    }, [devices, filters]);

    return {
        filters,
        handleChangeDeviceTypeFilter,
        handleChangeDeviceSortingFilter,
        handleSearchFilterChange,
        clearFilters,
        filteredDevicesList
    };
};
