import { Network } from './network.model';

type PaymentStatus = 'NEW' | 'PENDING' | 'CONFIRMED' | 'FAILED';

export interface Payment {
  network: Network;
  transactionId: string,
  status: PaymentStatus,
  value: {
    crypto: { amount: string; currency: string; };
    local: { amount: string; currency: string; };
  },
  block: {
    height?: number,
    hash?: string,
    confirmations: number,
    confirmationsRequired: number,
  },
}
