import React, { Component } from 'react'

/** Models */
import { type MessageData } from './models/message-data.model'

/** CSS */
import './css/iframe.css'
import './css/LoadingSpinner.css'

interface Props {
  checkoutId?: string
  chargeId?: string
  customMetadata?: string
  onLoad?: () => void
  onChargeSuccess?: (data: MessageData) => void
  onChargeFailure?: (data: MessageData) => void
  onPaymentDetected?: (data: MessageData) => void
  onError: (data: MessageData) => void
  onModalClose: () => void
  disableCaching: boolean
}

interface State {
  loading: boolean
  src: null | string
}

interface SrcParams {
  origin: string
  buttonId: string
  custom?: string
  cacheDisabled: boolean
}

type IframeMessageData = {
  buttonId?: string
} & MessageData

export class Iframe extends Component<Props, State> {
  private readonly origin = 'https://commerce.coinbase.com'
  private readonly uuid: string
  private readonly listenerHandleMessage: (msg: { origin: string, data: IframeMessageData }) => void

  constructor (props: Props) {
    super(props)

    this.uuid = this.generateUUID()
    this.listenerHandleMessage = (msg: { origin: string, data: IframeMessageData }) => { this.handleMessage(msg) }
    this.state = {
      loading: true,
      src: null
    }
  }

  componentDidMount (): void {
    // Add event listeners for the iframe
    window.addEventListener('message', this.listenerHandleMessage)

    const { hostname, port, protocol } = window.location
    const hostName = `${protocol}//${hostname}${port ? `:${port}` : ''}/`

    this.setState({ src: this.buildSrc(hostName) })
  }

  componentWillUnmount (): void {
    window.removeEventListener('message', this.listenerHandleMessage)
  }

  render (): JSX.Element {
    const { loading, src } = this.state

    return (
      <div className="coinbase-commerce-iframe-container">
        {(loading || src === null) && (
          <div className="commerce-loading-spinner"/>
        )}
        {src !== null && (
          <iframe
            onLoad={() => { this.handleIFrameLoaded() }}
            className="coinbase-commerce-iframe"
            src={src}
            style={{ border: 0 }}
            scrolling="no"
          />
        )}
      </div>
    )
  }

  private generateUUID (): string {
    // Source: https://stackoverflow.com/a/2117523
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (c: string) => {
        const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8)

        return v.toString(16)
      }
    )
  }

  private buildSrc (hostName: string): string {
    const { checkoutId, chargeId, customMetadata, disableCaching } = this.props

    let widgetType: string
    let id: string

    if (checkoutId) {
      id = checkoutId
      widgetType = 'checkout'
    } else if (chargeId) {
      id = chargeId
      widgetType = 'charges'
    } else {
      throw new Error('must supply either checkoutId or chargeId prop')
    }

    const params: SrcParams = {
      origin: hostName,
      buttonId: this.uuid,
      cacheDisabled: disableCaching
    }

    if (customMetadata) {
      if (typeof customMetadata !== 'string') {
        console.error('Received customMetadata not of "string" type. Ignoring.')
      } else {
        params.custom = customMetadata
      }
    }

    const encodedParams = Object.keys(params)
      .map((key: string) => `${window.encodeURIComponent(key)}=${window.encodeURIComponent((params as any)[key])}`)
      .join('&')

    return `${this.origin}/embed/${widgetType}/${encodeURI(id)}?${encodedParams}`
  }

  /*
   * If the message on this window is coming from coinbase commerce, and the ID of message
   * matches the ID we generated in our constructor, we can assume this message is valid and meant
   * for us to action.
   */
  private isValidMessage (msg: { origin: string, data: IframeMessageData }): boolean {
    return msg.origin === this.origin && msg.data.buttonId === this.uuid
  }

  private handleMessage (msg: { origin: string, data: IframeMessageData }): void {
    if (!this.isValidMessage(msg)) {
      return
    }

    const {
      onChargeSuccess,
      onChargeFailure,
      onModalClose,
      onError,
      onPaymentDetected
    } = this.props

    switch (msg.data.event) {
      case 'charge_confirmed':
        onChargeSuccess?.(msg.data)
        break
      case 'charge_failed':
        onChargeFailure?.(msg.data)
        break
      case 'payment_detected':
        onPaymentDetected?.(msg.data)
        break
      case 'error_not_found':
        onError(msg.data)
        break
      case 'checkout_modal_closed':
        onModalClose()
        break
      default:
        break
    }
  }

  private handleIFrameLoaded (): void {
    this.setState({ loading: false })
    this.props.onLoad?.()
  }
}
