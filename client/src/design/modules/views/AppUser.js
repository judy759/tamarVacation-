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
import { Badge } from 'primereact/badge';
import { useEffect } from 'react';
import { Router } from 'react';
import img1 from '../../../images/system-solid-6-shopping.gif'
import img2 from '../../../images/system-solid-6-shopping.gif'
import { removeToken } from '../../../Store/Slices/authSlice';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { useGetUserQuery } from '../../../Store/Slices/authApiSlice';
import { useGetVacationsQuery } from '../../../Store/Slices/vacationApiSlice';
import useAuth from '../../../Store/app/useAuth'
import useAxios from 'axios-hooks'

// const rightLink = {
//   fontSize: 16,
//   color: '#f36',
//   ml: 3,
// };


   
  
function AppUser() {
  const [{ data, loading, error:error2 }, refetch] = useAxios(
    {
      url: 'http://localhost:4444/api/user',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "authorization":'Bearer '+localStorage.getItem("token")
      }
    }
    
  )
  const handleSignInAlert = () => {
    
  alert("You have to sign in...");
}
  const dispatch=useDispatch()

  const token=localStorage.getItem("token")
  const  { _id:userId,firstname,lastname, email,roles}=useAuth()
  const username=`${firstname} ${lastname}`
  const [menuClicked, setMenuClicked] = useState(false);
  const [len, setLen] = useState(0);
let ind=0
    let dataUser={}
  useEffect(() => {
      ind = data?.findIndex((i) => i._id === userId);

    if(data)
    {

    const len1=data[ind].shoppingCart.length;
      setLen(len1)
      refetch()
      //console.log("ttt",token);
    }

    
  else
  {
    console.log("no data");
  }

  
    // {
    //     if (ind !== -1 && data[ind]?.shoppingCart) {
    //   let len2 = data[ind].shoppingCart.length;
    //   setLen(len2)
    //  const dataUser=data[ind];
    // }
    // }
    //   setLen(data[ind]?.shoppingCart?.length);
    //   console.log("data",data);
  }, [ data]);
 const shoppingCartIcon = (
    <Button icon="pi pi-shopping-cart">
      <Badge value={len}></Badge>
    </Button>
  );

  const items = [
    {
      label: 'בית',
      icon: 'pi pi-home',
      command:token? null :handleSignInAlert,
      url: token?  '/' : ''
      
    },
    {
      label: 'התחבר',
      icon: 'pi pi-star',
      url:   '/SignIn' 
    },
    {
      label: 'הירשם',
      icon: 'pi pi-user',
      url:  '/SignUp' 
    },
    {
      label: 'התנתק',
      icon: 'pi pi-lock-open',
      command: () => { 
        if (token) {
          dispatch(removeToken());
          
        } else {
          handleSignInAlert();
          
        }
      },
      url: token ? '/SignIn' : ''
    },
    {
      label: 'רכישות קודמות',
      icon: 'pi pi-history',
      command:token? null :handleSignInAlert,
      url: token?  '/Package' : ''
    },
    {
      label: '',
      icon: shoppingCartIcon,
     // command=>():{token? null :handleSignInAlert},
     command: token ? null : () => { handleSignInAlert(); },
           url: token?  '/Sidebar2' : ''
    },
    {
      label: 'קניות',
      icon: 'pi pi-shopping-cart',
      command:token? null :handleSignInAlert,
      url: token?  '/Shop' : ''
    },

    {
      label: 'צור קשר',
      icon: 'pi pi-envelope',
      command: token ? null : handleSignInAlert,
      url: token ? '/Contact' : ''
    }
    
  ];

  const handleClick = () => {
    setMenuClicked(!menuClicked);
  };
  // useEffect(() => {
  //   if ( data) {
  //     console.log("k111111111", data);
  //     const len2 = data[ind]?.shoppingCart.length;
  //     setLen(len2);
  //   }
  // }, [data]); // Make sure to include 'ind' if it's used inside the effect
  

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

export default AppUser;
