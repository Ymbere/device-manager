import React from 'react';
import DeviceTable from './components/deviceTable/DeviceTable';
import DeviceFilters from './components/devicesFilter/DevicesFilter';
import DevicesHeader from './components/devicesHeader/DevicesHeader';
import styled from 'styled-components';

const StyledPage = styled.div`
  padding: 24px 24px 0 24px;
`;

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
