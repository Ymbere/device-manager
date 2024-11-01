import React, { InputHTMLAttributes } from 'react';
import { StyledTextBoxContainer, StyledTextBoxInput } from './styles';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  icon?: React.ReactNode;
  width?: string;
}

const TextInput = ({ icon, width, ...props }: TextInputProps) => {
  const hasIcon = !!icon;

  return (
    <StyledTextBoxContainer width={width}>
      {icon}
      <StyledTextBoxInput
        data-testid='searchbox-input'
        $hasIcon={hasIcon}
        {...props}
      />
    </StyledTextBoxContainer>
  );
};

export default TextInput;
