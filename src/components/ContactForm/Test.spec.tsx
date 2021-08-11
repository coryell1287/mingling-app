import React, { ReactNode } from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

const data = [
  {
    id: 1,
    name: 'Sicilian Pizza',
    image: '/path/to/image',
    desc: 'really good pizza',
    price: 9.99,
  },
  {
    id: 1,
    name: 'Cheese Pizza',
    image: '/path/to/image',
    desc: 'really good pizza',
    price: 9.99,
  },
  {
    id: 1,
    name: 'Pepperoni Pizza',
    image: '/path/to/image',
    desc: 'really good pizza',
    price: 9.99,
  },
];

describe('testing', () => {
  it('should have correct names for pizzas', () => {
    expect.assertions(1);
    expect(data.map(pizza => pizza.name)).toStrictEqual(['Sicilian Pizza', 'Cheese Pizza', 'Pepperoni Pizza']);
  });

  it('should mock implementation of a basic function', () => {
    expect.assertions(2);
    const mock = jest.fn((args: string) => `A basic ${args} function`);
    expect(mock('mock')).toBe('A basic mock function');
    expect(mock).toHaveBeenCalledWith('mock');
  });

  it('should return a value of a function one time', () => {
    expect.assertions(2);
    const mock = jest.fn();
    mock.mockReturnValue('once');

    mock('mock');
    expect(mock).toHaveBeenCalledTimes(1);

    expect(mock).toHaveBeenCalledWith('mock');
  });

  it('should mock implementation of a function', () => {
    expect.assertions(2);
    const mock = jest.fn().mockImplementation(() => 'United States');
    expect(mock('Location')).toBe('United States');
    expect(mock).toHaveBeenCalledWith('Location');
  });

  it('should spy on the original implementation', () => {
    expect.assertions(2);
    const pizza = {
      name: (n: string) => `Pizza name ${n}`,
    };
    const spy = jest.spyOn(pizza, 'name');
    expect(pizza.name('Cheese')).toBe('Pizza name Cheese');
    expect(spy).toHaveBeenCalledWith('Cheese');
  });

  it('should spy on and replace the original implementation', () => {
    expect.assertions(2);
    const pizza = {
      name: (n: string) => `Pizza name ${n}`,
    };
    const spy = jest.spyOn(pizza, 'name');
    spy.mockImplementation(() => 'Mock the implementation');
    pizza.name('Cheese');
    expect(pizza.name).toHaveReturnedWith('Mock the implementation');
    expect(spy).toHaveBeenCalledWith('Cheese');
    spy.mockRestore();
  });

  it('should test an asynchronous function', async () => {
    expect.assertions(1);
    const user = {
      getFullName: jest.fn(() => Promise.resolve('Ludwig von Mises')),
    };
    await expect(user.getFullName()).resolves.toBe('Ludwig von Mises');
  });

  it('should throw an error inside of asynchronous function', async () => {
    expect.assertions(2);
    const user = {
      getFullName: jest.fn(() => Promise.reject(new TypeError('Ludwig von Mises'))),
    };
    await expect(user.getFullName).rejects.toThrow(TypeError);
    await expect(user.getFullName()).rejects.toThrow('Ludwig von Mises');
  });
});

describe('testing a React component', () => {
  it('should test some asynchronous operation', async () => {
    expect.assertions(1);
    const promise = Promise.resolve();
    const handleUserUpdate = jest.fn(() => promise);
    const username = 'Tommy';
    const User = ({ children }: { children: ReactNode }) => {
      return (
        <div>
          {children}
          <button type="submit" onClick={handleUserUpdate}></button>
        </div>
      );
    };
    render(<User>{username}</User>);
    expect(screen.getByText(username)).toBeInTheDocument();
    //TODO Make this asynchronous
    // await waitForElementToBeRemoved(() => screen.getByText(username))
  });
});
export {};
