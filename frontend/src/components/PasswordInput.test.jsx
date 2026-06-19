import { render, screen, fireEvent } from '@testing-library/react';
import PasswordInput from './PasswordInput';

describe('PasswordInput', () => {
  test('renders as type=password by default', () => {
    render(<PasswordInput id="pw" value="" onChange={() => {}} />);
    const input = document.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('password');
  });

  test('toggle button shows password on click', () => {
    render(<PasswordInput id="pw" value="" onChange={() => {}} />);
    const toggle = screen.getByRole('button', { name: /show password/i });
    fireEvent.click(toggle);
    expect(document.querySelector('input').type).toBe('text');
  });

  test('toggle button hides password on second click', () => {
    render(<PasswordInput id="pw" value="" onChange={() => {}} />);
    const toggle = screen.getByRole('button', { name: /show password/i });
    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole('button', { name: /hide password/i }));
    expect(document.querySelector('input').type).toBe('password');
  });

  test('toggle aria-label changes between show/hide', () => {
    render(<PasswordInput id="pw" value="" onChange={() => {}} />);
    expect(screen.getByRole('button', { name: /show password/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
  });

  test('calls onBlur when focus leaves the wrapper', () => {
    const onBlur = vi.fn();
    render(<PasswordInput id="pw" value="" onChange={() => {}} onBlur={onBlur} />);
    const input = document.querySelector('input');
    fireEvent.blur(input, { relatedTarget: document.body });
    expect(onBlur).toHaveBeenCalled();
  });

  test('does not call onBlur when focus moves to toggle button inside wrapper', () => {
    const onBlur = vi.fn();
    render(<PasswordInput id="pw" value="" onChange={() => {}} onBlur={onBlur} />);
    const input = document.querySelector('input');
    const toggle = screen.getByRole('button');
    fireEvent.blur(input, { relatedTarget: toggle });
    expect(onBlur).not.toHaveBeenCalled();
  });

  test('passes additional props to input (placeholder, id, name)', () => {
    render(
      <PasswordInput
        id="my-pw"
        name="password"
        placeholder="Enter password"
        value="test"
        onChange={() => {}}
      />
    );
    const input = document.querySelector('input');
    expect(input.id).toBe('my-pw');
    expect(input.name).toBe('password');
    expect(input.placeholder).toBe('Enter password');
  });
});
