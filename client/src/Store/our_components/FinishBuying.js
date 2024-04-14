
import React from 'react';
import { useGetUserQuery } from '../Slices/authApiSlice';
import useAuth  from '../app/useAuth';
import img1 from '../../images/bohemian-man-with-his-arms-crossed.jpg'
import './MNGHome.css';
import x from '../../images/pp-logo-200px.png';
function FinishBuying(props) {
  const { data, isLoading, isError, error } = useGetUserQuery();
  const {firstname,lastname} = useAuth()
  const username=`${firstname} ${lastname}`


  function redirectToPayPal() {
    // Redirect the user to the PayPal URL
    try{
      window.location.href ='https://www.paypal.com/ncp/payment/EQD3GWV5F7KJW';
    }
    catch(err){
      alert(err);
    }

   
  }
  // const element = document.getElementById("paypal-button-container");
  //         element.innerHTML = "";
  //         element.innerHTML = "<h3>Thank you for your payment!</h3>";


  return (<>
  {isLoading? <h1>Loading</h1>:
  <>
  <br></br><br></br><br></br><br></br>

     
   



{/* <button onClick={redirectToPayPal}>לתשלום</button> */}

 <div className="card2">
      <div className="card-content">
        <div className="flex flex-col items-center justify-center xl:flex-row">
          <div className="xl:w-2/3 xl:ml-auto">
            <h2 className="bold">קנית חכם! {username}</h2>
            <div className="bold2">שלם רק 300 ש"ח והקבלה אצלך </div>
            <div className="bold2">השאר תשלם בנופש</div>
            <div class="div">
  <button class="w-98000rem" onClick={redirectToPayPal}>
    <span class="paypal-button-title">
      Buy now with
    </span>
    <br></br>
    <img className="w-8rem flex-shrink-0 border-round" src={x}   />
    <br></br>
    <span class="paypal-logo">
    </span>
  </button>
</div>

            <div className="bold2">.אתה בטוח תהנה בנופש אנחנו כאן תמיד איתך... </div>
            <div className="bold2">.חפש את האישור במייל. </div>
          </div>
          <img className="w-4 sm:w-40em xl:w-100rem mx-auto" src={img1} alt="Logo"/>
        </div>
      </div>

    </div>
    {/* <AppAppBar/> */}
    
</>}</>
  );
}

export default FinishBuying;
