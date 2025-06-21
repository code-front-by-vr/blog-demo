import React from 'react'
import {TabsProps} from '../../types'
import {NavLink} from 'react-router'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import {setActiveTab} from '../../redux/tabs-slice'

export const Tabs = ({tabs}: TabsProps): React.ReactElement => {
  const activeIndex = useAppSelector(state => state.tabs.activeIndex)
  const dispatch = useAppDispatch()

  const handleToggleTab = (index: number): void => {
    dispatch(setActiveTab(index))
  }

  return (
    <ul className="nav nav-underline mb-4 border-bottom">
      {tabs.map(({label, path}, index) => {
        const isActive = index === activeIndex
        const linkClass = `nav-link px-4 text-primary-emphasis ${isActive ? ' active' : ''}`

        return (
          <li key={index} className="nav-item">
            <NavLink to={path} className={linkClass} onClick={() => handleToggleTab(index)}>
              {label}
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}
