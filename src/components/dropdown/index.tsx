import React from 'react';
import { StyledDropdownWrapper, StyledDropdownHeader, StyledDropdownList, StyledDropdownListItem, StyledDropdownPlaceHolder } from './styles';
import { ArrowDownIcon } from '../../assets/svgs';
import useClickOutside from '../../hooks/useClickOutside';

export interface DropdownItem {
  value: string;
  text: string;
}

interface DropdownProps {
  dropdownOptions: Array<DropdownItem>;
  placeholder?: string;
  infoLabel?: string;
  multiple?: boolean;
  onChange: (value: DropdownItem | Array<DropdownItem>) => void;
  selectedValues: Array<string>;
}

interface DropdownPlaceholderProps {
  infoLabel?: string;
  placeholder?: string;
  selectedValues: Array<string>;
  dropdownOptions: Array<DropdownItem>;
}

const DropdownPlaceholder = ({ infoLabel, placeholder, selectedValues, dropdownOptions }: DropdownPlaceholderProps) => {
  const placeholderDetail = selectedValues
    .map(selectedValue => dropdownOptions.find(dropdownOption => dropdownOption.value === selectedValue)?.text)
    .filter(Boolean)
    .join(', ');

  if (infoLabel) {
    return <span>{infoLabel} {placeholderDetail}</span>;
  }

  if (placeholder && !placeholderDetail) {
    return <StyledDropdownPlaceHolder>{placeholder}</StyledDropdownPlaceHolder>;
  }

  return <span>{placeholderDetail}</span>;
};

const SimpleDropdown = ({ placeholder, dropdownOptions, selectedValues, onChange, infoLabel }: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <StyledDropdownWrapper ref={dropdownRef}>
      <StyledDropdownHeader onClick={() => setIsOpen(!isOpen)} data-testid="dropdown-container">
        <DropdownPlaceholder infoLabel={infoLabel} placeholder={placeholder} selectedValues={selectedValues} dropdownOptions={dropdownOptions} />
        <ArrowDownIcon />
      </StyledDropdownHeader>
      {isOpen && (
        <StyledDropdownList>
          {dropdownOptions.map(dropdownOption => (
            <StyledDropdownListItem key={dropdownOption.value} onClick={() => { onChange(dropdownOption); setIsOpen(false); }}>
              {dropdownOption.text}
            </StyledDropdownListItem>
          ))}
        </StyledDropdownList>
      )}
    </StyledDropdownWrapper>
  );
};

const MultipleDropdown = ({ placeholder, dropdownOptions, selectedValues, onChange, infoLabel }: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleClick = (event: React.MouseEvent<HTMLInputElement>, dropdownItem: DropdownItem) => {
    const newSelectedValues = event.currentTarget.checked
      ? [...selectedValues, dropdownItem.value]
      : selectedValues.filter(value => value !== dropdownItem.value);

    const updatedItems = newSelectedValues.map(selectedValue => dropdownOptions.find(dropdownOption => dropdownOption.value === selectedValue)).filter(Boolean) as DropdownItem[];
    onChange(updatedItems);
  };

  return (
    <StyledDropdownWrapper ref={dropdownRef}>
      <StyledDropdownHeader onClick={() => setIsOpen(!isOpen)} data-testid="dropdown-container">
        <DropdownPlaceholder infoLabel={infoLabel} placeholder={placeholder} selectedValues={selectedValues} dropdownOptions={dropdownOptions} />
        <ArrowDownIcon />
      </StyledDropdownHeader>
      {isOpen && (
        <StyledDropdownList>
          {dropdownOptions.map(dropdownItem => (
            <StyledDropdownListItem key={dropdownItem.value}>
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={selectedValues.includes(dropdownItem.value)}
                  onClick={event => handleClick(event, dropdownItem)}
                />
                {dropdownItem.text}
              </label>
            </StyledDropdownListItem>
          ))}
        </StyledDropdownList>
      )}
    </StyledDropdownWrapper>
  );
};

const Dropdown = ({ dropdownOptions, placeholder, multiple, onChange, selectedValues, infoLabel }: DropdownProps) => {
  return multiple ? (
    <MultipleDropdown dropdownOptions={dropdownOptions} placeholder={placeholder} onChange={onChange} selectedValues={selectedValues} infoLabel={infoLabel} />
  ) : (
    <SimpleDropdown dropdownOptions={dropdownOptions} placeholder={placeholder} onChange={onChange} selectedValues={selectedValues} infoLabel={infoLabel} />
  );
};

export default Dropdown;
