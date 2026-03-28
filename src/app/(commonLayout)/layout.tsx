import React from 'react'

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6">{children}</div>
  )
}

export default CommonLayout