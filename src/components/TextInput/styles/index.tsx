import styled from 'styled-components';
import { BaseContainer } from '../../../styles/common';

export const StyledTextBoxContainer = styled(BaseContainer)<{ width?: string }>`
  display: flex;
  width: ${(props) => props.width || 'auto'};
`;

export const StyledTextBoxInput = styled.input<{ $hasIcon: boolean }>`
  width: 100%;
  border: none;
  padding: 0;
  box-sizing: border-box;
  margin-left: ${(props) => (props.$hasIcon ? props.theme.spacing.medium : '0')};

  &::placeholder {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.large};
    text-align: left;
    color: ${({ theme }) => theme.colors.textTertiary};
  }

  :focus {
    outline: none;
    box-shadow: none;
    border-color: transparent;
  }
`;
