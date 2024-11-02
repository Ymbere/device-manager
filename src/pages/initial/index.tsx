import React from 'react';
import DeviceTable from './components/deviceTable/DeviceTable';
import DeviceFilters from './components/devicesFilter/DevicesFilter';
import DevicesHeader from './components/devicesHeader/DevicesHeader';
import { StyledPage } from './styles';


const InitialPage = () => {
  return (
    <StyledPage>
      <DevicesHeader />

      <DeviceFilters />

      <DeviceTable />
    </StyledPage>
  );
};

export default InitialPage;
