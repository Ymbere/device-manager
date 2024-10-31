import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useDevices} from "../index";

beforeEach(() => {
  jest.clearAllMocks();
})

test('Should return the devices properly', async () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
  )

  const mockDevices = [
    { id: '1', system_name: 'Device 1', type: 'Type A', hdd_capacity: '500GB' },
    { id: '2', system_name: 'Device 2', type: 'Type B', hdd_capacity: '1TB' },
  ];

  global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockDevices),
      })
  ) as jest.Mock;

  const { result } = renderHook(() => useDevices(), { wrapper });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toEqual(mockDevices);
})