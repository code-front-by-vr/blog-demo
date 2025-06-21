import React from 'react'

export const Container = ({children}: {children: React.ReactNode}): React.ReactElement => {
  return <div className="container-fluid w-75">{children}</div>
}
