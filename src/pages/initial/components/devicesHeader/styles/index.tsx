import styled from 'styled-components';

const StyledDeviceHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    & > span {
        font-family: Inter;
        font-size: 20px;
        font-weight: 500;
        line-height: 24.2px;
        text-align: left;
        color: #211F33;
    }
`;

export default StyledDeviceHeader;
