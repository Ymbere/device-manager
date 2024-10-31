import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { BaseContainer } from "../../styles/common";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  icon?: React.ReactNode;
}

const TextBoxContainer = styled(BaseContainer)`
    display: flex;
`

const TextBoxInput = styled.input`
    width: 100%;
    border: none;
    padding: 0;
    box-sizing: border-box;
    margin-left: 8px;

    :focus {
        outline: none;
        box-shadow: none;
        border-color: transparent;
    }
`;

const TextInput = ({ icon, ...props }: TextInputProps) => {

  return (
    <TextBoxContainer>
      {icon}
      <TextBoxInput data-testid='searchbox-input' {...props} />
    </TextBoxContainer>
  )

}

export default TextInput;
