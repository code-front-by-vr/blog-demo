import React, {useState} from 'react'
import {useAppSelector, useAppDispatch} from '../../redux/store'
import {setLang} from '../../redux/lang-slice'

import {Hamburger} from '../hamburger/Hamburger'
import {UserPick} from '../user-pick/UserPick'
import {SearchBar} from '../searchbar-menu/SearchBar'
import {SideBar} from '../sidebar-menu/SideBar'

import searchIcon from '../../assets/search-svg.svg'

import type {LangType} from '../../types'

export function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const {lang} = useAppSelector(state => state.lang)
  const dispatch = useAppDispatch()

  function handleChangeLang(event: React.ChangeEvent<HTMLSelectElement>): void {
    dispatch(setLang(event.target.value as LangType))
  }

  return (
    <header className="mb-4 position-relative">
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
        <div className="d-flex align-items-center">
          <button className="btn btn-link p-0 me-3" onClick={() => setMenuOpen(!menuOpen)}>
            <Hamburger opened={menuOpen} />
          </button>
          <select
            className="form-select form-select-sm w-auto me-3"
            onChange={handleChangeLang}
            value={lang}
          >
            <option value="en">EN</option>
            <option value="ru">RU</option>
          </select>
        </div>

        {isSearchOpen ? (
          <SearchBar onClose={() => setIsSearchOpen(false)} />
        ) : (
          <>
            <div className="d-flex align-items-center ms-auto">
              <button
                type="button"
                className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{width: '36px', height: '36px'}}
                onClick={() => setIsSearchOpen(true)}
              >
                <img
                  src={searchIcon}
                  className="img-fluid"
                  style={{width: '18px', height: '18px'}}
                  alt="search"
                />
              </button>
              <UserPick>Victoria R.</UserPick>
            </div>
          </>
        )}
      </nav>

      {menuOpen && <SideBar lang={lang} onClose={() => setMenuOpen(false)} />}
    </header>
  )
}
