import React from 'react';
import {useGetVacationsQuery} from './Slices/vacationApiSlice'
const VacationList = () => {
const {data,isLoading,isError,error} = useGetVacationsQuery()
if (isLoading) return <h1>מעלה... חכה בסבלנות</h1> 
const vacations=[]
if(isError) return <h2>{error}</h2>
return(
    <div className='vacation-list'>
        <h1>רשימת הנופשים </h1>
        <h1></h1>
        <h1>ooooooo</h1>
        <h1>ooooo</h1>
        {vacations.map((vacation)=>(
            <div key={vacation.id} className='vacation-item'>
                <h2 className='vacation-name'>{vacation.name}</h2>
                <p className='vacation-date-start'>{vacation.startDate}</p>
                <p className='vacation-date-start'>{vacation.endDate}</p>
                </div> 
        ))}
    </div>
)
};
export default VacationList;