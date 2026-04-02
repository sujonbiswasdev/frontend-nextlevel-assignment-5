import ErrorBoundary from '@/components/ErrorBoundary'
import CreateInvitationForm from '@/components/module/invitation/CreateInvitation'
import React from 'react'

const CreateInvitationPage = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Something went wrong while loading the Create Invitation form.</div>}>
        <div>
          <CreateInvitationForm />
        </div>
      </ErrorBoundary>
    </React.Suspense>
  )
}

export default CreateInvitationPage