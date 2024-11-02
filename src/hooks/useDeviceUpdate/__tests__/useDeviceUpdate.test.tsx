import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDeviceUpdate } from '../index';
import { BASE_API_URL } from '../../../consts';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useDeviceUpdate hook', () => {
  it('should update the device properly', async () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const mockDeviceToUpdate = {
      id: '20',
      system_name: 'Device 5',
      type: 'Type A',
      hdd_capacity: '500GB',
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockDeviceToUpdate),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useDeviceUpdate(), { wrapper });

    const { mutate } = result.current;

    mutate(mockDeviceToUpdate);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(`${BASE_API_URL}/devices/${mockDeviceToUpdate.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockDeviceToUpdate),
      })
    );

    await waitFor(() => {
      expect(
        queryClient.getQueryCache().find({
          queryKey: ['devices'],
        })
      ).toBeUndefined();
    });
  });
});
