import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

/** Components */
import { CoinbaseCommerceButton } from '../index';

describe('CoinbaseCommerceButton', () => {
  const originalError = console.error;

  beforeAll(() => {
    console.error = (args: any[]) => {
      // Suppress: Warning: Received `false` for a non-boolean attribute `styled`.
      // Which can be a false warning
      if (args.indexOf('for a non-boolean attribute') > -1) {
        return
      }

      originalError(args)
    }
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should render a button on init', () => {
    const { container } = render(
      <CoinbaseCommerceButton />
    );

    const linkElement = container.querySelector('a');

    expect(linkElement).toBeDefined();
    expect(linkElement?.getAttribute('href')).toEqual('https://commerce.coinbase.com');
  });

  it('should open an iframe', () => {
    const { container } = render(
      <CoinbaseCommerceButton checkoutId="aaaa" />
    );

    act(() => {
      container.querySelector('button')?.click();
    });

    expect(container.querySelector('iframe')).toBeDefined();
  });

  it('should display default string when no children in btnProps', () => {
    const { container } = render(
      <CoinbaseCommerceButton />
    );

    const btnElement = container.querySelector('button');

    expect(btnElement?.textContent).toEqual('Buy crypto');
  });

  it('should render children if specified', () => {
    const { container } = render(
      <CoinbaseCommerceButton>Test</CoinbaseCommerceButton>
    );

    const btnElement = container.querySelector('button');

    expect(btnElement?.textContent).toEqual('Test');
  });

  it('button should use our css class if styled at true', () => {
    const { container } = render(
      <CoinbaseCommerceButton styled />
    );

    const btnElement = container.querySelector('button');

    expect(btnElement?.classList.contains('coinbase-commerce-button')).toEqual(true);
  });
});
