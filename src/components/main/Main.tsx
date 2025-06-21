import React from 'react'

export function Main({children}: {children: React.ReactElement}): React.ReactElement {
  return <main className="flex-grow-1">{children}</main>
}
