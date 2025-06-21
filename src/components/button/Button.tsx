import React from 'react'
import style from './Button.module.css'

export function Button({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}): React.ReactElement {
  return (
    <button onClick={onClick} className={style.btn}>
      {children}
    </button>
  )
}
