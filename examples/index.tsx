import React, { Component, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { CoinbaseCommerceButton } from '../src/index';

type State = {
  checkoutId: string,
  chargeId: string,
}

class App extends Component<unknown, State> {
  constructor(props: unknown){
    super(props);

    this.state = {
      checkoutId: '',
      chargeId: ''
    };
    this.updateCheckoutId = this.updateCheckoutId.bind(this);
    this.updateChargeId = this.updateChargeId.bind(this);
  }

  updateCheckoutId(e: any){
    this.setState({checkoutId: e.target.value})
  }

  updateChargeId(e: any){
    this.setState({chargeId: e.target.value})
  }

  render() {
    const { checkoutId, chargeId } = this.state;

    return (
      <div>
        <span>Enter a checkout ID: </span>
        <input type="text" onChange={this.updateCheckoutId} />
        <br/>
        {checkoutId.length ? (
          <div>
            <CoinbaseCommerceButton styled checkoutId={checkoutId} />
            <CoinbaseCommerceButton styled disabled>Disabled Button</CoinbaseCommerceButton>
            <CoinbaseCommerceButton checkoutId={checkoutId}>Ugly Button With Crypto</CoinbaseCommerceButton>
            <CoinbaseCommerceButton
              wrapperStyle={{ width: '100%' }}
              style={{
                width: '100%',
                color: 'green',
                borderColor: 'green',
                borderRadius: 4,
                height: 45,
                cursor: 'pointer',
              }}
              checkoutId={checkoutId}
            >
              Custom Styles Button
            </CoinbaseCommerceButton>
          </div>
        ) : null}

        <span>Enter a charge ID: </span>
        <input type="text" onChange={this.updateChargeId} />
        <br/>
        {chargeId.length ? (
          <div>
            <CoinbaseCommerceButton styled chargeId={chargeId}/>
            <CoinbaseCommerceButton styled disabled>Disabled Button</CoinbaseCommerceButton>
            <CoinbaseCommerceButton chargeId={chargeId}>Ugly Button With Crypto</CoinbaseCommerceButton>
          </div>
        ) : null}
      </div>
  )
  }
}

const root = createRoot(document.getElementById('root') as Element);

root.render(<App/>);
