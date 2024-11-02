import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useDeviceForm } from '../index';
import { useDeviceDetail } from '../../useDeviceDetail';
import { useDeviceUpdate } from '../../useDeviceUpdate';
import { useCreateDevice } from '../../useCreateDevice';

jest.mock('../../useDeviceDetail');
jest.mock('../../useDeviceUpdate');
jest.mock('../../useCreateDevice');

describe('useDeviceForm', () => {
  const mockDeviceDetail = {
    system_name: 'Test Device',
    type: 'Windows',
    hdd_capacity: '500',
  };

  beforeEach(() => {
    (useDeviceDetail as jest.Mock).mockReturnValue({ data: mockDeviceDetail });
    (useDeviceUpdate as jest.Mock).mockReturnValue({ mutateAsync: jest.fn() });
    (useCreateDevice as jest.Mock).mockReturnValue({ mutateAsync: jest.fn() });
  });

  it('should initialize form state correctly', () => {
    const { result } = renderHook(() => useDeviceForm('1'));
    expect(result.current.formState).toEqual({
      system_name: 'Test Device',
      type: 'Windows',
      hdd_capacity: '500',
    });
  });

  it('should update form state on handleChange', () => {
    const { result } = renderHook(() => useDeviceForm('1'));
    act(() => {
      result.current.handleChange({
        target: {
          name: 'system_name',
          value: 'Updated Device',
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.formState.system_name).toBe('Updated Device');
  });

  it('should update form state on handleDropdownChange', () => {
    const { result } = renderHook(() => useDeviceForm('1'));
    act(() => {
      result.current.handleDropdownChange({ value: 'Linux' });
    });
    expect(result.current.formState.type).toBe('Linux');
  });

  it('should call updateDevice on handleSubmit if deviceId is provided', async () => {
    const updateDevice = jest.fn();
    (useDeviceUpdate as jest.Mock).mockReturnValue({
      mutateAsync: updateDevice,
    });
    const { result } = renderHook(() => useDeviceForm('1'));
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(updateDevice).toHaveBeenCalledWith({ id: '1', ...mockDeviceDetail });
  });

  it('should call createDevice on handleSubmit if deviceId is not provided', async () => {
    const createDevice = jest.fn();
    (useCreateDevice as jest.Mock).mockReturnValue({
      mutateAsync: createDevice,
    });
    const { result } = renderHook(() => useDeviceForm());
    await act(async () => {
      await result.current.handleSubmit();
    });
    expect(createDevice).toHaveBeenCalledWith(mockDeviceDetail);
  });

  it('should return formInvalid if required fields are missing on handleSubmit', async () => {
    const { result } = renderHook(() => useDeviceForm());
    act(() => {
      result.current.handleChange({
        target: {
          name: 'system_name',
          value: '',
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });
    const response = await result.current.handleSubmit();
    expect(response).toEqual({
      status: 'formInvalid',
      errors: {
        system_name: 'System name is required.',
        type: '',
        hdd_capacity: '',
      },
    });
  });
});
