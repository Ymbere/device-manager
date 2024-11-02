import React from 'react';
import Dropdown from '../dropdown';
import Input from '../TextInput';
import { DEVICE_TYPES } from '../../consts';
import { StyledForm, StyledFormError, StyledFormGroup } from './styles';
import { FormLabelText } from '../../styles/common';
import { FormErrors } from '../../hooks/useDeviceForm';

interface DeviceFormProps {
  formState: {
    system_name: string;
    type: string;
    hdd_capacity: string;
  };
  formErrors: FormErrors;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDropdownChange: (selectedValues: any) => void;
}

const DeviceForm = ({ formState, handleChange, handleDropdownChange, formErrors }: DeviceFormProps) => {
  return (
    <StyledForm>
      <StyledFormGroup>
        <FormLabelText htmlFor="system_name">System name* </FormLabelText>
        <Input
          type="text"
          id="system_name"
          name="system_name"
          value={formState.system_name}
          onChange={handleChange}
          required
        />
        <StyledFormError>{formErrors.system_name}</StyledFormError>
      </StyledFormGroup>
      <StyledFormGroup>
        <FormLabelText>Device type* </FormLabelText>
        <Dropdown
          dropdownOptions={[
            { value: DEVICE_TYPES.MAC, text: 'Mac Os' },
            { value: DEVICE_TYPES.WINDOWS, text: 'Windows' },
            { value: DEVICE_TYPES.LINUX, text: 'Linux' },
          ]}
          placeholder="Select device type"
          selectedValues={[formState.type]}
          onChange={handleDropdownChange}
        />
        <StyledFormError>{formErrors.type}</StyledFormError>
      </StyledFormGroup>
      <StyledFormGroup>
        <FormLabelText htmlFor="hdd_capacity">HDD Capacity (GB)* </FormLabelText>
        <Input
          type="text"
          id="hdd_capacity"
          name="hdd_capacity"
          value={formState.hdd_capacity}
          onChange={handleChange}
          required
        />
        <StyledFormError>{formErrors.hdd_capacity}</StyledFormError>
      </StyledFormGroup>
    </StyledForm>
  );
};

export default DeviceForm;
