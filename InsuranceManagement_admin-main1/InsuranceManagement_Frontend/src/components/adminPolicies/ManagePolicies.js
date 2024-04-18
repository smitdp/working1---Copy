import React from 'react'
import AddPolicies from './AddPolicy'
import AdminPolicies from './AdminPolicies'
import UserPoliciesTable from './UserPoliciesTable'
import styles from './adminPolicies.module.scss'

const ManagePolicies = () => {
  return (
    <div className={styles.mainContainer}>
        <UserPoliciesTable />
        <AdminPolicies/>
    </div>
  )
}

export default ManagePolicies