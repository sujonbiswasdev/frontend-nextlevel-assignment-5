import { getSessionAction } from '@/actions/auth.actions'
import { getMyReviews } from '@/actions/review.actions'
import Getreview from '@/components/module/reviews/Getreview'
import { IgetReviewData } from '@/types/review.types'
import React from 'react'

const ReviewsPage = async() => {
  const reviews= await getMyReviews()

  return (
    <div>
      <Getreview reviews={reviews.data as any[]}/>
    </div>
  )
}

export default ReviewsPage