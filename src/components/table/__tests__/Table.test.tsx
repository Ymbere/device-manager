import React, {act} from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Table from "../index";

const baseProps = {
  headerTitle: 'Test devices',
  tableData: [{
    title: 'Device one',
    description: 'device one description',
    icon: <>Icon</>,
    rowMenu: [{
      text: '',
      color: '',
      onClick: () => {},
    }],
  }]
}

test('Should render the table without crashing', () => {
  render(<Table {...baseProps} />);
  const tableHeader = screen.getByText(baseProps.headerTitle);
  expect(tableHeader).toBeVisible();
});

test('Should be able to see elements on the table', () => {
  render(<Table {...baseProps} />);
  const tableHeader = screen.getByText(baseProps.headerTitle);
  expect(tableHeader).toBeVisible();

  const firstRow = screen.getByTestId(baseProps.tableData[0].title);
  expect(firstRow).toBeVisible();
});

test('Should be able to click on a table action menu', async () => {
  const user = userEvent.setup();
  const mockClickAction = jest.fn();
  baseProps.tableData[0].rowMenu = [{
    text: "Delete",
    color: "",
    onClick: mockClickAction,
  }];

  render(<Table {...baseProps} />);
  const tableHeader = screen.getByText(baseProps.headerTitle);
  expect(tableHeader).toBeVisible();

  const actionButton = screen.getByTestId(`action-${baseProps.tableData[0].title}`);

  act(() => {
    user.click(actionButton);
  });

  await waitFor(() => {
    expect(screen.getByText(baseProps.tableData[0].rowMenu[0].text)).toBeVisible();
  });

  const firstContextAction = screen.getByText(baseProps.tableData[0].rowMenu[0].text);

  act(() => {
    user.click(firstContextAction);
  });

  await waitFor(() => {
    expect(mockClickAction).toHaveBeenCalledTimes(1);
  });
});
