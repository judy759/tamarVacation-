import React from 'react';
import { useGetUserQuery } from '../../../Store/Slices/authApiSlice';
import useAuth  from '../../../Store/app/useAuth';
import BeachImage from '../views/images/beautiful.jpg';
import AppAppBar from '../views/AppAppBar';
import img1 from '../../../images/close-up-funny-boy-with-crossed-arms.jpg';
import './MNGHome.css';
function Enter(props) {
  const { data, isLoading, isError, error } = useGetUserQuery();
  const {firstname,lastname} = useAuth()
  const username=`${firstname} ${lastname}`



  // אם המידע טוען, הצג "טוען"
  console.log("data::::",data);
 

  // אם יש שגיאה בשליפת המידע, הצג את השגיאה
  // if (isError) return <h2>{error}</h2>;

  // שליפת שם המשתמש מה־localStorage

  // הצגת שם המשתמש
  return (<>
  {isLoading? <h1>Loading</h1>:
  <>
  <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
 <div className="card2">
      <div className="card-content">
        <div className="flex flex-col items-center justify-center xl:flex-row">
          <div className="xl:w-2/3 xl:ml-auto">
            <h2 className="bold">,שלום {username}</h2>
            <h4 className="bold" style={{color:'#a163ff',fontSize:'138%'}}>...הנופשים הקסומים בעולם... </h4>
            <div className="bold" style={{color:'#7097ff',fontSize:'138%'}}>..חפשו את הנופש המנצח שלכם.. </div>
          </div>
          <img className="w-4 sm:w-40em xl:w-100rem mx-auto" src={img1} alt="Logo"/>
        </div>
      </div>
    </div>
    {/* <AppAppBar/> */}
</>}</>
  );
}

export default Enter;
