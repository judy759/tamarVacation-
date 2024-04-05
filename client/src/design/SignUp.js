import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from './modules/components/Button';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required, DuplicateEmail} from './modules/form/validation';
import RFTextField from './modules/form/RFTextFeild';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import withRoot from './modules/withRoot';
import { Routes, Route } from 'react-router-dom'; 
import SignIn from './SignIn';
import{useEffect, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Router } from 'react';
import {useRegisterMutation}  from '../Store/Slices/authApiSlice';
import { useDispatch } from 'react-redux';
import { setToken } from '../Store/Slices/authSlice';

import { useGetUserQuery } from '../Store/Slices/authApiSlice';
function SignUp() {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('')
  // const [email, setEmail] = useState('')
const [sent, setSent] = useState(false);
const navigate = useNavigate();
const dispatch = useDispatch()
const [registerFunc, { isErrorReg, isSuccessReg, isLoadingReg, dataReg, errorReg }] = useRegisterMutation()  
const { data: dataUsers, isErroru, erroru, isLoadingu, isSuccessu } = useGetUserQuery();
const validate = (values) => {
  const errors = required(['firstname', 'lastname', 'email', 'password'], values);
  if (!errors.email) {
    const emailError = email(values.email,dataUsers);
    if (emailError) {
      errors.email = emailError;
    }
    const emailError2 = DuplicateEmail(values.email,dataUsers);
    if (emailError2) {
      errors.email = emailError2;
    }
  }

  return errors;
};
useEffect(()=>{
  if(isSuccessReg){
  console.log("is succes sign up",dataReg);
         dispatch(setToken(dataReg))
          navigate("/Enter")
  }
  },[isSuccessReg]);
    useEffect(() => {
      if (isErrorReg) {
         alert("i have eroor in register func");
      }
      
  }, [isErrorReg])
const handleSubmit =async (e) => {
  // debugger;
 const a=registerFunc(e)
 console.log(a);
  const data = new FormData(e.target);
  const userObject = Object.fromEntries(data.entries());
  setSent(true);
  navigate("/signIn");
  
};

  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  // const [registerFunc, { isError,isSuccess, data }] = useRegisterMutation()
  //    const [firstname, setFirstname] = useState('')
  //   const [lastname, setLastname] = useState('')
  //    const [password, setPassword] = useState('')
  //    const [email, setEmail] = useState('')

  // useEffect(() => {
  //     if (isSuccess) {
  //         dispatch(setToken(data))
  //         navigate("/signIn");
  //     }
  // }, [isSuccess])
  
   useEffect(() => {
       if (errorReg) {
           alert("שם משתמש קיים כבר במערכת")
       }
      
   }, [errorReg])
  // const handleSubmit = (e) => {
  //   console.log("dddd",e);
  //   registerFunc(e)
  //   const data = new FormData(e.target);
  //   setSent(true);
  
  // };
// useEffect(()=>{
// if(isSuccessReg==true){
//   //  console.log(dataReg);
// }
// },[isSuccessReg])
  return (
    <React.Fragment>
       {/* <AppAppBar /> */}
      <AppForm>
        <Typography variant="h3" gutterBottom marked="center" align="center" style={{color:'#28282a'}}>
          לכניסה
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="/signIn" align="center" underline="always" style={{color:'#28282a'}}>
            כבר יש לך חשבון? הכנס
          </Link>
          <Routes>
            <Route path='/signIn' element={<SignIn />} />
          </Routes>
        </Typography>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit, submitting }) => (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 6 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="given-name"
                    fullWidth
                    label="First name"
                    name="firstname"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label="Last name"
                    name="lastname"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
                style={{color:'#ffffff',backgroundColor: '#ff3366'}}
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
      
    </React.Fragment>
  );
}

export default SignUp;
