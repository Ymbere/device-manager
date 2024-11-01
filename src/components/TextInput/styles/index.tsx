import styled from 'styled-components';
import { BaseContainer } from '../../../styles/common';

export const StyledTextBoxContainer = styled(BaseContainer)<{ width?: string }>`
    display: flex;
    width: ${props => props.width || 'auto'};
`;

export const StyledTextBoxInput = styled.input<{ $hasIcon: boolean }>`
    width: 100%;
    border: none;
    padding: 0;
    box-sizing: border-box;
    margin-left: ${props => props.$hasIcon ? '8px' : '0'};

    :focus {
        outline: none;
        box-shadow: none;
        border-color: transparent;
    }
`;
