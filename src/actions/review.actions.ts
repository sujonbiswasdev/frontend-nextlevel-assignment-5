"use server"
import { reviewService } from "@/services/review.services";
import { ICreatereviewData, TResponseReviewData } from "@/types/review.types";

export const createReview = async (eventid: string, data: ICreatereviewData) => {
  return await reviewService.createReview(eventid, data);
};
export const getMyReviews = async (params?: any, options?: any) => {
  return await reviewService.getMyReview(params, options);
};

export const deleteReview = async (id: string, options?: any) => {
  return await reviewService.deleteReview(id, options);
};
export const updateReview = async (
  reviewId: string,
  updateData: Partial<{
    comment: string;
    rating: number;
  }>,
  options?: any
) => {
  return await reviewService.updateReview(reviewId, updateData, options);
};