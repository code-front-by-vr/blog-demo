import React from 'react'
import {NavLink} from 'react-router'
import type {BreadcrumbItem} from '../../types'

interface BreadCrumbProps {
  items: BreadcrumbItem[]
}

export function BreadCrumb({items = []}: BreadCrumbProps) {
  return (
    <nav className="mb-3">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item text-secondary ${
              index === items.length - 1 ? 'active' : ''
            }`}
          >
            {index === items.length - 1 ? (
              item.label
            ) : (
              <NavLink
                className="link-dark link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover"
                to={item.to}
              >
                {item.label}
              </NavLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
