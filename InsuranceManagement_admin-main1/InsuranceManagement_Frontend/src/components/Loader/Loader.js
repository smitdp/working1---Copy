import React from 'react'
import styles from './Loader.module.scss'
import logo from '../../assets/Images/cybSureLogoColor.svg'
const Loader = () => {
  return (
    <div className={styles['loader-container']}>
        <img src={logo}/>
    </div>
  )
}

export default Loader