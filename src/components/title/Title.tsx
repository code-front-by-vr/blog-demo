import React from 'react'

export const Title = ({children}: {children: React.ReactNode}): React.ReactElement => {
  return <h1 className="fw-bold">{children}</h1>
}
