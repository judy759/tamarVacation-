//import '../entery/index1.css'
import NavUser from './navUser'
import Vacation  from './getallvacation';
import { useGetVacationsQuery } from '../vacationApiSlice';


const Vacations = () => {

    const {
        data,
        isLoading,
        isError,
        error
    } = useGetVacationsQuery()
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>

    return (
        <>
            <NavUser />
           
            <productList data={data} />
        </>
    )

}
export default Vacations