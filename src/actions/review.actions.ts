"use server"
import { reviewService } from "@/services/review.services";
import { ICreatereviewData, TResponseReviewData } from "@/types/review.types";

export const createReview = async (eventid: string, data: ICreatereviewData) => {
  return await reviewService.createReview(eventid, data);
};