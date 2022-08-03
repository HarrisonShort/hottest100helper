import { render, screen } from '@testing-library/react';
import Counter from "./Counter";

test('renders counter component', () => {
    render(<Counter value={2} />);
    const counterElement = screen.getByTestId("counter-test");

    expect(counterElement).toBeInTheDocument();

    expect(counterElement).toHaveTextContent("2");
});