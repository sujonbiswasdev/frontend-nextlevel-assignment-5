export interface IBaseUser {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    status: 'ACTIVE' | 'INACTIVE';
    image: string | null;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    totalReview: number;
    averageRating: number;
}



export type TResponseUserData<T = unknown> = IBaseUser & T;