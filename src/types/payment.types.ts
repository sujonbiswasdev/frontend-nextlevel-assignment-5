export type TBasePayment = {
    id: string;
    userId: string;
    eventId: string;
    stripeEventId?: string | null;
    transactionId?: string | null;
    paymentGatewayData?: any;
    amount: number;
    status: 'UNPAID' | 'PAID' | 'FREE' | string;
    participantId: string;
  };
  
  export type TResponsePayment<T = unknown> = TBasePayment & T;