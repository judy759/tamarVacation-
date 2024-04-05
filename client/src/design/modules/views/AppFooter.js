import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import img1 from '../../../images/appFooterFacebook.png'
import img2 from '../../../images/appFooterTwitter.png'

function Copyright() {
 
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://mui.com/">
       Tamar Nofashim
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'warning.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark',
  },
};

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
    
  },
  {
    code: 'fr-FR',
    name: 'עברית',
  },
];

export default function AppFooter() {
  const [language, setLanguage] = useState('he'); // שפת התרגום הנוכחית
  const translations = {
    he: {
      greeting: 'שלום',
      introduction: 'זוהי הקדמה',
      privacy: 'פרטיות',
    },
    en: {
      greeting: 'Hello',
      introduction: 'This is an introduction',
      terms: 'Terms',
    privacy: 'Privacy',
    }
  };

    const handleLanguageClick = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };
  function translateTo(languageCode) {
  
    if (languageCode === 'en-US') {
      console.log('Translate to English');
      // הוסף קוד לתרגום לאנגלית כאן
      handleLanguageClick('en-US')
    } else if (languageCode === 'fr-FR') {
      console.log('Translate to Hebrew');
      handleLanguageClick('fr-FR')
    }
  }
  
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'secondary.light' }} 
      style={{color:'#212020',backgroundColor:'#fff5f8'}}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: 'flex' }}>
                <Box component="a" href="https://mui.com/" sx={iconStyle}>
                  <img
                    src={img1}
                    alt="Facebook"
                  />
                </Box>
                <Box component="a" href="https://twitter.com/MUI_hq" sx={iconStyle}>
                  <img src={img2} alt="X" />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/premium-themes/onepirate/terms/">Terms</Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/premium-themes/onepirate/privacy/">Privacy</Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Language
            </Typography>
            <TextField
              select
              size="medium"
              variant="standard"
              SelectProps={{
                native: true,
              }}
              sx={{ mt: 1, width: 150 }}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code} onClick={() => {handleLanguageClick(language);console.log("im here",language);}}>
                  {language.name}
                 
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {'Icons made by '}
              <Link href="https://www.freepik.com" rel="sponsored" title="Freepik">
                Freepik
              </Link>
              {' from '}
              <Link href="https://www.flaticon.com" rel="sponsored" title="Flaticon">
                www.flaticon.com
              </Link>
              {' is licensed by '}
              <Link
                href="https://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC 3.0 BY
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}