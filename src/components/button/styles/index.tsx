import styled, { css } from 'styled-components';

export const StyledButton = styled.button<{ $buttonType: 'primary' | 'secondary' | 'danger' | 'accessory' }>`
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    color: white;
    cursor: pointer;

    ${props => props.$buttonType === 'primary' && css`
        background: rgba(51, 122, 183, 1);
        color: rgba(255, 255, 255, 1);
    `}

    ${props => props.$buttonType === 'secondary' && css`
        background: rgba(255, 255, 255, 1);
        color: rgba(51, 122, 183, 1);
        border: 1px solid rgba(72, 68, 105, 0.25);
    `}

    ${props => props.$buttonType === 'danger' && css`
        background: rgba(213, 57, 72, 1);
        color: rgba(255, 255, 255, 1);
    `}

    ${props => props.$buttonType === 'accessory' && css`
        background: rgba(255, 255, 255, 1);
        color: rgba(33, 31, 51, 1);
        border: 1px solid rgba(72, 68, 105, 0.25);
    `}
`
