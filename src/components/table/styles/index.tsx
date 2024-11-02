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
        background-color: #F4F4F5;
    }
`;

export const StyledTableCell = styled.td`
    align-items: start;
    border-bottom: 1px solid #E7E8EB;
    display: flex;
    flex-direction: column;
    gap: 4px;
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
    gap: 4px;
    justify-content: space-between;

    & > span {
        font-family: Inter;
        font-size: 14px;
        font-weight: 500;
        line-height: 16.94px;
        text-align: left;
    }
`;

export const StyledTableCellDescription = styled.div`
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    line-height: 14.52px;
    text-align: left;
    color: #6E6D7A;
`;

export const StyledContextMenu = styled.div`
    box-shadow: 0px 2px 4px 0px rgba(33, 31, 51, 0.15);
    padding: 4px;
    position: absolute;
    right: 0;
    width: 120px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #FFFFFF;

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
    background: none;
    border: none;
    cursor: pointer;
    color: ${(props) => (props.color === 'red' ? '#FF0000' : '#000000')};
`;

export const StyledActionContainer = styled.div`
    position: relative;
`;
