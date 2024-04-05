import React, { useState } from 'react'; 
import { Menubar } from 'primereact/menubar';
import logo from '../components/logo.png';
import { Link } from 'react-router-dom';

export default function BasicDemo() {
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
            url: '/SignIn'
        },
        {
            label: 'קניות',
            icon: 'pi pi-history',
            url: '/Package'
        },
        {
            label: 'הירשם',
            icon: 'pi pi-user',
            url: '/SignUp'
        },
        {
            label: 'התנתק',
            icon: 'pi pi-lock-open',
            url: '/logout'
        },
        {
            label: 'רכישות קודמות',
            icon: 'pi pi-history',
            url: '/Package'
        },
        {
            label: 'קניות',
            icon: 'pi pi-history',
            url: '/Package'
        },
        {
            label: '',
            icon: 'pi pi-shopping-cart',
            url: '/cart'
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Components',
                    icon: 'pi pi-bolt'
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server'
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ];

    const handleClick = () => {
        setMenuClicked(!menuClicked);
    };

    return (
        <div className="flex justify-between items-center bg-gray-800 p-4" style={{ width: '100%', backgroundColor: '#ffffff', color: 'white' }}>
            <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={logo} alt="logo" />
            <Menubar model={items} onClick={handleClick} style={{ width: '100%', backgroundColor: '#28282a', color: 'white' }} />
        </div>
    )
}