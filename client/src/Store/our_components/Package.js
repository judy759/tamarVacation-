import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { useGetVacationsQuery } from '../Slices/vacationApiSlice';
import { Rating } from 'primereact/rating';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { Tag } from 'primereact/tag';
import { useGetUserQuery } from '../Slices/authApiSlice';
import { Card } from '@mui/material';
import AppAppBar from '../../design/modules/views/AppAppBar';
import 'primeicons/primeicons.css';
import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';
import useAuth from '../app/useAuth';
        

const Shop = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useGetVacationsQuery();
    const { data: dataUsers, isErroru, erroru, isLoadingu, isSuccessu } = useGetUserQuery();
    const  { _id:userId,firstname,lastname, email,roles}=useAuth()
    const username=`${firstname} ${lastname}`
    const ind = dataUsers?.findIndex((i) => i._id === userId);
   const [visibleBuying, setVisibleBuying] = useState(false);
   console.log("hh{1",ind);

    const [arrnav, setArrnav] = useState([]);
    

    const listItem = (vacation, index) => {
    //   console.log("111",vacation.images[0]);  
        console.log("hh{2",vacation);
        const pairs = data?.map(element => {
            return {
                id: element._id,
                name: element.name // Assuming the name field exists in your data
            };
        });
          //console.log("pairs:::", pairs);
        const findNameById = (id2) => {
            pairs?.forEach(element => {
            });


            const pair = pairs?.find((e) => e.id === id2);
            return pair ? pair.name : "";
        };
        return (

            <div className="col-12" key={vacation._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                <i className={PrimeIcons.CHECK_CIRCLE} style={{ fontSize: '2.5rem' }}></i>
                <i className="PrimeIcons.check-circle" style={{ fontSize: '2.5rem' }}></i>
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={"http://localhost:4444/uploads/"+vacation.images[0].split("\\")[2]}  /> */}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900" >הרכישה שלך: {findNameById(vacation.vacations)}</div>
                            <div className="text-xl font-bold">     :  תאריך הזמנה     
<br></br>
                                  {vacation.purchaseDate}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    
                                    <span className="font-semibold"> כמות {vacation.quantity}</span>
                                    
                                </span>
                            </div>
                            
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            {/* <span className="text-2xl font-semibold">${vacation.price}</span> */}
                           

                        </div>
                    </div>
                </div>
            </div>
        );
    };



    const listTemplate = (vacations) => {
        console.log("hh{3",vacations?.vacationPackage);
        return <div className="grid grid-nogutter">{vacations?.vacationPackage?.map((vacation, index) => listItem(vacation, index))}</div>;
    };


    const header = () => {
        if (!dataUsers) {
            return <div>Loading...</div>;
        }

       
        return (
            <>
                {/* <AppAppBar /> */}
                {/* <div className="flex justify-content-end ">
                    <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
                    &nbsp; &nbsp;&nbsp;&nbsp;
                    {localStorage.getItem("token") && <Button onClick={() => setVisibleBuying(true)} icon="pi-shopping-bag" rounded text raised severity="secondary" aria-label="Bookmark" style={{ position: "absolute", left: '40px' }} />}
                    <DataViewLayoutOptions layout="grid" />
                </div> */}


            </>
        );
    };
if(!dataUsers)
{
    return "isLoading..."
}
    return (
        <div className="card">
            <DataView value={dataUsers[ind]} listTemplate={listTemplate} layout="grid" header={header()} />
        </div>
    );

}

export default Shop;
