import React from 'react'
import {NavLink} from 'react-router'
import {useAppDispatch} from '../../redux/store'
import {authExit} from '../../redux/auth-slice'

import {locales} from '../../config/locales'
import {UserPick} from '../user-pick/UserPick'

import type {LangType} from '../../types'

const navLinks = [
  {to: '/', labelKey: 'main'},
  {to: '/auth/sign-in', labelKey: 'signIn'},
  {to: '/auth/sign-up', labelKey: 'registration'},
  {to: '/posts/new', labelKey: 'newPost'},
]

interface SideBarProps {
  lang: LangType
  onClose: () => void
}

export function SideBar({lang, onClose}: SideBarProps): React.ReactElement {
  const dispatch = useAppDispatch()

  function handleClickExit(event) {
    event?.preventDefault()
    dispatch(authExit())
    location.reload()
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100"
      style={{zIndex: 1050}}
      onClick={onClose}
    >
      <aside
        className="sidebar bg-white position-fixed top-0 start-0 vh-100 shadow p-3"
        style={{width: '250px', zIndex: 1055}}
        onClick={e => e.stopPropagation()}
      >
        <button className="btn btn-sm btn-close mb-3" onClick={onClose}></button>
        <UserPick>Victoria R.</UserPick>

        <ul className="nav flex-column mt-3">
          {navLinks.map(({to, labelKey}) => (
            <li className="nav-item" key={to}>
              <NavLink
                className={({isActive}) =>
                  isActive ? 'nav-link active text-dark fw-semibold' : 'nav-link text-dark'
                }
                to={to}
                onClick={onClose}
              >
                {locales[lang].header[labelKey]}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-3 border-top">
          <a
            role="button"
            href="#"
            className="btn btn-outline-secondary w-100"
            onClick={handleClickExit}
          >
            {locales[lang].header.logOut}
          </a>
        </div>
      </aside>
    </div>
  )
}
