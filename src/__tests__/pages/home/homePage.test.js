// src/__tests__/HomePage.test.js
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/Home/HomePage';

test('renders homepage title', () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/Bem-vindo à página inicial!/i);
  expect(linkElement).toBeInTheDocument();
});
