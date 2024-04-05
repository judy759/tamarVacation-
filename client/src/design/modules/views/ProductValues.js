import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import img3 from './images/productValues2.svg'
import img4 from './images/productValues3.svg'
import img5 from './images/productValues1.svg'
import imgLine from '../../../images/productCurvyLines.png'
const x=img3
const y=img4
const z=img5
const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box 
    style={{color:'#212020',backgroundColor:'#fff5f8'}}
      component="section"
      
      sx={{ isplay: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container sx={{  mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',}}>
        <Box
        style={{color:'#212020'}}
          component="img"
          src={imgLine}
          alt="curvy lines"
          sx={{  pointerEvents: 'none',
          position: 'absolute',
          top: -180,
          opacity: 0.7, }}
        />
        
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={z}
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
              מלונות היוקרה הטובים ביותר              </Typography>
              <Typography variant="h5">
                {
                  'מלון הבוטיק האופנתי האחרון לארמון האייקוני עם בריכהת  '
                }

                {
                  'צאו לחופשה קטנה רחוק או קרוב מהבית שלך.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={x}
                alt="graph"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
              חוויות חדשות
              </Typography>
              <Typography variant="h5">
                {
                  'תכנס לבריכה, תהנה מגקוזי מפנק או תשתרע בגינה עם המון דשא...  '
                }

                {'ימי ראשון שלך לא יהיו דומים.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={y}
                alt="clock"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
              מחירים בלעדיים
              </Typography>
              <Typography variant="h5">
                {'בהרשמה תשלמו רק 350 ש"ח, השאר בנופש...'}
                {'שלא תמצאו בשום מקום אחר.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;