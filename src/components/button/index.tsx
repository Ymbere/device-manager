import { Button } from '../../styles/common';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonLabel: string | React.ReactNode;
  iconLeft?: React.ReactNode;
  buttonType: 'primary' | 'secondary' | 'danger' | 'accessory';
}

const ButtonComponent = ({ buttonLabel, buttonType, onClick, iconLeft }: ButtonProps) => {
  return (
    <Button onClick={onClick} buttonType={buttonType}>
      {iconLeft}
      {buttonLabel}
    </Button>
  );
}

export default ButtonComponent;
