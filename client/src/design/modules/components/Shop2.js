
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from 'react-router-dom';
import { OrderList } from 'primereact/orderlist';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import Typography from '../components/Typography';
import { useGetVacationsQuery, useAddVacationToMyshoppingCartMutation, useDeleteVacationToMyshoppingCartMutation,useAddTovacationPackageMutation } from '../../../Store/Slices/vacationApiSlice';
import { Rating } from 'primereact/rating';
import { Sidebar } from 'primereact/sidebar';
import { useGetUserQuery } from '../../../Store/Slices/authApiSlice';
import useAuth from '../../../Store/app/useAuth';
import { Card } from 'primereact/card';
import AppAppBar from '../../modules/views/AppAppBar'
import FinishBuying from '../../../Store/our_components/FinishBuying'
import FormButton from '../form/FormButton';
// import { Avatar } from '@/components/lib/avatar/Avatar';
import axios from 'axios';
import img1 from '../../../images/packag1.jpg'
import './Niss.css'
const Shop2 = () => {

    const [layout, setLayout] = useState('grid');
    const navigate = useNavigate()
    const [isZoomed, setIsZoomed] = useState(false);
    const  { _id:userId,firstname,lastname, email,roles}=useAuth()
   const username=`${firstname} ${lastname}`

    const { data, isLoading, isError, error } = useGetVacationsQuery();
    const { data: dataUsers, isErroru, erroru, isLoadingu, isSuccessu } = useGetUserQuery();
    const ind = dataUsers?.findIndex((i) => i._id === userId);
    const [visibleBuying, setVisibleBuying] = useState(false);
    const [visible, setVisible] = useState(false);
    const [addVacationToMyshoppingCart] = useAddVacationToMyshoppingCartMutation();
    const [deleteVacationToMyshoppingCart] = useDeleteVacationToMyshoppingCartMutation()
    const [addTovacationPackage] = useAddTovacationPackageMutation()
    const zoomableImages = document.querySelectorAll('.zoomable-image');
zoomableImages.forEach(image => {
    image.addEventListener('mouseover', () => {
        image.classList.add('zoomed');
    });

    image.addEventListener('mouseout', () => {
        image.classList.remove('zoomed');
    });
});

const handleBuyVacation = (vacationId) => {
    const x = data?.find(i => i._id === vacationId);
    addVacationToMyshoppingCart({ userId, vacationId })
    setVisibleBuying(true);
};
const findImgByVacationId = (vacationId) => {
   
    const x = data?.find(i => i._id === vacationId);
   
     return x.images[0]
};
const findNameByVacationId = (vacationId) => {
   
    const x = data?.find(i => i._id === vacationId);
    
     return x.name
};
const findLocationByVacationId = (vacationId) => {
   
    const x = data?.find(i => i._id === vacationId);
    
     return x.location
};
const findPriceByVacationId = (vacationId) => {
    
    const x = data?.find(i => i._id === vacationId);
    
     return x.price
};
    const handleIncreaseQuantity = (vacationId) => {
        
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

    const handleDecreaseQuantity = (vacationId) => {
        deleteVacationToMyshoppingCart({ userId, vacationId })
        // const userId = localStorage.getItem("userid");
        // const username = localStorage.getItem("username");
        // if (!userId || !username) {
        //     setVisibleBuying(false);
        //     setVisible(true);
        // } else {
        //     setVisibleBuying(true);
        // }
        // setVisibleBuying(true);
        // // Handle decrease quantity logic
    };

  

    const handleMoreInfo = (vacationId) => {
        navigate(`/info?vacationId=${vacationId}`);
    };
    

    const func = () => {
        addTovacationPackage({ userId })
        
        navigate('/FinishBuying')
    }
    const itemTemplate2 = (item) => {
        return (<>
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={"http://localhost:4444/uploads/"+findImgByVacationId(item.vacations)?.split("\\")[2]}   />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{findNameByVacationId(item.vacations)}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{findLocationByVacationId(item.vacations)}</span>
                    </div>
                </div>
                <span className="font-bold text-900">${findPriceByVacationId(item.vacations)}</span>
            </div>
            <div className="flex justify-content-center align-items-center gap-2">
                                            <Button icon="pi pi-minus" className="p-button " onClick={() => handleDecreaseQuantity(item.vacations)} />
                                            
                                            <span className="font-bold">{item.quantity}</span>
                                            <Button icon="pi pi-plus" className="p-button 14px" onClick={() => handleIncreaseQuantity(item.vacations)} />
                                        </div>
            </>
        );
    };


    if (isLoading) return <div className="card">
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
    </div>
    if (isError) return <h2>{JSON.stringify(error)}</h2>


    //name, code, describe, lecturer, day, startDate, endDate, hours, numOfMeeting, AudienceStatus, Kategory
    const listItem = (vacation, index) => {
        return (<> 
        {vacation.image ? <img alt={vacation.name} src={`http://localhost:1122/${vacation.image}`}  className="zoomable-image"
            onMouseEnter={(e) => e.target.classList.add('zoomed')} // הוסף קלאס בעת נכנס העכבר
            onMouseLeave={(e) => e.target.classList.remove('zoomed')} // הסר קלאס בעת עזיבת העכבר
        ></img> : ''}
        
            <div className="col-12" key={vacation?._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                   
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{vacation.name}</div>
                            <span className="font-semibold">{vacation.describe}</span>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            {/* <span className="text-2xl font-semibold">{vacation.price}</span> */}
                           
                        </div>
                    </div>
                </div>
            </div>
          
            </>
        );
    };

    const gridItem = (vacation) => {
        const startDate = new Date(vacation.startDate?.split('T')[0]);
const endDate = new Date(vacation.endDate.split('T')[0]);
const differenceInTime = endDate.getTime() - startDate.getTime();
const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return (<>
            {/* <div class="card">
    <div class="card-content" key={vacation.name}>
        <div class="image-container">
            {vacation.images[0] ? <img class="card-image" src={"http://localhost:4444/uploads/"+vacation.images[0].split("\\")[2]} alt={vacation.name} /> : ''}
        </div>
        <div class="card-details">
            <div class="text-container">
                <div class="text-header">
                    <h2 class="text-title">{vacation.name}</h2>
                    <span class="text-category">{vacation.category}</span>
                </div>
                <p class="text-description">{vacation.description}</p>
            </div>
            <div class="action-buttons">
                <span class="text-price">${vacation.price}</span>
                <button class="button-buy" onClick={() => handleBuyVacation(vacation._id)}>Buy</button>
                <button class="button-info" onClick={() => handleMoreInfo(vacation._id)}>Info</button>
            </div>
        </div>
    </div>
</div> */}


<div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={vacation.name}>
     {vacation.images[0] ? 
            <div className="image-container">
                <img  
                    className="zoomable-image"
                    onMouseEnter={(e) => e.target.classList.add('zoomed')} // הוסף קלאס בעת נכנס העכבר
                    onMouseLeave={(e) => e.target.classList.remove('zoomed')} // הסר קלאס בעת עזיבת העכבר 
                    src={"http://localhost:4444/uploads/"+vacation.images[0].split("\\")[2]} 
                    alt={vacation.name} 
                />
            </div> 
            : '' 
        }
    <div className="p-4 border-1 surface-border surface-card"> 
   
        <div className="flex flex-wrap align-items-center justify-content-between gap-2 ">
        </div>                    
       
        <div className="flex flex-column align-items-center gap-2 py-5">
            <i className="pi pi-map-marker blue" ></i> 
            <div className="text-2xl font-bold text-900">{vacation.name}</div>
            <div className="text-2xl font-bold">{vacation.location}</div>
            
            <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                <div className="flex flex-column align-items sm:align-items-start gap-3">
                    <div className="text-xl font-bold">{vacation.description}</div>
                    <div className="flex align-items-center gap-2">
                        <span className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i><div className="text-1xl font-bold">המחיר</div><span className="font">{vacation.category}</span>
                            
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                <span className="text-2xl font-semibold">${vacation.price}</span>
            </div>
            <br></br>
            <span className="font-semibold">מתחיל: {vacation.startDate.split('T')[0]}</span>
            <span className="font-semibold">מסתיים: {vacation.endDate.split('T')[0]}</span>
            <br></br>
            <div className="text-1xl font-bold">{differenceInDays} ימים <i className="pi pi-sun"></i></div>
        </div>
        <div className="flex align-items-center justify-content-between">
           
            <Button label='רוצה לדעת עוד' className="button2" icon="pi pi-map-marker blue" onClick={() => {handleMoreInfo(vacation._id)  }} style={{backgroundColor: '', color: 'white'}} />
            <Button label='תוסיף לעגלה' className="button2" icon="pi pi-cart-plus" onClick={() => {  handleBuyVacation(vacation._id)}} style={{backgroundColor: '', color: 'white'}}  />
            {/* <Button label='פרטים נוספים' className="custom-button" onClick={() => { detailCourse(vacation._id) }} ></Button>
            <button className="custom-button">Click Me</button> */}
        </div>
    </div>
</div>
            </>
        );
    };

    const itemTemplate = (vacation, layout, index) => {
        if (!vacation) {
            return;
        }

        if (layout === 'list') return listItem(vacation, index);
        else if (layout === 'grid') return gridItem(vacation);
    };

    const listTemplate = (vacation, layout) => {
        return <div className="grid grid-nogutter">{vacation.map((vacation, index) => itemTemplate(vacation, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (<>
    
      {/* <Typography className="animated-text" color="inherit" fontFamily="Abraham" align="center" variant="h2"    style={{color:'#ffffff',fontFamily:"Abraham",size:3000}} marked="center" >
      החופשות הקרובות
      </Typography> */}
        <div className="card">
            <DataView value={data} listTemplate={listTemplate} layout={layout}  />
        </div>
        <div className="bg"></div>
<div className="bg bg2"></div>
<div className="bg bg3"></div>
      
{/* <OrderList visible={visibleBuying} onHide={() => setVisibleBuying(false)}
  dataKey="id"
  value={dataUsers[ind]?.shoppingCart}
  itemTemplate={itemTemplate2}
  header={`החופשות שבסל שלך ${username}`}
/>
         */}
<Sidebar visible={visibleBuying} onHide={() => setVisibleBuying(false)} className="w-full md:w-20rem lg:w-30rem">
                   
                   <OrderList
  dataKey="id"
  value={dataUsers[ind].shoppingCart}
  itemTemplate={itemTemplate2}
  header={`החופשות שבסל שלך ${username}`}
/>
                        <Button onClick={func} label="לסיום הרכישה" className="p-button-raised p-button-info mt-3" />
                    
                </Sidebar>

     

            
        </>
    )
}

export default Shop2;