import React, { Component, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { CoinbaseCommerceButton } from '../src/index';
import '../dist/esm/index.css';

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

  render(){
    return (
      <Fragment>
        <div>
          <span>Enter a checkout ID: </span>
          <input type='text' onChange={this.updateCheckoutId}/><br/>
          {this.state.checkoutId.length > 0 ? (
            <div>
              <CoinbaseCommerceButton styled={true} checkoutId={this.state.checkoutId} />
              <CoinbaseCommerceButton styled={true} disabled>Disabled Button</CoinbaseCommerceButton>
              <CoinbaseCommerceButton checkoutId={this.state.checkoutId}>Ugly Button With Crypto</CoinbaseCommerceButton>
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
                checkoutId={this.state.checkoutId}
              >
                Custom Styles Button
              </CoinbaseCommerceButton>
            </div>
          ) : null}

          <span>Enter a charge ID: </span>
          <input type='text' onChange={this.updateChargeId}/><br/>
          {this.state.chargeId.length > 0 ? (
            <div>
              <CoinbaseCommerceButton styled={true} chargeId={this.state.chargeId}/>
              <CoinbaseCommerceButton styled={true} disabled>Disabled Button</CoinbaseCommerceButton>
              <CoinbaseCommerceButton chargeId={this.state.chargeId}>Ugly Button With Crypto</CoinbaseCommerceButton>
            </div>
          ) : null}
        </div>
      </Fragment>
      )
  }
}

const root = createRoot(document.getElementById('root') as Element);

root.render(<App/>);
