import React from 'react';
import SearchInput from '../../../../components/TextInput';
import Dropdown from '../../../../components/dropdown';
import { DEVICE_TYPES } from '../../../../consts';
import { ReloadIcon, SearchIcon } from '../../../../assets/svgs';
import { useDeviceContext } from '../../../../context/DeviceContext';
import { DevicesFilterContainer, StyledReloadIcon, StyledFilters } from './styles';

const DeviceFilters = () => {
    const {
        filters,
        handleSearchFilterChange,
        handleChangeDeviceTypeFilter,
        handleChangeDeviceSortingFilter,
        clearFilters,
    } = useDeviceContext();

    return (
        <DevicesFilterContainer>
            <StyledFilters>
                <SearchInput
                    placeholder="Search"
                    onChange={handleSearchFilterChange}
                    value={filters.deviceSearchFilter}
                    icon={<SearchIcon />}
                    width="270px"
                />
                <Dropdown
                    dropdownOptions={[
                        { value: DEVICE_TYPES.MAC, text: 'Mac Os' },
                        { value: DEVICE_TYPES.WINDOWS, text: 'Windows' },
                        { value: DEVICE_TYPES.LINUX, text: 'Linux' }
                    ]}
                    multiple
                    infoLabel="Device Type: "
                    onChange={handleChangeDeviceTypeFilter}
                    selectedValues={filters.deviceTypeFilter}
                />
                <Dropdown
                    dropdownOptions={[
                        { value: 'hdd_capacity-ASC', text: 'HDD Capacity (Ascending)' },
                        { value: 'hdd_capacity-DSC', text: 'HDD Capacity (Descending)' },
                        { value: 'system_name-ASC', text: 'Name (Ascending)' },
                        { value: 'system_name-DSC', text: 'Name (Descending)' }
                    ]}
                    infoLabel="Sort by: "
                    onChange={handleChangeDeviceSortingFilter}
                    selectedValues={filters.deviceSortingFilter}
                />
            </StyledFilters>


            <StyledReloadIcon onClick={clearFilters}>
                <ReloadIcon />
            </StyledReloadIcon>

        </DevicesFilterContainer>
    );
};

export default DeviceFilters;
