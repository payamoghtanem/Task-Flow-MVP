import { render, screen } from '@testing-library/react';
import FormField from './FormField';

describe('FormField', () => {
  test('renders label and children', () => {
    render(
      <FormField label="Email address" id="email">
        <input id="email" type="email" />
      </FormField>
    );
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
  });

  test('renders hint when provided', () => {
    render(
      <FormField label="Password" hint="Min. 8 characters" id="pw">
        <input id="pw" type="password" />
      </FormField>
    );
    expect(screen.getByText('Min. 8 characters')).toBeInTheDocument();
  });

  test('does not render hint element when not provided', () => {
    render(
      <FormField label="Email" id="em">
        <input id="em" type="email" />
      </FormField>
    );
    expect(screen.queryByClassName).not.toBeDefined();
    expect(document.querySelector('.form-hint')).toBeNull();
  });

  test('renders error message with role=alert when error is provided', () => {
    render(
      <FormField label="Email" error="Email is required" id="em">
        <input id="em" type="email" />
      </FormField>
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Email is required');
  });

  test('does not render error element when no error', () => {
    render(
      <FormField label="Email" id="em">
        <input id="em" type="email" />
      </FormField>
    );
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
