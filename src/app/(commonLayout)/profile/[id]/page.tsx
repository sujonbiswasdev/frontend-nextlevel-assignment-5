import { getUserByIdAction } from '@/actions/user.actions'
import ErrorBoundary from '@/components/ErrorBoundary'
import SingleProfile from '@/components/SingleProfile'
import { IBaseUser } from '@/types/user.types'
import React from 'react'

const SingleProfilePage = async({ params }: { params: Promise<{ id: string }> }) => {

    const id = await params
    const userprofile = await getUserByIdAction(id.id)
       if (!userprofile?.data || !userprofile.success) {
        return (
            <div className="p-4 text-red-500">
                Failed to load users
            </div>
        );
    }
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Unable to load profile.</div>}>
        <div className='py-10 mt-10'>
        <SingleProfile user={userprofile.data as IBaseUser} />
        </div>
      </ErrorBoundary>
    </React.Suspense>
  )
}

export default SingleProfilePage