import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components';
import { DEVICE_TYPES } from '../../../consts';
import DeviceForm from '..';
import { theme } from '../../../styles/theme';

const mockHandleChange = jest.fn();
const mockHandleDropdownChange = jest.fn();

const initialFormState = {
  system_name: '',
  type: '',
  hdd_capacity: '',
};

const initialFormErrors = {
  system_name: '',
  type: '',
  hdd_capacity: '',
}

const filledFormState = {
  system_name: 'Test Device',
  type: DEVICE_TYPES.MAC,
  hdd_capacity: '500',
};

const renderDeviceForm = (formState) => {
  return render(
    <ThemeProvider theme={theme}>
      <DeviceForm
        formState={formState}
        handleChange={mockHandleChange}
        handleDropdownChange={mockHandleDropdownChange}
        formErrors={initialFormErrors}
      />
    </ThemeProvider>
  );
};

describe('DeviceForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with initial state', () => {
    renderDeviceForm(initialFormState);

    expect(screen.getByLabelText(/System name/i)).toHaveValue('');
    expect(screen.getByText(/Select device type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/HDD Capacity/i)).toHaveValue('');
  });

  it('renders the form with filled state', () => {
    renderDeviceForm(filledFormState);

    expect(screen.getByLabelText(/System name/i)).toHaveValue('Test Device');
    expect(screen.getByText(/Mac Os/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/HDD Capacity/i)).toHaveValue('500');
  });

  it('calls handleChange on input change', async () => {
    const user = userEvent.setup();

    renderDeviceForm(initialFormState);

    await user.type(screen.getByLabelText(/System name/i), 'New Device');

    await waitFor(() => {
      const event = mockHandleChange.mock.lastCall[0];
      expect(event.target.name).toBe('system_name');
    });

    await user.type(screen.getByLabelText(/HDD Capacity/i), '1000');
    await waitFor(() => {
      const event = mockHandleChange.mock.lastCall[0];
      expect(event.target.name).toBe('hdd_capacity');
    });
  });

  it('calls handleDropdownChange on dropdown change', async () => {
    const user = userEvent.setup();

    renderDeviceForm(initialFormState);

    act(() => {
      user.click(screen.getByTestId('dropdown-container'));
    });

    await waitFor(() => {
      expect(screen.getByText(/Mac Os/i)).toBeVisible();
    });

    const firstDropdownOption = screen.getByText(/Mac Os/i);

    act(() => {
      user.click(firstDropdownOption);
    });

    await waitFor(() => {
      expect(firstDropdownOption).not.toBeVisible();
    });

    expect(mockHandleDropdownChange).toHaveBeenCalledTimes(1);
  });
});
