# React Coinbase Commerce

[![Node.js CI](https://github.com/IOfate/react-coinbase-commerce/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/IOfate/react-coinbase-commerce/actions/workflows/node.js.yml)

A totally rewritten version of https://github.com/coinbase/react-coinbase-commerce in Typescript maintained by IOfate.

A button to embed a Coinbase Commerce checkout or charge directly into your React application.

```
npm i -S @iofate/react-coinbase-commerce
```

### Table of Contents
- [Usage](#usage)
- [Getting Started](#getting-started)
- [Docs](#docs)

## Usage
```jsx
import { CoinbaseCommerceButton } from '@iofate/react-coinbase-commerce';
import '@iofate/react-coinbase-commerce/dist/esm/index.css';

const App = () => {
  return (
    <CoinbaseCommerceButton checkoutId={'My checkout ID'}/>
  )
};
```

## Getting Started
1. To start accepting digital currency payments, first register for a Coinbase Commerce
account [here](https://commerce.coinbase.com).
1. Whitelist your domain in Settings.
1. Follow the API Documentation [here](https://commerce.coinbase.com/docs/api/) to create a charge or checkout.
    - Alternatively, create a checkout from the merchant dashboard and copy the ID found in the checkout's details.
1. Pass the ID of the charge or checkout you create to the `CoinbaseCommerceButton` component
1. That's it! You're ready to start accepting digital currency payments with Coinbase Commerce

## Docs

### Props
In addition to the regular `button` props, this component accepts some custom props:

| Prop Name       | default | required              | type                  |
|-----------------|---------|-----------------------|-----------------------|
| `styled`        | false   | no                    | ``boolean``               |
| `checkoutId`      | null     | If no chargeId, yes   | ``string``                |
| `chargeId`        | null     | If no checkoutId, yes | ``string``                |
| `onLoad`          | null     | no                    | `()=>void`            |
| `onChargeSuccess` | null     | no                    | `(MessageData)=>void` |
| `onChargeFailure` | null     | no                    | `(MessageData)=>void` |
| `onPaymentDetected` | null     | no                    | `(MessageData)=>void` |
| `onModalClosed`   | null     | no                    | `()=>void`            |
| `disableCaching`   | false     | no                    | `boolean`            |
| `customMetadata`   | null     | no                    | `string`              |

**Warning**: If `disableCaching` is set to `true`, users that accidentally close their payment windows will be unable to see their transaction's status upon reopening.
