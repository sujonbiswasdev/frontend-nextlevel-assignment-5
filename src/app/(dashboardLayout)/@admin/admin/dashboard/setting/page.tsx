
import { getSessionAction } from '@/actions/auth.actions'
import { ChangePasswordForm } from '@/components/auth/ChangePassword'
import React from 'react'

const SettingPage = async() => {
  const userinfo=await getSessionAction()
  return (
    <div>
      <ChangePasswordForm/>
    </div>
  )
}

export default SettingPage