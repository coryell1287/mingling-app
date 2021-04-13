import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import classes from '@components/ContactForm/contactForm.css';
import type { FormInput } from '@components/ContactUs/types';

type Props = {
  onSubmit(data: FormInput): void;
};

type Inputs = {
  name: string;
  email: string;
  textarea: string;
};

function renderWhenValidated(condition: boolean | undefined) {
  return condition ? classes.validated : classes.notValidated;
}

export const ContactForm = ({ onSubmit }: Props): React.ReactElement => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <Row className="justify-content-center">
      <Col md={5}>
        <Form aria-label="Contact form" data-testid="form" noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Form.Group controlId="contactFormName">
            <Form.Label>Name</Form.Label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: { value: true, message: 'Name is required.' },
                maxLength: { value: 35, message: 'Maximum number of characters exceeded.' },
              }}
              render={({ field }) => {
                return (
                  <Form.Control
                    aria-invalid={errors.name ? 'true' : 'false'}
                    data-testid="name"
                    type="text"
                    as="input"
                    placeholder="Enter name"
                    {...field}
                  />
                );
              }}
            />
            <span
              role="alert"
              data-validate="validate-name"
              className={renderWhenValidated(
                errors?.name && (errors.name?.type === 'required' || errors.name?.type === 'maxLength'),
              )}
            >
              {errors?.name?.message}
            </span>
          </Form.Group>
          <Form.Group controlId="contactFormEmail">
            <Form.Label>Email</Form.Label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: { value: true, message: 'Email is required.' },
                pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email.' },
              }}
              render={({ field }) => {
                return (
                  <Form.Control
                    aria-invalid={errors.email ? 'true' : 'false'}
                    data-testid="email"
                    type="email"
                    required
                    as="input"
                    placeholder="Enter email"
                    {...field}
                  />
                );
              }}
            />
            <span
              role="alert"
              data-validate="validate-email"
              className={renderWhenValidated(
                errors?.email && (errors.email?.type === 'required' || errors.email?.type === 'pattern'),
              )}
            >
              {errors?.email?.message}
            </span>
          </Form.Group>
          <Form.Group controlId="textArea">
            <Form.Label>Feedback</Form.Label>
            <Controller
              name="textarea"
              control={control}
              defaultValue=""
              rules={{
                required: { value: true, message: 'Feedback is required.' },
                maxLength: { value: 120, message: 'Maximum number of characters exceeded.' },
              }}
              render={({ field }) => {
                return (
                  <Form.Control
                    aria-invalid={errors.textarea ? 'true' : 'false'}
                    as="textarea"
                    rows={3}
                    data-testid="textarea"
                    {...field}
                  ></Form.Control>
                );
              }}
            />
            <span
              role="alert"
              data-validate="validate-textarea"
              className={renderWhenValidated(
                errors?.textarea && (errors.textarea?.type === 'required' || errors.textarea?.type === 'maxLength'),
              )}
            >
              {errors?.textarea?.message}
            </span>
          </Form.Group>
          <Button type="submit" variant="primary" data-testid="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ContactForm;
