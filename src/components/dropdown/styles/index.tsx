import styled from 'styled-components';
import { BaseContainer } from '../../../styles/common';
import { theme } from '../../../styles/theme';

export const StyledDropdownWrapper = styled.div`
  position: relative;
`;

export const StyledDropdownHeader = styled(BaseContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.large};
  cursor: pointer;
`;

export const StyledDropdownList = styled.ul`
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const StyledDropdownListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 11px 12px;
  padding: 0;
  cursor: pointer;
  position: relative;
  z-index: 0;

  &:hover {
    background-color: #f8f9fa;
    color: #333;
    font-weight: bold;

    &::before {
      content: '';
      position: absolute;
      top: -11px;
      right: -12px;
      bottom: -11px;
      left: -12px;
      background-color: inherit;
      z-index: -1;
    }
  }
`;
