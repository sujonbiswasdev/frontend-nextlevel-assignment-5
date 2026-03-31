import { ChangePasswordForm } from '@/components/auth/ChangePassword'
import ErrorBoundary from '@/components/ErrorBoundary'
import ErrorFallback from '@/components/ErrorFallback'
import React from 'react'

const SettingPage = () => {
  return (
    <div>
      <ErrorBoundary fallback={<ErrorFallback title="Password Change Error" message="Something went wrong while attempting to change your password." />}>
        <ChangePasswordForm/>
      </ErrorBoundary>
    </div>
  )
}

export default SettingPage