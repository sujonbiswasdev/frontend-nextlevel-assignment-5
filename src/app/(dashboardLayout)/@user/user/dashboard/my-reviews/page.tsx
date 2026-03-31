import { getSessionAction } from '@/actions/auth.actions'
import { getMyReviews } from '@/actions/review.actions'
import Getreview from '@/components/module/reviews/Getreview'
import { TPagination } from '@/types/event.types'
import { IgetReviewData } from '@/types/review.types'
import React from 'react'

const ReviewsPage = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search=await searchParams
  const reviews= await getMyReviews(search)
  const userinfo = await getSessionAction();
  const role=userinfo.data?.role
  return (
    <div>
      <Getreview role={role as string} reviews={reviews.data as IgetReviewData[]} pagination={reviews.pagination as TPagination}/>
    </div>
  )
}

export default ReviewsPage