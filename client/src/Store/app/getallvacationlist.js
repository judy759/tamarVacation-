import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
//import Login from '../entery/login';
import {useGetVacationsMutation,useAddVacationToMyshoppingCartMutation,useDeleteVacationToMyshoppingCartMutation,useAddTovacationPackagetMutation} from '../../../src/Store/vacationApiSlice'
import { InputText } from 'primereact/inputtext';
//import './gridlist.css'
import { Sidebar } from 'primereact/sidebar';





const GetAllVacationListList = (props) => {
    const [buyVacation, { isError, isSuccess, error }] = useAddVacationToMyshoppingCartMutation()
    const [vacations, setVacations] = useState(props.data);
    const [visibleSideBar, setVisibleSideBar] = useState(false);
    const [layout, setLayout] = useState('grid');
    const [visible, setVisible] = useState(false);
    const [visibleBuying, setVisibleBuying] = useState(false);
    const  { _id:userId,firstname,lastname, email,roles}=useAuth()
    const username=`${firstname} ${lastname}`

    const listItem = (vacation, index) => {
        return (

            <div className="col-12" key={vacation._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>

                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:7777/${vacation.image}`} alt={vacation.name} />
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
                            <Button icon="pi pi-shopping-bag" className="p-button-rounded" on onClick={() => {
                                if (!localStorage.getItem('token')) {
                                    setVisible(true)
                                }
                                else {
                                    buyVacation({ "_idVacation": vacation._id })

                                    setVisibleBuying(true)

                                }

                            }}></Button>
                        </div>
                    </div>
                </div>
                
                    <Dialog header={`Hi ${username}:)`} visible={visibleBuying} style={{ width: '50vw' }} onHide={() => setVisibleBuying(false)}>
                        <p className="m-0">
                           לסל שלך  {vacation.name }אתה הוספת את
                        </p>
                    </Dialog>
                
            </div>
        );
    };
    const gridItem = (vacation) => {
        return (

            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={vacation._id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{vacation.code}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`http://localhost:4444/${vacation.image}`} alt={vacation.name} />
                        <div className="text-2xl font-bold text-900">{vacation.name}</div>
                        <div className="text-xl font-bold ">{vacation.description}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${vacation.price}</span>
                        <Button icon="pi pi-shopping-bag" className="p-button-rounded" on onClick={() => {
                            if (!localStorage.getItem('token')) {
                                setVisible(true)
                            }
                            else {
                                buyVacation({ "_idVacation": vacation._id })

                                setVisibleBuying(true)

                            }

                        }}></Button>
                    </div>
                </div>

                
                    <Dialog header={`Hi ${username}:)`} visible={visibleBuying} style={{ width: '50vw' }} onHide={() => setVisibleBuying(false)}>
                        <p className="m-0">
                            you added the '{vacation.name}' to your basket!!
                        </p>
                    </Dialog>
                



                <Dialog header="Welcome:)" visible={visible} onHide={() => setVisible(false)}
                    style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                   {/* // <Login from={"vacations"} /> */}
                </Dialog>
            </div>

        );
    };


    const itemTemplate = (vacation, layout, index) => {
        if (!vacation) {
            return;
        }

        if (layout === 'list') return listItem(vacation, index);
        else if (layout === 'grid') return gridItem(vacation);
    };

    const listTemplate = (vacations, layout) => {
        return <div className="grid grid-nogutter"  >{vacations.map((vacation, index) => itemTemplate(vacation, layout, index))}</div>;
    };



    const header = () => {
        return (
            <>
                <div className="flex justify-content-end ">
                    <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
                    &nbsp; &nbsp;&nbsp;&nbsp;
                    {localStorage.getItem("token") ? <Button onClick={() => { setVisibleSideBar(true) }} icon="pi-shopping-bag" rounded text raised severity="secondary" aria-label="Bookmark" style={{ position: "absolute", left: '40px' }} /> : <></>}
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>

                <Sidebar visible={visibleSideBar} onHide={() => setVisibleSideBar(false)} className="w-full md:w-20rem lg:w-30rem">
                    <div className="card flex justify-content-center">
                        <h2>Sidebar</h2>
                        <p>

                        </p>
                    </div>
                </Sidebar>

            </>

        );
    };






    return (
        <div className="card">
            <DataView value={vacations} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}


export default GetAllVacationListList