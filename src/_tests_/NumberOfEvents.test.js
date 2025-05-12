import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('renders input with default value of 32', () => {
    render(<NumberOfEvents number={32} onNumberChange={() => {}} />);
    const input = screen.getByLabelText(/Number of events/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("32");
  });

  test('contains an input element with the role of textbox', () => {
    render(<NumberOfEvents number={32} onNumberChange={() => {}} />);
    const textbox = screen.getByRole('textbox');
    expect(textbox).toBeInTheDocument();
  });

  test('updates value when user types in input', () => {
    let currentNumber = 32;
    const handleChange = (value) => {
      currentNumber = value;
    };

    const { getByRole, rerender } = render(
      <NumberOfEvents number={currentNumber} onNumberChange={handleChange} />
    );

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: '10' } });

    // Simulate re-render with updated prop
    rerender(<NumberOfEvents number={10} onNumberChange={handleChange} />);
    expect(getByRole('textbox')).toHaveValue("10");
  });
});
