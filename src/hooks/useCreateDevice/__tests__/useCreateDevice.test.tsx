import React from 'react';
import {renderHook, waitFor} from '@testing-library/react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useCreateDevice} from "../index";

beforeEach(() => {
  jest.clearAllMocks();
});

test('Should create the device properly', async () => {
  const queryClient = new QueryClient();

  const wrapper = ({children}: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  const mockNewDevice = {
    system_name: 'Device 5', type: 'Type A', hdd_capacity: '500GB'
  }

  global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockNewDevice),
      })
  ) as jest.Mock;

  const {result} = renderHook(() => useCreateDevice(), {wrapper});

  const {mutate} = result.current;

  mutate(mockNewDevice)

  await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://localhost:3001/devices', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mockNewDevice)
  }));

  await waitFor(() => {
    expect(queryClient.getQueryCache().find({
      queryKey: ['devices']
    })).toBeUndefined();
  });
});