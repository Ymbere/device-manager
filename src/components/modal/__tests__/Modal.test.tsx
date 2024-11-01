import React, {act} from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Modal from "../index";

const baseProps = {
  modalTitle: 'My test modal',
  onClose: () => {},
  actions: <>test</>,
  isOpen: true,
}

describe('Modal Component', () => {
  it('should render the modal without crashing', () => {
    render(
      <Modal {...baseProps}>
        <div>Modal Children</div>
      </Modal>
    );

    const modalChildren = screen.getByText('Modal Children');
    expect(modalChildren).toBeVisible();
  });

  it('should call onClose when clicking on close button', async () => {
    const user = userEvent.setup();
    baseProps.onClose = jest.fn();

    render(
      <Modal {...baseProps}>
        <div>Modal Children</div>
      </Modal>
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

