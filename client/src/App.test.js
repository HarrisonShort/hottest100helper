import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import React from 'react';

afterEach(cleanup);

test('should generate a snapshot for app component', () => {
    const { asFragment } = render(<App />);

    expect(asFragment(<App />)).toMatchSnapshot();
});