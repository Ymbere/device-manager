import React from 'react';
import styled from 'styled-components';
import {ArrowDownIcon} from "../../assets/svgs";
import {BaseContainer} from "../../styles/common";

export interface DropdownItem {
  value: string;
  text: string;
}

interface DropdownProps {
  values: Array<DropdownItem>
  placeholder: string;
  multiple?: boolean;
  onChange: (value: DropdownItem | Array<DropdownItem>) => void;
  selectedValues: Array<string>;
}

const DropdownContainer = styled(BaseContainer)`
    display: flex;
    justify-content: space-around;
    gap: 16px;
    align-items: center;
    cursor: pointer;
`

const DropdownOptions = styled.ul`
    border: 1px solid rgba(209, 208, 217, 1);
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    li {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 11px 12px 11px 12px;
        padding: 0;
        cursor: pointer;

        &:hover {
            background-color: #f8f9fa;
            color: #333;
            font-weight: bold;

            &::before {
                content: '';
                position: absolute;
                top: -11px;
                left: -12px;
                right: -12px;
                bottom: -11px;
                background-color: inherit;
                z-index: -1;
            }
        }
    }
`;

const SimpleDropdown = ({placeholder, values, selectedValues, onChange}: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedValue = values.find(v => v.value === selectedValues[0]);

  return (
      <div>
        <DropdownContainer
            onClick={() => setIsOpen(!isOpen)}
            data-testid="dropdown-container"
        >
          {placeholder} {selectedValue ? `${selectedValue.text}` : ''}
          <ArrowDownIcon />
        </DropdownContainer>
        {isOpen && (
            <DropdownOptions>
              {values.map((dropdownItem) => (
                  <li
                      key={dropdownItem.value}
                      value={dropdownItem.value}
                      onClick={() => {
                        onChange(dropdownItem);
                        setIsOpen(false);
                      }}
                  >
                    {dropdownItem.text}
                  </li>
              ))}
            </DropdownOptions>
        )}
      </div>
  )
}

const MultipleDropdown = ({placeholder, values, selectedValues, onChange}: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const testHandleClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>, dropdownItem: DropdownItem) => {
    // @ts-ignore
    if (event.target.checked) {
      const dropdownItemOfSelectedValues = selectedValues.reduce((acc: DropdownItem[], selectedValue) => {
        const item = values.find(v => v.value === selectedValue);
        if (item) acc.push(item);
        return acc;
      }, []);

      onChange([...dropdownItemOfSelectedValues, dropdownItem]);
    } else {
      const newSelectedValues = selectedValues.filter((selectedValue) => selectedValue !== dropdownItem.value);

      const dropdownItemOfSelectedValues = newSelectedValues.reduce((acc: DropdownItem[], selectedValue) => {
        const item = values.find(v => v.value === selectedValue);
        if (item) acc.push(item);
        return acc;
      }, []);

      onChange(dropdownItemOfSelectedValues)
    }
  }

  const isDropdownChecked = (dropdownItem: DropdownItem) => {
    return selectedValues.includes(dropdownItem.value);
  }

  const placeholderDetail = () => {
    return selectedValues.reduce((acc: DropdownItem[], selectedValue) => {
      const item = values.find(v => v.value === selectedValue);
      if (item) acc.push(item);
      return acc;
    }, []).map((item) => item.text).join(', ');
  }

  return (
      <div>
        <DropdownContainer
            onClick={() => setIsOpen(!isOpen)}
            data-testid="dropdown-container"
        >
          {placeholder} {placeholderDetail()}
        </DropdownContainer>
        {isOpen && (
            <DropdownOptions>
              {values.map((dropdownItem) => (
                  <li key={dropdownItem.value}>
                    <label>
                      <input
                          type="checkbox"
                          readOnly
                          checked={isDropdownChecked(dropdownItem)}
                          onClick={(event) => testHandleClick(event, dropdownItem)}/>{dropdownItem.text}
                    </label>
                  </li>
              ))}
            </DropdownOptions>
        )}
      </div>
  )

}

const Dropdown = ({values, placeholder, multiple, onChange, selectedValues}: DropdownProps) => {
  if (multiple) {
    return <MultipleDropdown
        values={values}
        placeholder={placeholder}
        multiple={multiple}
        onChange={onChange}
        selectedValues={selectedValues}
    />
  }

  return <SimpleDropdown
      values={values}
      placeholder={placeholder}
      onChange={onChange}
      multiple={multiple}
      selectedValues={selectedValues}
  />
}

export default Dropdown
