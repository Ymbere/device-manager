import React from 'react';

import Table from '../../../../components/table';
import { useDeviceContext } from '../../../../context/DeviceContext';

const DeviceTable = () => {
  const { tableRows } = useDeviceContext();

  return <Table headerTitle="Devices" tableData={tableRows} />;
};

export default DeviceTable;
