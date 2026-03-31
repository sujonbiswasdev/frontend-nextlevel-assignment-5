export interface Notification {
    id: string;
    userId: string;
    message: string;
    type: 'INVITATION' | 'GENERAL';
    read: boolean;
    invitationId: string;
    createdAt: string;
  }

  export type TNotification<T = unknown> = Notification & T;