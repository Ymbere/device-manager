import styled from 'styled-components';

export const BaseContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const Button = styled.button<{
  buttonType: 'primary' | 'secondary' | 'danger' | 'accessory';
}>`
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.large};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;

  ${({ buttonType, theme }) =>
    buttonType === 'primary' &&
    `
    background: ${theme.colors.primary};
    color: ${theme.colors.secondary};
  `}

  ${({ buttonType, theme }) =>
    buttonType === 'secondary' &&
    `
    background: ${theme.colors.secondary};
    color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.border};
  `}

  ${({ buttonType, theme }) =>
    buttonType === 'danger' &&
    `
    background: ${theme.colors.danger};
    color: ${theme.colors.secondary};
  `}

  ${({ buttonType, theme }) =>
    buttonType === 'accessory' &&
    `
    background: ${theme.colors.accessory};
    color: ${theme.colors.textPrimary};
    border: 1px solid ${theme.colors.border};
  `}
`;

export const HeaderText = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.xlarge};
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ButtonText = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.small};
  text-align: left;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const PlaceholderText = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.medium};
  text-align: left;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TableHeaderText = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.medium};
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const TableCellText = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.xmedium};
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const TableCellDescriptionText = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.small};
  text-align: left;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ContextMenuText = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.large};
  text-align: left;
`;

export const ModalHeaderText = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.xxlarge};
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const FormLabelText = styled.label`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.large};
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const DropdownPlaceholderText = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.medium};
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ModalButtonText = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.small};
  text-align: left;
`;
