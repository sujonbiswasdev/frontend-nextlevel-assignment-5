import { getSessionAction } from '@/actions/auth.actions'
import ProfileUserInfo from '@/components/shared/ProfileCardContent'
import { IBaseUser } from '@/types/user.types'
import React from 'react'

const ProfilePage = async() => {
    const userinfo=await getSessionAction()
  return (
    <div>
        <ProfileUserInfo user={userinfo.data as IBaseUser}/>
    </div>
  )
}

export default ProfilePage