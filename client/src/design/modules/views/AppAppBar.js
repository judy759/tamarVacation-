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


const rightLink = {
  fontSize: 16,
  color: '#f36',
  ml: 3,
};

function AppAppBar() {
  const dispatch=useDispatch()
  // const navigate = useNavigate();
  // const logoutClick = () => {
  //   log
  //   if(localStorage.getItem("token")){
  //   console.log("hhhhhhhhhhh");
  //   console.log("localstor",localStorage.getItem("token"))
  //   localStorage.setItem("token",null)
  //   console.log("localstorafter",localStorage.getItem("token"))
  //   }
  // };


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
      // {
      //     label: '',
      //     icon: 'pi pi-shopping-cart',
      //     url: '/Sidebar2'
      // },
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
      {
          label: 'צור קשר',
          icon: 'pi pi-envelope'
      }
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
        {/* <Toolbar sx={{ justifyContent: 'space-between' }}>
         
          <Box sx={{ color: "#ffffff",flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="#ffffff"
            style={{color:'#ffffff'}}
            to="/"
            sx={{ fontSize: 24 }}
            icon= 'pi pi-home'
          >
            {'ראשי'}
          </Link>
          <Box sx={{ color: "#ffffff",flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="#ffffff"
            style={{color:'#ffffff'}}
            to="/Package"
            sx={{ fontSize: 24 }}
          >
            {'רכישות קודמות'}
          </Link>
          <Box sx={{ color: "#ffffff",flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="#ffffff"
            style={{color:'#ffffff'}}
            to="/UserList"
            sx={{ fontSize: 24 }}
          >
            {'עריכת נופש-מנהל בלבד'}
          </Link>
          <Box sx={{ color: "#ffffff",flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="#ffffff"
            style={{color:'#ffffff'}}
            onClick={logoutClick}
            to="/SignIn"
            sx={{ fontSize: 24 }}>
             <img src={img1} style={{ marginRight: '0.5rem', width: '24px', height: '24px', opacity: '0.5' ,color:"#ffffff"}} />
          
            {'להתנתק'}
          </Link>
          <Box sx={{ color: "#ffffff",flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="#ffffff"
            style={{color:'#ffffff'}}
            to="/Shop"
            sx={{ fontSize: 24 }}
          >
            {'קנית נופשים'}
          </Link>
          <Box sx={{ color: "#f36", flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="white"
              variant="h6"
              underline="none"
              style={{color:'#fff5f8'}}
              to="/SignIn"
              sx={{ fontSize: 24 }}
            >
              {'Sign In'}
              <br />
            </Link>
            <Link
              variant="h6"
              underline="none"
              to="/SignUp"
              style={{color:'#fff5f8'}}
              sx={{ ...rightLink, color: '#ffffff' }}

            >
              {'Sign Up'}
            </Link>
          </Box>
        </Toolbar>
      </AppBar> */}
      
    </div>
  );
}

export default AppAppBar;
