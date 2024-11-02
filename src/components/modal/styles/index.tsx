import styled from 'styled-components';

export const StyledOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

export const StyledModalContainer = styled.div`
    padding: 24px;
    background: white;
    border-radius: 4px;
    max-width: 540px;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 1;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
`;

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  & > span:first-of-type {
    font-size: 24px;
    font-weight: 500;
    line-height: 29.05px;
    text-align: left;
  }
`;

export const StyledModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

export const StyledModalContent = styled.div`
  margin-bottom: 32px;
`;
