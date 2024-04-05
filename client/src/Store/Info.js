// import React, { useState, useEffect, useRef } from 'react';
import './MNGHome.css';
 import { Galleria } from 'primereact/galleria';
// import { Button } from 'primereact/button';
// import { Sidebar } from 'primereact/sidebar';
// import { useGetVacationsQuery, useAddVacationToMyshoppingCartMutation, useDeleteVacationToMyshoppingCartMutation,useAddTovacationPackageMutation } from './Slices/authApiSlice';
// import useAuth from './app/useAuth';
// import { useGetUserQuery } from './Slices/authApiSlice';
 import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useGetVacationsQuery, useAddVacationToMyshoppingCartMutation, useDeleteVacationToMyshoppingCartMutation,useAddTovacationPackageMutation } from './Slices/vacationApiSlice';
import { Rating } from 'primereact/rating';
import { Sidebar } from 'primereact/sidebar';
import { useGetUserQuery } from './Slices/authApiSlice';
import useAuth from './app/useAuth';
import { Card } from 'primereact/card';
import FinishBuying from './our_components/FinishBuying'



// Import your images
import beachImage from '../../src/design/modules/views/images/bag-beach-accessories-kept-sand.jpg';
import mountainImage from '../../src/design/modules/views/images/hammocks-umbrella-placed-near-large-pool.jpg';
import cityImage from '../../src/design/modules/views/images/beautiful.jpg';
import forestImage from '../../src/design/modules/views/images/straw-hat-towel-kept-beach-chairs.jpg';

