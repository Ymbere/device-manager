import styled from 'styled-components';

export const StyledOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.overlay};
    z-index: 1;
`;

export const StyledModalContainer = styled.div`
    padding: ${({ theme }) => theme.spacing.xlarge};
    background: white;
    border-radius: ${({ theme }) => theme.borderRadius};
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
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

export const StyledModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.spacing.medium};
`;

export const StyledModalContent = styled.div`
  margin-bottom: 32px;
`;
