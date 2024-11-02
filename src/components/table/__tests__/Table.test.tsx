import React, {act} from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Table from "../index";

const baseProps = {
  headerTitle: 'Test devices',
  tableData: [{
    id: 'jklfhsajdk',
    title: 'Device one',
    description: 'device one description',
    icon: <>Icon</>,
  }]
}

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('Table Component', () => {
  it('should render the table without crashing', () => {
    renderWithQueryClient(<Table {...baseProps} />);
    const tableHeader = screen.getByText(baseProps.headerTitle);
    expect(tableHeader).toBeVisible();
  });

  it('should be able to see elements on the table', () => {
    renderWithQueryClient(<Table {...baseProps} />);
    const tableHeader = screen.getByText(baseProps.headerTitle);
    expect(tableHeader).toBeVisible();

    const firstRow = screen.getByTestId(baseProps.tableData[0].title);
    expect(firstRow).toBeVisible();
  });

  it('should be able to click on a table action menu', async () => {
    const user = userEvent.setup();
    const mockClickAction = jest.fn();

    renderWithQueryClient(<Table {...baseProps} />);
    const tableHeader = screen.getByText(baseProps.headerTitle);
    expect(tableHeader).toBeVisible();

    const actionButton = screen.getByTestId(`action-${baseProps.tableData[0].title}`);

    act(() => {
      user.click(actionButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Delete')).toBeVisible();
    });

    const firstContextAction = screen.getByText('Delete');

    act(() => {
      user.click(firstContextAction);
    });

    await waitFor(() => {
      expect(screen.getByText('Delete device?')).toBeVisible();
    });
  });
});
