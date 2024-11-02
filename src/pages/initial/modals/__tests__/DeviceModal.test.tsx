import React, { act } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import DeviceModal from '../DeviceModal';
import { theme } from '../../../../styles/theme';

describe('DeviceModal', () => {
  const onCloseMock = jest.fn();
  const queryClient = new QueryClient();

  const renderWithProviders = (ui: React.ReactNode) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{ui}</ThemeProvider>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    const mockDeviceDetail = {
      id: '1',
      system_name: 'Device 1',
      type: 'Type A',
      hdd_capacity: '500',
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockDeviceDetail),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly when creating a device', async () => {
    renderWithProviders(<DeviceModal isOpen={true} deviceId={null} onClose={onCloseMock} />);

    await waitFor(() => {
      expect(screen.getByText('Create device')).toBeInTheDocument();
    });

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders correctly when editing a device', () => {
    renderWithProviders(<DeviceModal isOpen={true} deviceId="1" onClose={onCloseMock} />);

    expect(screen.getByText('Edit device')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<DeviceModal isOpen={true} deviceId={null} onClose={onCloseMock} />);

    await act(async () => {
      await user.click(screen.getByText('Cancel'));
    });

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  it('calls handleSubmit and onClose when Submit button is clicked and submission is successful', async () => {
    const user = userEvent.setup();

    renderWithProviders(<DeviceModal isOpen={true} deviceId="1" onClose={onCloseMock} />);

    await waitFor(() => {
      expect(screen.getByText('Edit device')).toBeVisible();
    });

    const systemNameInput = screen.getByLabelText(/System name/i);

    await waitFor(() => {
      expect(systemNameInput).toHaveValue('Device 1');
    });

    await act(async () => {
      await user.click(screen.getByText('Submit'));
    });

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  it('shows alert when submission fails', async () => {
    window.alert = jest.fn();
    const user = userEvent.setup();

    renderWithProviders(<DeviceModal isOpen={true} deviceId={null} onClose={onCloseMock} />);

    await act(async () => {
      await user.click(screen.getByText('Submit'));
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Please fill in all required fields.');
    });
  });
});
