import React, { useState, useEffect } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextFeild';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import SignUp from './SignUp';
import { useLoginMutation } from '../Store/Slices/authApiSlice';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProductHero from './modules/views/ProductHero';
import ProductCTA from './modules/views/ProductCTA';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductHeroLayout from './modules/views/ProductHeroLayout';
import ProductCategories from './modules/views/ProductCategories';
import ProductValues from './modules/views/ProductValues';
import ProductSmokingHero from './modules/views/ProductSmokingHero';

function Home() {
  const [submitting, setSubmitting] = useState(false);
  const [login, { isError, error, isLoading, isSuccess, data }] = useLoginMutation();
  const navigate = useNavigate();

  const validate = values => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };


  return (
    <React.Fragment>
       {/* <AppAppBar />  */}
      <ProductHero/>
      <ProductValues/>
      <ProductCategories/>
      <ProductHowItWorks/>
      <ProductCTA/>
      <ProductSmokingHero/>
      
    </React.Fragment>
  );
}

export default Home;
