import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button, { ButtonProps } from "../index";

const baseProps: ButtonProps = {
  buttonLabel: 'Test button',
  onClick: () => {},
  buttonType: "primary"
}

describe('Button component', () => {
  it('renders the button without crashing', () => {
    render(<Button {...baseProps} />);
    const button = screen.getByText(baseProps.buttonLabel);
    expect(button).toBeVisible();
  });

  it('calls onClick when the button is clicked', async () => {
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
});
