import { IBaseUser } from "./user.types";

export type TBaseParticipant = {
    id: string;                
    userId: string;       
    eventId: string;           
    status: 'APPROVED' | 'PENDING' | 'REJECTED';  
    paymentStatus: 'PAID' | 'UNPAID';
    joinedAt: string; 
};


export type TResponseParticipant<T = unknown> = TBaseParticipant & T;