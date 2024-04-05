import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import SignIn from '../../SignIn';
import SignUp from '../../SignUp';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import img1 from './images/beautiful-seaside-landscape.jpg'
import img2 from './images/ladder-home-reflection-blue-beautiful copy.jpg'
import img3 from './images/beautiful.jpg'
import AppFooter from './AppFooter';
import  { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import './Homepage.css'
// import { PhotoService } from './service/PhotoService';









export default function ProductHero() {
  // const [images, setImages] = useState(null);
  const images = [
    [img1, 'תמונה 1'],
    [img2, 'תמונה 2'],
    [img3, 'תמונה 3'],
  ];
  const itemTemplate = (item) => {
    return (
      <div className="gallery-item" style={{ position: 'relative' }}>
        <img src={item[0]} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="item-overlay"></div>
      </div>
    );
}

const thumbnailTemplate = (item) => {
  <div className="gallery-item" style={{ position: 'relative' }}>
  <img src={item[0]} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  <div className="item-overlay"></div>
</div>
}
  return (
    <> 
     
     <ProductHeroLayout>
  <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} className='hover14'>
    <div style={{ position: 'relative', width: '100%', height: '100%' }} className='hover14'>
    <Galleria
  value={images}
  numVisible={5}
  circular
  showItemNavigators
  showItemNavigatorsOnHover
  showIndicators
  showThumbnails={false}
  item={itemTemplate}
  thumbnail={thumbnailTemplate}
  autoPlay
  transitionInterval={2800}
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
<img
        style={{ display: 'none' }}
        src={img1}
        alt="increase priority"
      />
    </div>
    <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: '1' }}>
    <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br><br></br>
      <br></br>
      <br></br>
      <Typography className='animated-text2' color="inherit" fontFamily="Abraham" align="center" variant="h2" style={{ color: '#ffffff', fontFamily: 'Abraham' }} marked="center">
        תמר נופשים
      </Typography>
      <br></br>
     
      <br></br>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
        style={{ color: '#ffffff' }}
      >
        רגעים של שקט והיכרחיות, זמן להירגע, להתנתק ולהתעדכן באווירה נעימה ומרגיעה. מניחים את הרגליים ונהנים מחוויה ייחודית שמחזקת את הנפש וממלאה אותנו באנרגיה חיובית.
      </Typography>
      
      <Link to="/SignUp" style={{ textDecoration: 'none' }}>
        
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component="a"
          sx={{ minWidth: 200 }}
          style={{ color: '#ffffff', backgroundColor: '#ff3366' }}
        >
          היכנס
        </Button>
        

        <br></br><br></br>

      <br></br>

      </Link>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        גלה את החוויות שלך
      </Typography>
    </div>
  </div>
</ProductHeroLayout>

      <br></br><br></br>
      <br></br>
      <br></br>

    </>
  );
}
