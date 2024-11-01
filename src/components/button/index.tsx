import { StyledButton } from './styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonLabel: string;
  iconLeft?: React.ReactNode;
  buttonType: 'primary' | 'secondary' | 'danger' | 'accessory';
}

const Button = ({ buttonLabel, buttonType, onClick, iconLeft }: ButtonProps) => {
  return (
      <StyledButton
          onClick={onClick}
          $buttonType={buttonType}
      >
        {iconLeft}
        {buttonLabel}
      </StyledButton>
  )
}

export default Button;
