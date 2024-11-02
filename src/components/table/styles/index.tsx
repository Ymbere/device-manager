import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
`;

export const StyledTableHeader = styled.th`
  border-bottom: 1px solid rgba(203, 207, 211, 1);
  padding: 12px 7px;
  text-align: left;
`;

export const StyledTableRow = styled.tr`
  &:hover {
    background-color: #f4f4f5;
  }
`;

export const StyledTableCell = styled.td`
  align-items: start;
  border-bottom: 1px solid #e7e8eb;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
  padding: 12px 9px;
`;

export const StyledTableCellTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const StyledTableCellTitle = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  justify-content: space-between;
`;

export const StyledContextMenu = styled.div`
  box-shadow: 0px 2px 4px 0px rgba(33, 31, 51, 0.15);
  padding: ${({ theme }) => theme.spacing.small};
  position: absolute;
  right: 0;
  top: 24px;
  width: 120px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${({ theme }) => theme.colors.background};

  button {
    height: 30px;
    background: none;
    border: none;
  }
`;

export const StyledEllipsisButton = styled.div`
  cursor: pointer;
`;

export const StyledContextMenuButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: ${({ color, theme }) => (color === 'danger' ? theme.colors.danger : theme.colors.textPrimary)};
`;

export const StyledActionContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};

  &:hover {
    background-color: #e8e8ea;
  }
`;
