import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from "../index";


const baseProps = {
  placeholder: 'Test placeholder search input',
  onChange: () => {},
}

test('Should render the search input without crashing', () => {
  render(<TextInput {...baseProps} />);
  const placeholder = screen.getByPlaceholderText(baseProps.placeholder);
  expect(placeholder).toBeVisible();
});


test('Should trigger onChange when typing', async () => {
  const user = userEvent.setup();
  baseProps.onChange = jest.fn();

  render(<TextInput {...baseProps} />);
  const inputSearch = screen.getByPlaceholderText(baseProps.placeholder);
  expect(inputSearch).toBeVisible();

  await user.type(inputSearch, 'Teste value typed');

  await waitFor(() => {
    expect(baseProps.onChange).toBeCalled();
  });

  // @ts-ignore
  const event = baseProps.onChange.mock.calls[0][0];
  expect(event.target.value).toBe('Teste value typed');

  // @ts-ignore
  expect(inputSearch.value).toBe('Teste value typed');
});

test('Should have value provided for controlled behaviour', () => {
  // @ts-ignore
  baseProps.value = 'Test controlled';
  render(<TextInput {...baseProps} />);

  const inputSearch = screen.getByPlaceholderText(baseProps.placeholder);
  expect(inputSearch).toBeVisible();

  // @ts-ignore
  expect(inputSearch.value).toBe('Test controlled');
});
