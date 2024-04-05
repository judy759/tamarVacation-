import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import Snackbar from '../components/Snackbar';
import Button from '../components/Button';
import AppFooter from './AppFooter';
import x from '../../../images/productCurvyLines.png'
import { useGetUserQuery,useKeepMeUpdateMutation } from '../../../Store/Slices/authApiSlice';
import useAuth from '../../../Store/app/useAuth'
import { useState } from 'react';



function ProductCTA() {
  const [open, setOpen] = React.useState(false);
  const { data: dataUsers, isErroru, erroru, isLoadingu, isSuccessu } = useGetUserQuery();
  //const [keepMeUpdate, { isError2, error2, isLoading2, isSuccess2, data2 }] = useKeepMeUpdateQuery();
  console.log("dataUsers",dataUsers);
  const  { _id,firstname,lastname, email,roles}=useAuth()
  const username=`${firstname} ${lastname}`
  const [name, setName] = useState(username)
  const [email2, setEmail2] = useState('');
  const[emailInput,setEmailInput]=useState(email)
 

  //open={open}
 // closeFunc={handleClose}
 
  const [keepMeUpdate,{ isError, error, isLoading, isSuccess, data }] =useKeepMeUpdateMutation()
  const handleChange = (event) => {
    setEmail2(event.target.value);
  };
  const handleSubmit = () => {
    // כאן אתה יכול להשתמש בערך המצוי במשתנה email ולעשות איתו מה שתרצה
    console.log('Email:', email2);
    // ניתן לשלוח את הערך לפונקציה שמתעדכנת את המייל
     toRegister(email);
  };
  const handleSubmit2 = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const toRegister = (e) => {
    keepMeUpdate({_id,e});
    
  };

  return (
    <>
    <Container component="section" sx={{ mt: 10, display: 'flex' }} >
      <Grid container style={{color:'#212020'}}>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box style={{color:'#212020',backgroundColor:'#ffc071'}}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'warning.main',
              py: 8,
              px: 3,
              
            }}
          >
            <Box component="form" onSubmit={handleSubmit2} sx={{ maxWidth: 400 }} style={{color:'#212020',backgroundColor:'#ffc071'}}>
              <Typography variant="h2" component="h2" gutterBottom>
                קבל הצעות במייל
              </Typography>
              <Typography variant="h5">
              לטעום את החגים של היום יום , את החיים בטעם אחר ומרענן
              </Typography>
              <TextField
                noBorder
                placeholder="Your email"
                variant="standard"
                sx={{ width: '100%', mt: 3, mb: 2 }}
                style={{color:'#212020',backgroundColor:'#ffc071'}}
                value={emailInput}
                onChange={handleChange}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ width: '100%' }}
                style={{color:'#ffffff',backgroundColor:'#28282a'}}
                onClick={handleSubmit}
              >
                 תעדכן את המייל שלי
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '100%',
              background: 'url(/static/themes/onepirate/productCTAImageDots.png)',
            }}
          />
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&w=750"
            alt="call to action"
            sx={{
              position: 'absolute',
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 600,
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        closeFunc={handleClose}
        message="אנחנו נשלח לך מייל"
      />
      
    </Container>
    
   
   </>
  );
}

export default ProductCTA;