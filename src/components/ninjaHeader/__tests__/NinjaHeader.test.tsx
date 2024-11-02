import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import NinjaHeader from '../index';
import { theme } from '../../../styles/theme';

test('renders NinjaHeader component', () => {
    render(
        <ThemeProvider theme={theme}>
            <NinjaHeader />
        </ThemeProvider>
    );
    const headerElement = screen.getByTestId('ninja-header');
    expect(headerElement).toBeInTheDocument();
});
