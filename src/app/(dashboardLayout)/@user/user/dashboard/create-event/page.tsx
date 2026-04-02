
import ErrorBoundary from '@/components/ErrorBoundary'
import { CreateEvent } from '@/components/module/event/CreateEvent'
import React from 'react'

const CreateEventPage = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Something went wrong while loading the Create Event form.</div>}>
        <div>
          <CreateEvent />
        </div>
      </ErrorBoundary>
    </React.Suspense>
  )
}

export default CreateEventPage