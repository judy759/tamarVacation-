import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import img01 from './images/productHowItWorks1.svg'
import img02 from './images/productHowItWorks2.svg'
import img03 from './images/productHowItWorks3.svg'
import imgLine from '../../../images/productCurvyLines.png'
const m=img01
const m1=img02
const m2=img03
const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  return (
    <Box
    style={{color:'#212020',backgroundColor:'#fff5f8'}}
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={imgLine}
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
      
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
         איך זה עובד?
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src={img01}
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                 נרשמים לאתר, ובוחרים נופש מועדף מבין הנופשים המדהימים שלנו
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src={img02}
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                כל הקודם זוכה. ההצעות שלנו הן בכמויות מוגבלות, אז
                   תהיה מהיר.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src={img03}
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  {'הצעות חדשות כל שבוע. חוויות חדשות, הפתעות חדשות. '}
                  {'קונים נופש, תשלח סיסמא למיל, תהנה! לא תתחרט...'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/premium-themes/onepirate/sign-up/"
          sx={{ mt: 8 }}
          style={{color:'#ffffff',backgroundColor:'#ff3366'}}
        >
          בואו נתחיל
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;