import React, { useState, useEffect } from 'react';
import { useGetVacationsQuery } from '../vacationApiSlice'
import GetAllVacationListList from './getallvacationlist'
import NavUser from './navUser'

const Vacation = () => {


    const {
        data: data,
        isLoading,
        isError,
        error
    } = useGetVacationsQuery()
    if (isLoading) return <h1>מעלה את כל הנופשים</h1>
    if (isError) return <h2>{error}</h2>

    return (
        <>
            <NavUser />

            <GetAllVacationListList vacation={"o"} />
        </>
    )



}
export default Vacation