import React, {act} from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import Modal from "../index";
import { theme } from '../../../styles/theme';

const baseProps = {
  modalTitle: 'My test modal',
  onClose: () => {},
  actions: <>test</>,
  isOpen: true,
}

describe('Modal Component', () => {
  it('should render the modal without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <Modal {...baseProps}>
          <div>Modal Children</div>
        </Modal>
      </ThemeProvider>
    );

    const modalChildren = screen.getByText('Modal Children');
    expect(modalChildren).toBeVisible();
  });

  it('should call onClose when clicking on close button', async () => {
    const user = userEvent.setup();
    baseProps.onClose = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <Modal {...baseProps}>
          <div>Modal Children</div>
        </Modal>
      </ThemeProvider>
    );

    const modalChildren = screen.getByText('Modal Children');
    expect(modalChildren).toBeVisible();

    const modalCloseButton = screen.getByTestId('close-modal-button');

    act(() => {
      user.click(modalCloseButton);
    });

    await waitFor(() => {
      expect(baseProps.onClose).toHaveBeenCalledTimes(1);
    });
  });
});

