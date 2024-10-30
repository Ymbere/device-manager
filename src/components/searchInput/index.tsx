import React from 'react';
import styled from 'styled-components';
import {SearchIcon} from "../../assets/svgs";
import {BaseContainer} from "../../styles/common";

interface SearchInputProps {
  placeholder: string;
  onChange: (value: string) => void;
  value?: string;
}

const SearchBoxContainer = styled(BaseContainer)`
    display: flex;
`

const SearchBoxInput = styled.input`
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

const SearchInput = ({placeholder, onChange, value}: SearchInputProps) => {
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange(e.target.value);
  };

  return (
      <SearchBoxContainer>
        <SearchIcon/>
        <SearchBoxInput data-testid='searchbox-input' onChange={handleChangeInput} placeholder={placeholder} value={value}/>
      </SearchBoxContainer>
  )

}

export default SearchInput;
