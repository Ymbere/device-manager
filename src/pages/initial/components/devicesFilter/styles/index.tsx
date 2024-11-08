import styled from 'styled-components';

export const DevicesFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledFilters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const StyledReloadIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;
