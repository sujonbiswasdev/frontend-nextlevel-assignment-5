import { createReviewsData } from "@/validations/review.validation";
import z from "zod";

export type ICreatereviewData=z.infer<typeof createReviewsData>

export interface IgetReviewData{
    id: string,
    customerId: string,
    mealId: string,
    parentId: string | null,
    rating: number,
    status: string,
    comment: string,
    createdAt: string,
    updatedAt: string,
}

export type TResponseReviewData<T = unknown> = IgetReviewData & T;