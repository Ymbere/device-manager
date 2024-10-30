import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Dropdown, {DropdownItem} from "../index";

const baseProps = {
  values: [{
    value: '1',
    text: 'Value for test 1'
  }, {
    value: '2',
    text: 'Value for test 2'
  }, {
    value: '3',
    text: 'Value for test 3'
  }],
  placeholder: 'Test placeholder',
  selectedValues: [],
  onChange: () => {},
  multiple: false,
}

test('Should render the dropdown without crashing', () => {
  render(<Dropdown {...baseProps} />);
  const placeholder = screen.getByText(baseProps.placeholder);
  expect(placeholder).toBeInTheDocument();
});

test('Should be able to select a value on the simple dropdown', async () => {
  baseProps.onChange = jest.fn();
  const user = userEvent.setup();
  render(<Dropdown {...baseProps} />);
  const placeholderDiv = screen.getByTestId('dropdown-container');

  act(() => {
    user.click(placeholderDiv);
  })

  await waitFor(() => {
    expect(screen.getByText(baseProps.values[0].text)).toBeVisible();
  });

  const firstDropdownOption = screen.getByText(baseProps.values[0].text);

  act(() => {
    user.click(firstDropdownOption);
  });

  await waitFor(() => {
    expect(firstDropdownOption).not.toBeVisible();
  });

  expect(baseProps.onChange).toHaveBeenCalledWith(baseProps.values[0]);
});


test('Should be able to select a value on multiple dropdown', async () => {
  baseProps.onChange = jest.fn();
  baseProps.multiple = true;
  const user = userEvent.setup();
  render(<Dropdown {...baseProps} />);
  const placeholderDiv = screen.getByTestId('dropdown-container');

  act(() => {
    user.click(placeholderDiv);
  });

  await waitFor(() => {
    expect(screen.getByText(baseProps.values[0].text)).toBeVisible();
  });

  const firstDropdownOption = screen.getByText(baseProps.values[0].text);

  act(() => {
    user.click(firstDropdownOption);
  });

  await waitFor(() => {
    expect(baseProps.onChange).toHaveBeenCalledWith([baseProps.values[0]]);
  });
});

test('Should be able to select multiple values on multiple dropdown', async () => {
  baseProps.multiple = true;

  const user = userEvent.setup();

  const TestComponent = ({ testCallBack }: { testCallBack: (values: Array<DropdownItem>) => void }) => {
    const [selectedValues, setSelectedValues] = React.useState<Array<string>>([]);

    const handleChangeSelectedValues = (values: DropdownItem | Array<DropdownItem>) => {
      if (Array.isArray(values)) {
        testCallBack(values);
        const extractValues = values.map(v => v.value);
        setSelectedValues(extractValues);
      }
    }

    return (
        <Dropdown {...baseProps} selectedValues={selectedValues} onChange={handleChangeSelectedValues} />
    )
  }

  const testCallBack = jest.fn();

  render(<TestComponent testCallBack={testCallBack} />);

  const placeholderDiv = screen.getByTestId('dropdown-container');

  act(() => {
    user.click(placeholderDiv);
  });

  await waitFor(() => {
    expect(screen.getByText(baseProps.values[0].text)).toBeVisible();
  });

  const firstDropdownOption = screen.getByText(baseProps.values[0].text);

  act(() => {
    user.click(firstDropdownOption);
  });

  await waitFor(() => {
    expect(testCallBack.mock.calls[0][0]).toEqual([baseProps.values[0]]);
  });

  await waitFor(() => {
    expect(screen.getByText(baseProps.values[1].text)).toBeVisible();
  });

  const secondDropdownOption = screen.getByText(baseProps.values[1].text);

  act(() => {
    user.click(secondDropdownOption);
  });

  await waitFor(() => {
    expect(testCallBack.mock.calls[1][0]).toEqual([baseProps.values[0], baseProps.values[1]]);
  });

  const placeholder = screen.getByText(`${baseProps.placeholder} ${baseProps.values[0].text}, ${baseProps.values[1].text}`)

  expect(placeholder).toBeVisible();

  act(() => {
    user.click(firstDropdownOption);
  });

  await waitFor(() => {
    expect(testCallBack.mock.calls[2][0]).toEqual([baseProps.values[1]]);
  });

  const placeholderAfterUpdate = screen.getByText(`${baseProps.placeholder} ${baseProps.values[1].text}`)

  expect(placeholderAfterUpdate).toBeVisible();
});
