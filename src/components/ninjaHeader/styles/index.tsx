import styled from 'styled-components';
import { NinjaOneLogo } from '../../../assets/svgs';

export const Header = styled.header`
    height: 50px;
    background-color: #002A42;
    display: flex;
    align-items: center;
`;

export const Logo = styled(NinjaOneLogo)`
    mmargin-left: ${({ theme }) => theme.spacing.xlarge};
`;
