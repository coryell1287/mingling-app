import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { InfoCard } from '@components/Layout/InfoCard';

const props = {
  title: 'card title',
  text: 'card text',
  subtitle: 'card subtitle',
  link: 'card link',
};

describe('<InfoCard/>', () => {
  it('should load a required sections', () => {
    expect.assertions(2);
    const { getByText } = render(<InfoCard {...props} />);
    expect(getByText(/card text/i)).toBeInTheDocument();
    expect(getByText(/card title/i)).toBeInTheDocument();
  });

  it('should load optional sections', () => {
    expect.assertions(2);
    const { getByText, queryByTestId } = render(<InfoCard {...props} />);
    expect(getByText(/card subtitle/i)).toBeInTheDocument();
    expect(queryByTestId(/link/i)).toBeTruthy();
  });

  it('should not render link when link property is not present', () => {
    expect.assertions(1);
    const cardProps = {
      ...props,
      link: '',
    };
    const { queryByTestId } = render(<InfoCard {...cardProps} />);
    expect(queryByTestId(/link/i)).not.toBeInTheDocument();
  });
});
