import React, {useState} from 'react'
import {Outlet} from 'react-router'
import {Header} from '../header/Header'
import {Title} from '../title/Title'
import {Main} from '../main/Main'
import {Container} from '../container/Container'
import {BreadCrumb} from '../bread-crumb/BreadCrumb'
import {Footer} from '../footer/Footer'

import type {BreadcrumbItem} from '../../types'

export function Layout() {
  const [title, setTitle] = useState<string>('')
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([])

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <Main>
        <Container>
          {breadcrumbs.length > 0 && <BreadCrumb items={breadcrumbs} />}
          {title && <Title>{title}</Title>}
          <Outlet context={{title, setTitle, setBreadcrumbs}} />
        </Container>
      </Main>
      <Footer container={Container} />
    </div>
  )
}
