import React from 'react';
import { render, screen } from '@testing-library/react';
import NinjaHeader from '../index';

test('renders NinjaHeader component', () => {
    render(<NinjaHeader />);
    const headerElement = screen.getByTestId('ninja-header');
    expect(headerElement).toBeInTheDocument();
});
