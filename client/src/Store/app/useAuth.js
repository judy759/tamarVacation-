import {jwtDecode} from "jwt-decode"
import { useSelector } from "react-redux"
// import { selectToken } from "../Slices/"
import { useDebounce } from "primereact/hooks"
const useAuth = () => {
    var token = localStorage.getItem('token')
    let isAdmin = false
    let isUser = false
    if (token) {
      if(token==='undefined'){
        console.log("no token");
        token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IiQyYiQxMCRheFNFRnUuanhFd2hSWkhmWmRuN3VPdnZ5SXV1aFJDWnF1cUM2SkU4RThnelhjMUhtOWRoMiIsImZpcnN0bmFtZSI6Iteg16LXnteUIiwibGFzdG5hbWUiOiLXqdee15XXkNec15HXmdelIiwiZW1haWwiOiJuYWFtYUBnbWFpbC5jb20iLCJpYXQiOjE3MTEyMzQwMDV9.KvvwoO3SNPOfCvge5QXn70asrAf6SrP6GE9hdl4DG54"

      }
      else{
       
      }
      
       const userDecode = jwtDecode(token)
        
       const { _id, firstname, lastname, email, role } = userDecode
       isAdmin = role === "Manager"
       isUser = role === "User"
         //console.log({_id,firstname,lastname, email,role});
         
       return { _id:_id,firstname: firstname,lastname:lastname, email:email,roles:role}
       
 
    }
    return { _id: "",firstname : "",lastname : "",  roles: "", email: ""}
 
 }
 export default useAuth
 
 
 