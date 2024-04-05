import React, { useState } from 'react';
import Axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import useAxios from 'axios-hooks'
import AppAppBar from '../design/modules/views/AppAppBar';
import AppFooter from '../design/modules/views/AppFooter';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function BasicCardVacation(props) {
  
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('')
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState('');
  const [openEdit, setOpenEdit] = useState(false)

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: 'http://localhost:4444/api/vacation',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "authorization":'Bearer '+localStorage.getItem("token")
      }
    }
  )
  console.log(data);
  useEffect(() => { console.log('data12345', data) }, [data])
  useEffect(() => { console.log('error', error) }, [error])
  useEffect(() => { console.log('loading', loading) }, [loading])

  // console.log(a);
  const handleClose = () => {
    console.log("add close");

    setOpen(false);
    setOpenEdit(false);
  };
  const handleCloseedit = () => {
    console.log("edit close");
    setOpenEdit(false);
    setOpen(false);

  };

  // const handleAdd = async (e) => {
  //   try {
  //     const formData = new FormData(e.target);
  //     // const formData=Object.
  //     formData.append('name', name);
  //     formData.append('startDate', startDate);
  //     formData.append('endDate', endDate);
  //     formData.append('location', location);
  //     formData.append('price', price);
  //     // formData.append('image', image);

  //     images?.forEach((e) => {
  //       formData.append('images', e);
  //     })

  //     console.log("formData ", formData);
  //     await Axios.post(`http://localhost:4444/api/vacation`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     props.refetch();
  //     handleClose();
  //   } catch (error) {
  //     console.error('Error adding vacation:', error);
  //   }
  // };
  const handleOpen = (vacation) => {
    setId(vacation._id)
    setName(vacation.name);
    setStartDate(vacation.startDate);
    setEndDate(vacation.endDate);
    setLocation(vacation.location);
    setPrice(vacation.price);
    setOpen(true);
  };
  const handleImageChange = (e) => {
    // console.log(e,"  e   ");
    //   const file = e.target.files[0];
    //   console.log(file);
    //   setImage(file,"file");
    //   console.log(image,"image");
     const filelist = e.target.files;

    console.log('filesssssssssssssssss', filelist);
    const new_arr = []
    for (let index = 0; index < filelist.length; index++) {
      const new_um = filelist[index]
      new_arr.push(new_um)
      console.log("after set immm NONONONONONONON",images);
      console.log("new_arr", new_arr);
    }
    setImages(new_arr)
    console.log("data after ddddddddddddddddd", data);
  };

  const handleImageChangeEdit = (e) => {
     const filelist = e.target.files;
    console.log('edit files', filelist);
    const new_arr = []
    for (let index = 0; index < filelist.length; index++) {
      const new_um = filelist[index]
      new_arr.push(new_um)
    }
    setImages(new_arr)
   
  };
  const navigate = useNavigate();
  if (loading) return <h1>מעלה</h1>
  return (
    <>
      <p>רשימת הנופשים</p>
      {/* <AppAppBar /> */}
      {data?.map((i) =>
        <Card sx={{ minWidth: 275, marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {i.name}
            </Typography>
            <Typography variant="h7" component="div">
              {i.startDate} - {i.endDate}
            </Typography>
            <Typography variant="h7" component="div">
              {i.location}
            </Typography>
            <Typography variant="h7" component="div">
              {i.price}
            </Typography>
            <Typography variant="h7" component="div">
              id:{i._id}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={async () => {
                try {
                  await Axios.delete(`http://localhost:4444/api/vacation`, {
                    data: { _id: i._id },
                    headers:{
                      authorization:"Bearer "+localStorage.getItem("token")
                    }
                  });
                  refetch();
                } catch (error) {
                  console.error('Error deleting vacation:', error);
                }
              }}
            >
              מחק
            </Button>
            {/* ====================edit========================================= */}
            
{/* =============================edit================================ */}
              <Dialog open={openEdit} onClose={handleCloseedit}>

                <DialogTitle>עדכן חופשה</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="שם חופשה"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    margin="dense"
                    id="startDate"
                    label="תאריך התחלה"
                    type="date"
                    fullWidth
                    value={i.startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}

                    
                  />
                  <TextField
                    margin="dense"
                    id="endDate"
                    label="תאריך סיום"
                    type="date"
                    fullWidth
                    value={i.endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    margin="dense"
                    id="location"
                    label="סיום"
                    type="text"
                    fullWidth
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    margin="dense"
                    id="price"
                    label="מחיר"
                    type="number"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                   <input
            accept="image/*"
            id="image"
            type="file"
            onChange={handleImageChangeEdit}
            multiple
            style={{ display: 'none' }}
          />
          <label htmlFor="image">
            <IconButton color="primary" aria-label="העלה תמונות" component="span">
              <PhotoCameraIcon />
            </IconButton>
            העלה עוד  תמונות
          </label>
                </DialogContent>
                {/* ===cencel========== */}
                <DialogActions>
                  <Button onClick={async()=>{
                                const res = await Axios({
                            // Endpoint to send files
                            url: "http://localhost:4444/api/vacation/deleteImageFromImages",
                            method: "DELETE",
                            headers: {
                            // Add any auth token here
                            authorization: "Bearer "+localStorage.getItem("token"),
                            },
                            // Attaching the form data
                            data: name,
                            }).then((res)=>
                              {
                                console.log(res);
                              }).catch((err)=>console.log("קגןא קגןא קגןא   "+err))
                          refetch();
                    
                  }}>מחק את כל התמונות לפני שאני מעלה חדש</Button>
                  <Button onClick={()=>{
                    handleCloseedit();
                    
                  }}   onChange={(e) => setName(e.target.value)}>ביטול  </Button>
                  <Button onClick={async () => {
                    const formData = new FormData();
                    // const formData=Object.
                    formData.append('name', name);
                    formData.append('startDate', startDate);
                    formData.append('endDate', endDate);
                    formData.append('location', location);
                    formData.append('price', price);
                    if(images)
                    {
                      console.log("there are images");
                       images?.forEach((e) => {
                      formData.append('images', e);
                    })
                    }
                   
                    const res = await Axios({
                      // Endpoint to send files
                      url: "http://localhost:4444/api/vacation",
                      method: "PUT",
                      headers: {
                      // Add any auth token here
                      authorization: "Bearer "+localStorage.getItem("token"),
                      },
                      // Attaching the form data
                      data: formData,
                      }).then((res)=>
                        {
                          console.log(res);
                        }).catch((err)=>console.log("קגןא קגןא קגןא   "+err))
                  refetch();
                  handleClose()
                    handleCloseedit()
        
                  }}>עדכן</Button>
                </DialogActions>
              </Dialog>
              <Button
              size="small"
              onClick={() => {setOpenEdit(true);handleOpen(i);setOpen(false)}}
            >
              ערוך
            </Button>
          </CardActions>
        </Card>)}
{/* =======================================addddddd========================================================== */}
      <Button onClick={() => {setOpen(true); setOpenEdit(false)}}>הוסף חופשה</Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{color:'#890000'}}>הוסף חופשה</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Vacation Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="startDate"
            label="Start Date"
            type="date"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            id="endDate"
            label="End Date"
            type="date"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            accept="image/*"
            id="image"
            type="file"
            onChange={handleImageChange}
            multiple
            style={{ display: 'none' }}
          />
          <label htmlFor="image">
            <IconButton color="primary" aria-label="העלה תמונות" component="span">
              <PhotoCameraIcon />
            </IconButton>
            העלה תמונות
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ביטול </Button>
          <Button onClick={async () => {
            console.log("postpost p");
            const formData = new FormData();
            // const formData=Object.
            formData.append('name', name);
            formData.append('startDate', startDate);
            formData.append('endDate', endDate);
            formData.append('location', location);
            formData.append('price', price);
            // formData.append('image', image);
            // debugger
            if(images)
            {
            images?.forEach((e) => {
            formData.append('images', e);
            })}
            console.log("postpost p");
            const res = await Axios({
              // Endpoint to send files
              url: "http://localhost:4444/api/vacation",
              method: "POST",
              headers: {
              // Add any auth token here
              authorization: "Bearer "+localStorage.getItem("token"),
              },
              // Attaching the form data
              data: formData,
              }).then((res)=>
                {
                  console.log(res);
                }).catch((err)=>console.log("hhhhhhhhhhhhh  "+err))
          refetch();
          handleClose()

        }}
            >הוסף</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
