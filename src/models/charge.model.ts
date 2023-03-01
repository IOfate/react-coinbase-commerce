import { type Network } from './network.model'
import { type Payment } from './payment.model'

interface ChargePricing {
  local: { amount: string, currency: string }
  bitcoin: { amount: string, currency: string }
  bitcoincash: { amount: string, currency: string }
  ethereum: { amount: string, currency: string }
  litecoin: { amount: string, currency: string }
  dogecoin: { amount: string, currency: string }
}

interface ChargeState {
  status: string
  context: any
  payment?: {
    network: Network
    transactionId: string
  }
}

export interface Charge {
  code: string
  createdAt: string
  confirmedAt?: string
  expiresAt: string
  addresses: Record<string, string>
  pricingType: 'fixed_price' | 'no_price'
  pricing?: ChargePricing
  payments: Payment[]
  timeline: ChargeState[]
  name?: string
  description?: string
  logoUrl?: string
  redirectUrl: string | undefined
  thirdPartyProvider?: string
  checkout?: { id: string }
}
