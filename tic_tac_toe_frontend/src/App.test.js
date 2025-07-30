import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders tic tac toe title', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
});

test('board renders 9 squares', () => {
  render(<App />);
  expect(screen.getAllByRole('button', { name: /cell/i })).toHaveLength(9);
});

test('can play X and O alternately', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /cell/i });
  fireEvent.click(cells[0]);
  expect(cells[0].textContent).toBe('X');
  fireEvent.click(cells[1]);
  expect(cells[1].textContent).toBe('O');
});

test('restart button resets the board', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /cell/i });
  fireEvent.click(cells[0]);
  fireEvent.click(screen.getByText(/Restart/i));
  expect(screen.getAllByRole('button', { name: /cell-empty/i })).toHaveLength(9);
});
