import { IgetReviewData } from '@/types/review.types'
import React from 'react'

const Getreview = ({reviews}:{reviews:IgetReviewData[]}) => {
    console.log(reviews,'reviewsdata')
  return (
    <div>Getreview</div>
  )
}

export default Getreview