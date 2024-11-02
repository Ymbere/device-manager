import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useDeviceDetail} from "../index";

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useDeviceDetail hook', () => {
  it('should return the device detail properly', async () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
    )

    const mockDeviceDetail = {
      id: '1', system_name: 'Device 1', type: 'Type A', hdd_capacity: '500GB'
    }

    global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockDeviceDetail),
        })
    ) as jest.Mock;

    const { result } = renderHook(() => useDeviceDetail('1'), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockDeviceDetail);
  });
});
