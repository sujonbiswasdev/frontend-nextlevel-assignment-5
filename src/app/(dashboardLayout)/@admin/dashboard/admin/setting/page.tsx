
import { getSessionAction } from '@/actions/auth.actions'
import React from 'react'

const SettingPage = async() => {
  const userinfo=await getSessionAction()
  console.log(userinfo,'uerinfo')
  return (
    <div>SettingPage</div>
  )
}

export default SettingPage