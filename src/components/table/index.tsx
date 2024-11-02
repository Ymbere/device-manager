import React from 'react';
import { EllipsisIcon } from '../../assets/svgs';
import DeviceModal from '../../pages/initial/modals/DeviceModal';
import WarningModal from '../../pages/initial/modals/WarningModal';
import {
  StyledContextMenu,
  StyledTable,
  StyledTableCell,
  StyledTableHeader,
  StyledTableRow,
  StyledTableCellTitle,
  StyledTableCellTitleContainer,
  StyledEllipsisButton,
  StyledContextMenuButton,
  StyledActionContainer,
} from './styles';
import useClickOutside from '../../hooks/useClickOutside';
import { ContextMenuText, TableCellDescriptionText, TableCellText, TableHeaderText } from '../../styles/common';

export interface TableRowData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TableProps {
  headerTitle: string;
  tableData: Array<TableRowData>;
}

const CellActionButton = ({ title, id }: { title: TableRowData['title']; id: TableRowData['id'] }) => {
  const [isActionOpen, setIsActionOpen] = React.useState(false);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = React.useState(false);
  const [isDeleteDeviceModalOpen, setIsDeleteDeviceModalOpen] = React.useState(false);

  const contextMenuRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(contextMenuRef, () => setIsActionOpen(false));

  const toggleActionMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setIsActionOpen(!isActionOpen);
  };

  return (
    <StyledActionContainer>
      <StyledEllipsisButton data-testid={`action-${title}`} onClick={(event) => toggleActionMenu(event)}>
        <EllipsisIcon />
      </StyledEllipsisButton>
      {isActionOpen && (
        <StyledContextMenu ref={contextMenuRef}>
          <StyledContextMenuButton onClick={() => setIsDeviceModalOpen(true)}>
            <ContextMenuText>Edit</ContextMenuText>
          </StyledContextMenuButton>
          <StyledContextMenuButton color="danger" onClick={() => setIsDeleteDeviceModalOpen(true)}>
            <ContextMenuText>Delete</ContextMenuText>
          </StyledContextMenuButton>
        </StyledContextMenu>
      )}
      <DeviceModal deviceId={id} isOpen={isDeviceModalOpen} onClose={() => setIsDeviceModalOpen(false)} />
      <WarningModal deviceId={id} isOpen={isDeleteDeviceModalOpen} onClose={() => setIsDeleteDeviceModalOpen(false)} />
    </StyledActionContainer>
  );
};

const TableCellComponent = ({ description, title, icon, id }: TableRowData) => {
  return (
    <StyledTableRow>
      <StyledTableCell>
        <StyledTableCellTitleContainer>
          <StyledTableCellTitle data-testid={title}>
            {icon}
            <TableCellText>{title}</TableCellText>
          </StyledTableCellTitle>
          <CellActionButton title={title} id={id} />
        </StyledTableCellTitleContainer>
        <TableCellDescriptionText>{description}</TableCellDescriptionText>
      </StyledTableCell>
    </StyledTableRow>
  );
};

const TableComponent = ({ headerTitle, tableData }: TableProps) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <StyledTableHeader>
            <TableHeaderText>{headerTitle}</TableHeaderText>
          </StyledTableHeader>
        </tr>
      </thead>
      <tbody>
        {tableData.map((data) => (
          <TableCellComponent key={data.id} {...data} />
        ))}
      </tbody>
    </StyledTable>
  );
};

export default TableComponent;
