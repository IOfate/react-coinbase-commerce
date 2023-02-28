import React, { ButtonHTMLAttributes, Component, ReactNode } from 'react';

/** Models */
import { MessageData } from './models/message-data.model';

/** CSS */
import './css/button.css';

/** Root */
import { Iframe } from './iframe';

type Props = {
  children?: ReactNode,
  checkoutId?: string,
  chargeId?: string,
  customMetadata?: string,
  onLoad: () => void,
  onChargeSuccess?: (data: MessageData) => void,
  onChargeFailure?: (data: MessageData) => void,
  onPaymentDetected?: (data: MessageData) => void,
  onModalClosed?: () => void,
  disableCaching: true,
  wrapperStyle?: { [key: string]: number | string },
  btnProps: {
    styled: boolean;
  } & ButtonHTMLAttributes<any>,
};

type State = {
  showModal: boolean
};

export class CoinbaseCommerceButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  onClick() {
    this.setState({ showModal: true });
  }

  onModalClose() {
    const { onModalClosed } = this.props;

    this.setState({ showModal: false });
    if (onModalClosed){
      onModalClosed();
    }
  }

  handleError(data: MessageData) {
    console.error(data);
    this.onModalClose();
  }

  render(): JSX.Element {
    const { showModal } = this.state;
    const {
      onLoad,
      onChargeSuccess,
      onChargeFailure,
      checkoutId,
      chargeId,
      customMetadata,
      onPaymentDetected,
      disableCaching,
      wrapperStyle,
      btnProps,
    } = this.props;
    const iFrameProps = {
      onLoad,
      onChargeSuccess,
      onChargeFailure,
      checkoutId,
      chargeId,
      onPaymentDetected,
      disableCaching,
    };

    return (
      <div style={wrapperStyle}>
        <a
          href="https://commerce.coinbase.com"
          rel="external"
          title="Pay with Bitcoin, Bitcoin Cash, DAI, Litecoin, Dogecoin, Ethereum, or USD Coin"
          onClick={e => e.preventDefault()}
        >
          <button
            {...btnProps}
            className={ btnProps.styled ? 'coinbase-commerce-button' : btnProps.className }
            onClick={() => this.onClick()}
          >
            { btnProps.children || 'Buy crypto' }
          </button>
        </a>
        {showModal && (
          <Iframe
            {...iFrameProps}
            onModalClose={() => this.onModalClose()}
            onError={(data: MessageData) => this.handleError(data)}
            customMetadata={customMetadata}
          />
        )}
      </div>
    )
  }
}
