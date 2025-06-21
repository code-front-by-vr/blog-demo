import React from 'react'
import style from './UserPick.module.css'

export const UserPick = ({children}: {children: string}): React.ReactElement => {
  const initials = children
    .split(' ')
    .map(word => word[0])
    .join('')
  return (
    <div className={style.wrapper}>
      <div className={style.initials}>{initials}</div>
      <div>{children}</div>
    </div>
  )
}
