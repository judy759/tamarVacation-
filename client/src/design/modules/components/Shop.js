import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { useGetVacationsQuery, useAddVacationToMyshoppingCartMutation, useDeleteVacationToMyshoppingCartMutation,useAddTovacationPackageMutation } from '../../../Store/Slices/vacationApiSlice';
import { Rating } from 'primereact/rating';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { useGetUserQuery } from '../../../Store/Slices/authApiSlice';
import AppAppBar from '../../modules/views/AppAppBar'
import FinishBuying from '../../../Store/our_components/FinishBuying'
// import { Avatar } from '@/components/lib/avatar/Avatar';
import axios from 'axios';
import useAuth from '../../../Store/app/useAuth';

const Shop = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useGetVacationsQuery();
    const { data: dataUsers, isErroru, erroru, isLoadingu, isSuccessu } = useGetUserQuery();

   const  { _id:userId,firstname,lastname, email,roles}=useAuth()
   const username=`${firstname} ${lastname}`
    const ind = dataUsers?.findIndex((i) => i._id === userId);
    const [visibleBuying, setVisibleBuying] = useState(false);
    const [visible, setVisible] = useState(false);

    const [addVacationToMyshoppingCart] = useAddVacationToMyshoppingCartMutation();
    const [deleteVacationToMyshoppingCart] = useDeleteVacationToMyshoppingCartMutation()
    const [addTovacationPackage] = useAddTovacationPackageMutation()
    const [arrnav, setArrnav] = useState([]);
    const searchFunc = (inputValue, object) => {
        for (const key in object) {
            // בדיקה האם הערך של השדה הוא מחרוזת והאם המחרוזת מופיעה בתוך הערך של השדה
            if (typeof object[key] === 'string' && object[key].includes(inputValue)) {
                // אם נמצאה התאמה, החזרת האובייקט
                return object;
            }
        }
        // אם לא נמצאה התאמה, החזרת ערך מזהה כלשהו (למשל null)
        return null;
    }

    const handleIncreaseQuantity = (vacationId) => {
        console.log("vacationId", vacationId);
        addVacationToMyshoppingCart({ userId, vacationId })
        setVisibleBuying(true);
        // Handle increase quantity logic
    };

    const handleDecreaseQuantity = (vacationId) => {
        deleteVacationToMyshoppingCart({ userId, vacationId })

        if (!userId || !username) {
            setVisibleBuying(false);
            setVisible(true);
        } else {
            setVisibleBuying(true);
        }
        setVisibleBuying(true);
        // Handle decrease quantity logic
    };

    const handleBuyVacation = (vacationId) => {
        const x = data?.find(i => i._id === vacationId);
        addVacationToMyshoppingCart({ userId, vacationId })
        setVisibleBuying(true);
    };

    const handleMoreInfo = (vacationId) => {
        navigate(`/info?vacationId=${vacationId}`);
    };
    

    const func = () => {
        addTovacationPackage({ userId })
        console.log("dd", data);
        navigate('/FinishBuying')
    }

    const listItem = (vacation, index) => {
        if (!vacation.images[0])
            return (<p>חסר תמונה</p>)
        return (
            <div className="col-12" key={vacation._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>

                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={"http://localhost:4444/uploads/"+vacation.images[0]?.split("\\")[2]}  />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{vacation.name}</div>
                            <div className="text-xl font-bold">{vacation.description}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{vacation.category}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${vacation.price}</span>
                            <Rating value={5} readOnly cancel={false}></Rating>
                            <Button icon="pi pi-shopping-bag" className="p-button-rounded" onClick={() => handleBuyVacation(vacation._id)}></Button>
                            <Button icon="pi pi-info-circle" className="p-button-rounded p-button-outlined p-button-info" onClick={() => handleMoreInfo(vacation._id)} />
                        </div>
                    </div>
                </div>
                <Dialog header={`Hi ${username}:`} style={{ width: '50vw' }} onHide={() => setVisibleBuying(true)}>
                    <p className="m-0">
                  לסל שלך!'{vacation.name}' אתה הוספת את 
                    </p>
                </Dialog>
            </div>
        );
    };

    const listTemplate = (vacations) => {
        return <div className="grid grid-nogutter">{vacations?.map((vacation, index) => listItem(vacation, index))}</div>;
    };


    const header = () => {
        if (!dataUsers) {
            return <div>מעלה...</div>;
        }
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

        const func2 = () => {
            if (!localStorage.getItem("token")) {
                setVisible(true);
                return true;
            } else {
                setVisibleBuying(true);
                return false;
            }
        };

        return (
            <>
                {/* <AppAppBar /> */}
                
                <Dialog header="אזהרה" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <p className="m">
                        אינך מחובר 
                        כדי לרכוש הזמנה היכנס
                    </p>
                </Dialog>
                <div className="flex justify-content-end ">
                    <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" onChange={(e) => searchFunc(e.target.value, 'xx')} key='xx'/>
                    &nbsp; &nbsp;&nbsp;&nbsp;
                    {localStorage.getItem("token") && <Button onClick={func2} icon="pi pi-shopping-bag" rounded text raised severity="secondary" aria-label="Bookmark" style={{ position: "absolute", left: '40px',color:'#fgdgdf' }} />}
                    <DataViewLayoutOptions layout="grid" />
                </div>
                <Sidebar visible={visibleBuying} onHide={() => setVisibleBuying(false)} className="w-full md:w-20rem lg:w-30rem">
                    <div className="card flex flex-column justify-content-center align-items-center">
                        <h2 className="mb-3">Your Basket</h2>
                        <h2> {username}</h2>
                        <div className="flex flex-column gap-3">
                            {dataUsers[ind]?.shoppingCart?.map((vacation) => (
                                <div key={vacation.vacations} className="p-card p-shadow-4">
                                    <div className="p-card-body">
                                        <h4>{findNameById(vacation.vacations)}</h4>
                                        <div className="flex justify-content-center align-items-center gap-2">
                                            <Button icon="pi pi-minus" className="p-button-rounded p-button-danger" onClick={() => handleDecreaseQuantity(vacation.vacations)} />
                                            <p>{vacation.quantity}</p>
                                            <Button icon="pi pi-plus" className="p-button-rounded p-button-success" onClick={() => handleIncreaseQuantity(vacation.vacations)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button onClick={func} label="לסיום הרכישה" className="p-button-raised p-button-info mt-3" />
                    </div>
                </Sidebar>
            </>
        );
    };

    return (
        <div className="card">
            <DataView value={data} listTemplate={listTemplate} layout="grid" header={header()} />
        </div>
    );

}

export default Shop;
