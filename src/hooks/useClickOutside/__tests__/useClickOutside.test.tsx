import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useClickOutside from '../index';

describe('useClickOutside', () => {
  it('should call the callback when clicking outside the element', async () => {
    const user = userEvent.setup();

    const callback = jest.fn();
    const ref = { current: document.createElement('div') };
    document.body.appendChild(ref.current);

    renderHook(() => useClickOutside(ref, callback));

    await user.click(document.body);

    expect(callback).toHaveBeenCalledTimes(1);

    document.body.removeChild(ref.current);
  });

  it('should not call the callback when clicking inside the element', async () => {
    const user = userEvent.setup();

    const callback = jest.fn();
    const ref = { current: document.createElement('div') };
    document.body.appendChild(ref.current);

    renderHook(() => useClickOutside(ref, callback));

    await user.click(ref.current);

    expect(callback).not.toHaveBeenCalled();

    document.body.removeChild(ref.current);
  });
});
