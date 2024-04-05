
import { Menubar } from 'primereact/menubar';
import React, { useState } from 'react';
import { Badge } from 'primereact/badge';
import 'primeicons/primeicons.css';
import { useDispatch } from 'react-redux';
import { removeName, removeToken } from '../../features/auth/authSlice';
import apiSlice from '../../app/apiSlice';
import { useNavigate } from 'react-router-dom';
import Login from '../entery/login';
import { Dialog } from 'primereact/dialog';

export default function NavUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false);
    const  { _id:userId,firstname,lastname, email,roles}=useAuth()
    const username=`${firstname} ${lastname}`
    const [name, setName] = useState(username)
    const click = () => {
        dispatch(removeName())
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate('/');
    }

    const itemRenderer = (item) => (

        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',

        },
        {
            label: 'Products',
            icon: 'pi pi-th-large',
            url: "/products"
        },
        localStorage.getItem("token") ? {
            label: 'My Basket',
            icon: 'pi pi-shopping-bag',
            url: "/basket"
        } : {
            label: 'Login',
            icon: 'pi pi-user',
            command: () => {setVisible(true) }
        },
        localStorage.getItem("token") ? {
            label: 'Contact',
            icon: 'pi pi-envelope',
            badge: 3,
            template: itemRenderer
        } : <></>,
        localStorage.getItem("token") ? {
            label: 'Logout',
            icon: 'pi pi-user',
            command: click
        } : <></>
    ];




      

    

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = <div>Hello {name}</div>

    return (

        <div>
            <Menubar model={items} start={start} end={end} style={{ backgroundColor: "black", color: "white", fontSize: "15px" }} />

            <Dialog header="Welcome:)" visible={visible} onHide={() => setVisible(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <Login from={"products"} />
            </Dialog></div>
    )
}
