import React from 'react'
import AdminNav from '../../components/AdminNav/AdminNav'
import styles from './AdminHomePage.module.scss'
import { Outlet } from 'react-router-dom'

const AdminHomePage = () => {
  return (
    <div className={styles["main-grid-container"]}>
      <div className={styles["side-nav-container"]}>
        <AdminNav />
      </div>
      <div className={styles["main-view-container"]}>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminHomePage