import React, { ButtonHTMLAttributes, Component, ReactNode } from 'react';

/** Models */
import { MessageData } from './models/message-data.model';

/** CSS */
import './css/button.css';

/** Root */
import { Iframe } from './iframe';

interface Props {
  styled: boolean;
  checkoutId?: string;
  chargeId?: string;
  customMetadata?: string;
  onLoad?: () => void;
  onChargeSuccess?: (data: MessageData) => void;
  onChargeFailure?: (data: MessageData) => void;
  onPaymentDetected?: (data: MessageData) => void;
  onModalClosed?: () => void;
  disableCaching: boolean;
  wrapperStyle?: { [key: string]: number | string };
}

type State = {
  showModal: boolean
};

export class CoinbaseCommerceButton extends Component<Props & ButtonHTMLAttributes<any>, State> {
  static defaultProps = {
    styled: false,
    disableCaching: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  private onClick() {
    this.setState({ showModal: true });
  }

  private onModalClose() {
    const { onModalClosed } = this.props;

    this.setState({ showModal: false });
    if (onModalClosed){
      onModalClosed();
    }
  }

  private handleError(data: MessageData) {
    console.error(data);
    this.onModalClose();
  }

  private getButtonProps(): Partial<Props> {
    const ignoredProps = [
      'onLoad',
      'onChargeSuccess',
      'onChargeFailure',
      'customMetadata',
      'onPaymentDetected',
      'onModalClosed',
      'checkoutId',
      'chargeId',
      'disableCaching',
      'wrapperStyle'
    ];

    return Object.keys({ ...this.props })
      .filter((key: string) => !ignoredProps.includes(key))
      .reduce(
        (result: Partial<Props>, key: string) => ({
          ...result,
          [key]: (this.props as any)[key],
        }),
        {} as Partial<Props>,
      );
  };

  render(): JSX.Element {
    const { showModal } = this.state;
    const {
      styled,
      onLoad,
      onChargeSuccess,
      onChargeFailure,
      checkoutId,
      chargeId,
      customMetadata,
      onPaymentDetected,
      disableCaching,
      wrapperStyle,
      className,
      children,
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
    const btnProps = this.getButtonProps();

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
            className={ styled ? 'coinbase-commerce-button' : className }
            onClick={() => this.onClick()}
          >
            { children || 'Buy crypto' }
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
