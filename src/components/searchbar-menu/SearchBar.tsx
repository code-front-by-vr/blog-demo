import React, {useRef, useState} from 'react'
import {useNavigate} from 'react-router'

import {Input} from '../input/Input.tsx'
import {useClickOutside} from '../../hooks/useClickOutside'
import {UserPick} from '../user-pick/UserPick'

interface SearchBarProps {
  onClose: () => void
}

export function SearchBar({onClose}: SearchBarProps): React.ReactElement {
  const navigate = useNavigate()
  const searchRef = useRef<HTMLFormElement | null>(null)
  const [value, setValue] = useState('')

  useClickOutside(searchRef, onClose)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    console.log(value)

    if (!value) {
      navigate('/posts/all/1')

      return
    }

    navigate(`/posts/search/${value}/1`)
  }

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value)
  }

  function handleClickCloseSearch(): void {
    onClose()
    setValue('')
    navigate(`/posts/all/1`)
  }

  return (
    <form className="d-flex w-100 align-items-center" ref={searchRef} onSubmit={handleSubmit}>
      <div className="d-flex flex-grow-1 me-2">
        <Input
          type="text"
          value={value}
          className="form-control w-100 "
          placeholder="Search..."
          autoFocus
          onChange={handleChangeInput}
        />
      </div>
      <button type="button" className="btn btn-sm me-2" onClick={handleClickCloseSearch}>
        ✕
      </button>
      <UserPick>Victoria R.</UserPick>
    </form>
  )
}
