import React from 'react'
import style from './Hamburger.module.css'
import menuHamburger from '../../assets/menu-hamburger.svg'
import menuClose from '../../assets/menu-hamburger-close.svg'

export const Hamburger = ({opened}: {opened: boolean}): React.ReactElement => {
  return (
    <div className={style.wrapper}>
      <div className={style.hamburger}>
        <img src={opened ? menuClose : menuHamburger} className={style.img} alt="hamburger" />
      </div>
    </div>
  )
}
