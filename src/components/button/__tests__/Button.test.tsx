import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import Button, { ButtonProps } from "../index";
import { theme } from '../../../styles/theme';

const baseProps: ButtonProps = {
  buttonLabel: 'Test button' as string,
  onClick: () => {},
  buttonType: "primary"
}

describe('Button component', () => {
  it('renders the button without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button {...baseProps} />
      </ThemeProvider>
    );
    const button = screen.getByText(baseProps.buttonLabel as string);
    expect(button).toBeVisible();
  });

  it('calls onClick when the button is clicked', async () => {
    baseProps.onClick = jest.fn();
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={theme}>
        <Button {...baseProps} />
      </ThemeProvider>
    );
    const button = screen.getByText(baseProps.buttonLabel as string);
    expect(button).toBeVisible();

    act(() => {
      user.click(button);
    });

    await waitFor(() => {
      expect(baseProps.onClick).toHaveBeenCalledTimes(1);
    });
  });
});
