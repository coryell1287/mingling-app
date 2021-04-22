import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
/*eslint-disable import/no-unresolved*/
import { act } from 'react-dom/test-utils';

import { ContactForm } from '@components/ContactForm';

describe('<ContactForm />', function () {
  describe('validates name field against invalid inputs', () => {
    it('should display error message when maximum characters is exceeded', async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByLabelText, container } = render(<ContactForm onSubmit={onSubmit} />);

      await act(async () => {
        const nameInput = getByPlaceholderText(/name/i);
        const value = new Array<string>(90).fill('abc').join('');
        fireEvent.change(nameInput, { target: { value } });
        fireEvent.submit(getByLabelText(/form/i));
      });
      /* eslint-disable @typescript-eslint/no-non-null-assertion */
      expect(container.querySelector('[data-validate=validate-name]')!.innerHTML).toMatch(
        'Maximum number of characters exceeded.',
      );
    });

    it('should display error message when name field is empty', async () => {
      const onSubmit = jest.fn();
      const { getByLabelText, container } = render(<ContactForm onSubmit={onSubmit} />);

      await act(async () => {
        fireEvent.submit(getByLabelText(/form/i));
      });

      expect(container.querySelector('[data-validate=validate-name]')!.innerHTML).toMatch('Name is required');
    });
  });

  describe('validates email field against invalid inputs', () => {
    it('should display error message when email syntax is wrong', async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByLabelText, container } = render(<ContactForm onSubmit={onSubmit} />);

      await act(async () => {
        const emailInput = getByPlaceholderText(/email/i);
        fireEvent.change(emailInput, { target: { value: 'mail' } });
        fireEvent.submit(getByLabelText(/form/i));
      });

      expect(container.querySelector('[data-validate=validate-email]')!.innerHTML).toMatch('Please enter a valid email.');
    });

    it('should display error message when email field is empty', async () => {
      const onSubmit = jest.fn();
      const { getByLabelText, container } = render(<ContactForm onSubmit={onSubmit} />);

      await act(async () => {
        fireEvent.submit(getByLabelText(/form/i));
      });

      expect(container.querySelector('[data-validate=validate-email]')!.innerHTML).toMatch('Email is required');
    });
  });

  describe('validates textarea field against invalid inputs', () => {
    it('should display error message when maximum characters is exceeded', async () => {
      const onSubmit = jest.fn();
      const { getByLabelText, getByTestId, container } = render(<ContactForm onSubmit={onSubmit} />);

      await act(async () => {
        const textAreaInput = getByTestId(/textarea/i);
        const value = new Array<string>(120).fill('abc').join('');
        fireEvent.change(textAreaInput, { target: { value } });
        fireEvent.submit(getByLabelText(/form/i));
      });

      expect(container.querySelector('[data-validate=validate-textarea]')!.innerHTML).toMatch(
        'Maximum number of characters exceeded.',
      );
    });

    it('should display error message when textarea field is empty', async () => {
      const onSubmit = jest.fn();
      const { getByLabelText, container } = render(<ContactForm onSubmit={onSubmit} />);

      await act(async () => {
        fireEvent.submit(getByLabelText(/form/i));
      });

      expect(container.querySelector('[data-validate=validate-textarea]')!.innerHTML).toMatch('Feedback is required.');
    });
  });

  describe('submits form when input is valid', () => {
    it('should call the onSubmit function when fields are filled in properly', async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByLabelText, getByTestId } = render(<ContactForm onSubmit={onSubmit} />);
      const nameInput = getByPlaceholderText(/name/i);
      const emailInput = getByPlaceholderText(/email/i);
      const feedbackInput = getByTestId(/textarea/i);

      await act(async () => {
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'mail@mail.com' } });
        fireEvent.change(feedbackInput, { target: { value: 'I love the site.' } });
        fireEvent.submit(getByLabelText(/contact form/i));
      });

      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
