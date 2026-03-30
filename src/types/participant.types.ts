import z from "zod";
import { UpdateParticipantSchema } from "@/validations/participant.validation";

export type TParticipantstatus ='APPROVED' | 'PENDING' | 'REJECTED' | "BANNED";  
export type TpaymentStatus= 'PAID' | 'UNPAID';
export type TBaseParticipant = {
    id: string;                
    userId: string;       
    eventId: string;           
    status:TBaseParticipant ;  
    paymentStatus: TpaymentStatus;
    joinedAt: string; 
};

export type TResponseParticipant<T = unknown> = TBaseParticipant & T;

