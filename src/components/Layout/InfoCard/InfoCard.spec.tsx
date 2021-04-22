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

describe('<InfoCard/>', function () {
  it('should load a required sections', function () {
    const { getByText } = render(<InfoCard {...props} />);
    expect(getByText(/card text/i)).toBeInTheDocument();
    expect(getByText(/card title/i)).toBeInTheDocument();
    expect.assertions(2);
  });

  it('should load optional sections', function () {
    const { getByText, queryByTestId } = render(<InfoCard {...props} />);
    expect(getByText(/card subtitle/i)).toBeInTheDocument();
    expect(queryByTestId(/link/i)).toBeTruthy();
    expect.assertions(2);
  });

  it('should not render link when link property is not present', function () {
    const cardProps = {
      ...props,
      link: '',
    };
    const { queryByTestId } = render(<InfoCard {...cardProps} />);
    expect(queryByTestId(/link/i)).not.toBeInTheDocument();
  });
});
