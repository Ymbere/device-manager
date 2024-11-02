import styled from 'styled-components';

const StyledDeviceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

export default StyledDeviceHeader;
