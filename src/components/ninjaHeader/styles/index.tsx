import styled from 'styled-components';
import { NinjaOneLogo } from '../../../assets/svgs';

export const Header = styled.header`
  height: 50px;
  background-color: #002a42;
  display: flex;
  align-items: center;
`;

export const Logo = styled(NinjaOneLogo)`
  margin-left: ${({ theme }) => theme.spacing.xlarge};
`;
