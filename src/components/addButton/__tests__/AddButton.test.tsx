import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddButton from "../index";

const baseProps = {
  text: 'Test button',
  onClick: () => {},
}

test('Should render the button without crashing', () => {
  render(<AddButton {...baseProps} />);
  const button = screen.getByText(baseProps.text);
  expect(button).toBeVisible();
});

test('Should be able to click on the button', async () => {
  baseProps.onClick = jest.fn();
  const user = userEvent.setup();
  render(<AddButton {...baseProps} />);
  const button = screen.getByText(baseProps.text);
  expect(button).toBeVisible();

  act(() => {
    user.click(button);
  });

  await waitFor(() => {
    expect(baseProps.onClick).toHaveBeenCalledTimes(1);
  });
});
