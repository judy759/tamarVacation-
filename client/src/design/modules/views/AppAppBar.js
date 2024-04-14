import * as React from 'react';
import Box from '@mui/material/Box';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AppBar from '../components/AppBar';
import Toolbar from '../components/ToolBar';
import SignIn from '../../SignIn';
import SignUp from '../../SignUp';
import { Routes, Route } from 'react-router-dom'; 
import { blue } from '@mui/material/colors';
import ResponsiveDemo from '../../shop/ResponsiveDemo'
import { useState } from 'react'; 
import { Menubar } from 'primereact/menubar';
import logo from '../components/logo.png';
import {useRegisterMutation,useLoginMutation} from '../../../Store/Slices/authApiSlice'
import { useEffect } from 'react';
import { Router } from 'react';
import img1 from '../../../images/system-solid-6-shopping.gif'
import img2 from '../../../images/system-solid-6-shopping.gif'
import { removeToken } from '../../../Store/Slices/authSlice';

import { useDispatch } from 'react-redux';


function AppAppBar() {
  const dispatch=useDispatch()
 


  const funci =() =>{
    console.log("localstor",localStorage.getItem("token"))
   };
  const [menuClicked, setMenuClicked] = useState(false);

  const items = [
      {
          label: 'בית',
          icon: 'pi pi-home',
          url: '/'
      },
      {
          label: 'התחבר',
          icon: 'pi pi-star',
          url: '/SignIn',
      },
      {
          label: 'הירשם',
          icon: 'pi pi-user',
          url: '/SignUp'
      },
      {
          label: 'התנתק',
          icon: 'pi pi-lock-open',
          command: () => { console.log("log out!");  dispatch(removeToken()) },
          url: '/SignIn'
      },
      {
          label: 'רכישות קודמות',
          icon: 'pi pi-history',
          url: '/Package'
      },
      {
        label: 'כך זה יוצג למשתמש-חבילות הנופשים',
        icon: 'pi pi-shopping-cart',
        url: '/Shop'
    },
    {
      label: 'עריכת נופשים',
      icon: 'pi pi-file-edit',
      url: '/UserList'
  },

      {
          label: 'משתמשים',
          icon: 'pi pi-search',
          items: [
              {
                  label: 'כל המשתמשים',
                  icon: 'pi pi-bolt',
                  url: '/MNGUser'
              },
              {
                  label: 'משתמשים רשומים',
                  icon: 'pi pi-server',
                  url: '/MNGUserRegister'
              },
             
          ]
      },
      
  ];

  const handleClick = () => {
      setMenuClicked(!menuClicked);
  };

  return (
<div>
      {/* <AppBar position="fixed"> */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>
        <div className="flex items-center justify-between card" style={{ padding: '0.5rem' }}>
          {/* <img className="w-9 sm:w-8em xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={logo} alt="Logo" style={{ width: '3%' }}/> */}
          <Menubar model={items} onClick={handleClick} style={{ width: '100%', backgroundColor: '#fffff', color: '#b12c16' }} />
        </div>
      </div>


    </div>
    
  );
}

export default AppAppBar;
