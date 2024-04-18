import React, { useContext, useEffect } from 'react'

import UserHomePage from './UserHomePage/UserHomePage';
import { UserInformationContext } from '../context/UserInformationContext';
import getCurrentUserId from '../utils/getCurrentUserId';
import { useUserInfo } from '../utils/useUserInfo';
import LandingPage from './LandingPage/LandingPage';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminHomePage from './AdminHomePage/AdminHomePage';

const AppLayout = () => {
    const token = localStorage.getItem("login");
    const userId = getCurrentUserId();
    const information = useUserInfo(userId);

    const navigate = useNavigate()
    console.log("APP LAYOUT");
    useEffect(() => {
      !token && navigate('/')
    }, [token])

  return (
    <div>
        {!token && <LandingPage/>}
        {(token  && information.information.roleName === "Claimant") && <UserHomePage/>}
        {(token  && information.information.roleName === "Insurer") && <AdminHomePage/>}
    </div>
  )
}

export default AppLayout;