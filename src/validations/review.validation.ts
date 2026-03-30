import z from "zod";

   export const createReviewsData = z.object({
        rating: z.number().min(1).max(5),
        comment: z.string(),
        parentId: z.string().optional()
    });