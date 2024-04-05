import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import AppFooter from './AppFooter';
import img from '../../../images/productBuoy.svg'
import { useSendEmailTamarMutation, useGetUserQuery } from '../../../Store/Slices/authApiSlice'
import useAuth from '../../../Store/app/useAuth';
import SendEmailTamae from '../../../design/modules/views/SendEmailTamae'
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Navigate, useNavigate } from 'react-router-dom';
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import Snackbar from '../components/Snackbar';

function ProductSmokingHero() {
  const [open, setOpen] = React.useState(false);
  const { _id, firstname, lastname, email, roles } = useAuth()
  const username = `${firstname} ${lastname}`
  const [sendEmailTamar, { isError, error, isLoading, isSuccess, data }] = useSendEmailTamarMutation()
  const p = useGetUserQuery();
  //const [SendEmailTamar]=useSendEmailTamarQuery()
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  function a() {
    const token = localStorage.getItem("token")
    if (token) {
      console.log("aaaaaaaa");
      const da = { from: email, body: value }
      // p(da);
      sendEmailTamar(da);
    }
    else {
      alert("אתה צריך להרשם לאתר...")
    }
    // בקשה לתמר לכתוב קוד שמביא לי תיבת טקסט שאפשר לכתוב בה...
    //לבצע קריאה לשרת... 
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    setOpen(true);
  };


  return (
    <>
      <Container
        component="section"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9 }}
      >
        <Button
          sx={{
            border: '4px solid currentColor',
            borderRadius: 0,
            height: 'auto',
            py: 2,
            px: 5,
          }}
          onClick={a}
        >
          <div className="card flex justify-content-center">
            <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
          </div>
          <Typography variant="h4" component="span">
            ש לך שאלה? צריך עזרה, תוב כאן ונענה לך באמייל!ה?
          </Typography>
        </Button>
        <Typography variant="subtitle1" sx={{ my: 3 }}>
          אנחנו כאן בשביל לעזור! צור איתנו קשר
        </Typography>
        <Box
          component="img"
          onSubmit={handleSubmit2}
          src={img}
          alt="buoy"
          sx={{ width: 60 }}
        />
        <Snackbar
           open={open}
            closeFunc={handleClose}
          message="אנחנו נשלח לך מייל"
        />

      </Container>

    </>
  );
}

export default ProductSmokingHero;