import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button, {AddButtonProps} from "../index";

const baseProps: AddButtonProps = {
  buttonLabel: 'Test button',
  onClick: () => {},
  buttonType: "primary"
}

test('Should render the button without crashing', () => {
  render(<Button {...baseProps} />);
  const button = screen.getByText(baseProps.buttonLabel);
  expect(button).toBeVisible();
});

test('Should be able to click on the button', async () => {
  baseProps.onClick = jest.fn();
  const user = userEvent.setup();
  render(<Button {...baseProps} />);
  const button = screen.getByText(baseProps.buttonLabel);
  expect(button).toBeVisible();

  act(() => {
    user.click(button);
  });

  await waitFor(() => {
    expect(baseProps.onClick).toHaveBeenCalledTimes(1);
  });
});
