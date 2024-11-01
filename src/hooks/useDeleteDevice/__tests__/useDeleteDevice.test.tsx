import React, {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {renderHook, waitFor} from "@testing-library/react";
import {useDeleteDevice} from "../index";
import { BASE_API_URL } from '../../../consts';

beforeEach(() => {
  jest.clearAllMocks();
});

test('Should be able to delete device', async () => {
  const queryClient = new QueryClient();
  const mockDeviceIdToDelete = '1'

  const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
  ) as jest.Mock;

  const { result } = renderHook(() => useDeleteDevice(), { wrapper });

  const { mutate } = result.current;

  mutate(mockDeviceIdToDelete);

  await waitFor(() => expect(fetch).toHaveBeenCalledWith(`${BASE_API_URL}/devices/${mockDeviceIdToDelete}`, { method: 'DELETE' }));

  expect(fetch).toHaveBeenCalledTimes(1);

  await waitFor(() => {
    expect(queryClient.getQueryCache().find({
      queryKey: ['devices']
    })).toBeUndefined();
  });
});
