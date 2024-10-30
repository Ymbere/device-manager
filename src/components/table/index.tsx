import React from "react";
import styled from 'styled-components';
import {EllipsisIcon} from "../../assets/svgs";

interface TableRow {
  title: string;
  description: string;
  icon: React.ReactNode;
  rowMenu: Array<{
    text: string;
    color: string;
    onClick: () => void;
  }>
}

interface TableProps {
  headerTitle: string;
  tableData: Array<TableRow>
}

const TableContainer = styled.table`
    width: 100%;
`

const TableHeaderContainer = styled.th`
    text-align: left;
    border-bottom: 1px solid rgba(203, 207, 211, 1);
    padding: 12px 7px
`

const TableDataContainer = styled.td`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: start;
    padding: 12px 9px;
    border-bottom: 1px solid rgba(203, 207, 211, 1);
`

const TableDataTitleContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const TableDataTitle = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 4px;
    align-items: center;
`

const ContextMenuContainer = styled.div`
    position: absolute;
    padding: 5px;
    z-index: 1000;
    box-shadow: 0px 2px 4px 0px rgba(33, 31, 51, 0.15);

    button {
        border: none;
        background: none;
    }
`

const RenderCellActionButton = ({rowMenu, title}: { rowMenu: TableRow['rowMenu'], title: TableRow['title'] }) => {
  const [isActionOpen, setIsActionOpen] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState({x: 0, y: 0});

  const testClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.preventDefault();
    setIsActionOpen(!isActionOpen);
    setMenuPosition({
      x: event.clientX - 55,
      y: event.clientY + 10,
    });
  }

  if (rowMenu.length > 0) {
    return (
        <>
          <EllipsisIcon data-testid={`action-${title}`} onClick={(event) => testClick(event)}/>
          {isActionOpen && (
              <ContextMenuContainer
                  style={{
                    left: `${menuPosition.x}px`,
                    top: `${menuPosition.y}px`
                  }}
              >
                {rowMenu.map((menu) => (
                    <button style={{ color: menu.color }} onClick={menu.onClick}>
                      {menu.text}
                    </button>
                ))}
              </ContextMenuContainer>
          )}
        </>
    )
  }

  return null;
}

const TableCell = ({description, title, icon, rowMenu}: TableRow) => {
  return (
      <tr>
        <TableDataContainer>
          <TableDataTitleContainer>
            <TableDataTitle
                data-testid={title}
            >
              {icon}
              {title}
            </TableDataTitle>
            <RenderCellActionButton title={title} rowMenu={rowMenu}/>
          </TableDataTitleContainer>
          <div>
            {description}
          </div>
        </TableDataContainer>
      </tr>
  )
};

const Table = ({headerTitle, tableData}: TableProps) => {
  return (
      <TableContainer>
        <tr>
          <TableHeaderContainer>{headerTitle}</TableHeaderContainer>
        </tr>
        {tableData.map((data) => (
            <TableCell key={data.description} {...data} />
        ))}
      </TableContainer>
  )
}

export default Table;