const Info = () => {
    const { data:data2 } = useGetVacationsQuery();
    console.log("data2--",data2);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const vacationId = params.get('vacationId') || params.get('e');
    console.log("vacationId      ",vacationId);
    const vacation = data2?.find(item => item._id === vacationId);
    console.log("vacation   ",vacation);

    const responsiveOptions = [
        { breakpoint: '991px', numVisible: 4 },
        { breakpoint: '767px', numVisible: 3 },
        { breakpoint: '575px', numVisible: 1 }
    ];

    const itemTemplate = (item) => (
        <img
            src={item ? `http://localhost:4444/uploads/${item.split("\\")[2]}` : ""}
            alt="Gallery"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
    );

    const thumbnailTemplate = (item) => (
        <img
            src={item ? `http://localhost:4444/uploads/${item.split("\\")[2]}` : ""}
            alt={item}
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover'}}
        />
    );
    const startDate = new Date(vacation?.startDate.split('T')[0]);
    const endDate = new Date(vacation?.endDate.split('T')[0]);
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const  { _id:userId,firstname,lastname, email,roles}=useAuth()
   const username=`${firstname} ${lastname}`
    const { data, isLoading, isError, error } = useGetVacationsQuery();
    const { data: dataUsers, isErroru, erroru, isLoadingu, isSuccessu } = useGetUserQuery();
    console.log("dataaaaaaaaaaaaaaaaaaa",data);
    const ind = dataUsers?.findIndex((i) => i._id === userId);
    const [visibleBuying, setVisibleBuying] = useState(false);
    const [visible, setVisible] = useState(false);
    const [addVacationToMyshoppingCart] = useAddVacationToMyshoppingCartMutation();
    const [deleteVacationToMyshoppingCart] = useDeleteVacationToMyshoppingCartMutation()
    const [addTovacationPackage] = useAddTovacationPackageMutation()
    const handleBuyVacation = (vacationId) => {
        const x = data?.find(i => i._id === vacationId);
        addVacationToMyshoppingCart({ userId, vacationId })
        setVisibleBuying(true);
    };
    const func = () => {
        addTovacationPackage({ userId })
        
        navigate('/FinishBuying')
    }
    
    const handleIncreaseQuantity = (vacationId) => {
        console.log("vacationId", vacationId);
        addVacationToMyshoppingCart({ userId, vacationId })
        setVisibleBuying(true);
        // Handle increase quantity logic
    };
    const pairs = data?.map(element => {
        return {
            id: element._id,
            name: element.name // Assuming the name field exists in your data
        };
    });
    const findNameById = (id2) => {
        const pair = pairs?.find((e) => e.id === id2);
        return pair ? pair.name : "";
    };
    const navigate = useNavigate()
    const handleDecreaseQuantity = (vacationId) => {
        deleteVacationToMyshoppingCart({ userId, vacationId })
    };
    return (<>
        <br></br><br></br><br></br>
        <div style={{ margin: '20px auto', maxWidth: '800px', textAlign: 'center',backgroundColor:'#fff5f8',size:'220px' }}>
            <h1 style={{ fontSize: '36px', marginBottom: '20px' ,fontFamily:"almony"}}>{vacation?.name}</h1>

            <div className="card" style={{ maxWidth: '800px', margin: 'auto' }}>
                <Galleria
                    value={vacation?.images}
                    responsiveOptions={responsiveOptions}
                    numVisible={5}
                    item={itemTemplate}
                    thumbnail={thumbnailTemplate}
                    circular
                    autoPlay
                    transitionInterval={2000}
                    style={{ borderRadius: '8px' }}
                />
            </div>

            <div style={{ padding: '20px', marginTop: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                
                <div className="p-4 border-1 surface-border surface-card"> 
   
   <div className="flex flex-wrap align-items-center justify-content-between gap-2 ">
   </div>                    
  
   <div className="flex flex-column align-items-center gap-2 py-5">
       <i className="pi pi-map-marker blue" ></i> 
       <div className="text-2xl font-bold text-900">{vacation?.name}</div>
       <div className="text-2xl font-bold">{vacation?.location}</div>
       
       <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
           <div className="flex flex-column align-items sm:align-items-start gap-3">
               <div className="text-xl font-bold">{vacation?.description}</div>
               <div className="flex align-items-center gap-2">
                   <span className="flex align-items-center gap-2">
                       <i className="pi pi-tag"></i><div className="text-1xl font-bold">המחיר</div><span className="font">{vacation?.category}</span>
                       
                   </span>
               </div>
           </div>
       </div>
       
       <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
           <span className="text-2xl font-semibold">${vacation?.price}</span>
       </div>
       <br></br>
       <span className="font-semibold">מתחיל: {vacation?.startDate.split('T')[0]}</span>
       <span className="font-semibold">מסתיים: {vacation?.endDate.split('T')[0]}</span>
       <br></br>
       <div className="text-1xl font-bold">{differenceInDays} ימים <i className="pi pi-sun"></i></div>
   </div>
   <div className="flex align-items-center justify-content-between">
       {console.log(vacation?._id)}
       {/* <Button label='רוצה לדעת עוד' className="button2" icon="pi pi-map-marker blue" onClick={() => {handleMoreInfo(vacation?._id)  }} style={{backgroundColor: '', color: 'white'}} /> */}
       <Button label='תוסיף לעגלה' className="button2" icon="pi pi-cart-plus" onClick={() => {  handleBuyVacation(vacation?._id)}} style={{backgroundColor: '', color: 'white'}}  />
   </div>
</div>
            </div>
        </div>
       
<Sidebar visible={visibleBuying} onHide={() => setVisibleBuying(false)} className="w-full md:w-20rem lg:w-30rem">
                    <div className="card flex flex-column justify-content-center align-items-center">
                        <h2 className="mb-3">Your Basket</h2>
                        <h2> {username}</h2>
                        <div className="flex flex-column gap-3">
                            {dataUsers[ind]?.shoppingCart?.map((vacation) => (
                                <div key={vacation?.vacations} className="p-card p-shadow-4">
                                    <div className="p-card-body">
                                        <h4>{findNameById(vacation?.vacations)}</h4>
                                        <div className="flex justify-content-center align-items-center gap-2">
                                            <Button icon="pi pi-minus" className="p-button-rounded p-button-danger" onClick={() => handleDecreaseQuantity(vacation?.vacations)} />
                                            <p>{vacation?.quantity}</p>
                                            <Button icon="pi pi-plus" className="p-button-rounded p-button-success" onClick={() => handleIncreaseQuantity(vacation?.vacations)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button onClick={func} label="לסיום הרכישה" className="p-button-raised p-button-info mt-3" />
                    </div>
                </Sidebar>
    </>);
};

export default Info;
