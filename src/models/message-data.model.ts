import { type Charge } from './charge.model'

type EventType = 'charge:created'
| 'charge:failed'
| 'charge_confirmed'
| 'charge_failed'
| 'payment_detected'
| 'error_not_found'
| 'checkout_modal_closed'

export interface MessageData {
  event: EventType
  charge: Charge
}
