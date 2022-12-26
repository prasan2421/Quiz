import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from "react";
import Router from 'next/router';
import { useFormik, FormikErrors } from 'formik';
import { FormControl, InputLabel, Input } from '@mui/material'
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import * as yup from "yup";
import axios from 'axios';
import qs from 'qs';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux'
// import { JSDOM } from 'jsdom';

import { marked } from 'marked';
import eachDayOfIntervalWithOptions from 'date-fns/fp/eachDayOfIntervalWithOptions/index.js';

const clean = marked('# Marked in browser\n\nRendered by **marked**.');

interface IFormInputs {
  name: string;
  image: string;

}



const Edit = () => {
  const router = useRouter()
  const { user, isSuccess, spinnerAuth } = useSelector((state:any) => state.auth)
  const [preview, setPreview] = useState(false)
  const [success, setSuccess] = useState(false)
  const[data, setData] = React.useState()
  const [initialValues, setInitialValues] = useState({
    name: '',
    image: '',
   

  });

  const { id } = router.query



  const getData = async() => {
  
    await axios.get(process.env.HOST+'/flags/'+id,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      })
   
      .then(function (response) {
       alert(JSON.stringify(response.data[0]))
        setData(response.data[0])
        setInitialValues({
          name: response.data[0].name,
    image: response.data[0].image,
    
        })
        alert('Success')
      })
    
      .catch(function (error) {
        
        console.log(error);
        alert(JSON.stringify(error))
      })


  }
  useEffect(()=>{
    getData()
    // alert(id)

  },[])

  const submitBlog = async (data: any) => {

    axios.put(process.env.HOST+'/blogs/'+id
      , qs.stringify(data),
      {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      }
    )
      .then(function (response) {

        // setSuccess(true)
        alert(JSON.stringify(response))

      })
      .catch(function (error) {
        // setSuccess(false)
        alert(data)
      })

  }
  // custom validation


  const validate = (values: any) => {
    const errors: FormikErrors<IFormInputs> = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }

    // else if (values.title.length > 15) {
    //   errors.title = 'Must be 15 characters or less';
    // }

    if (!values.image) {
      errors.image = 'Image is required';
    }

    // else if (values.description.length > 20) {
    //   errors.description = 'Must be 20 characters or less';
    // }

    

    return errors;
  };


  const formik = useFormik<IFormInputs>({
    
    initialValues: initialValues,
    enableReinitialize: true,
    validate,
    
    // validationSchema: yup.object({
    //   title: yup.string().required(),
    //   description: yup.string().required(),
    //   markdown: yup.string().required()
    // }),


    onSubmit: values => {


      // setData(values)
      
      submitBlog(values)
    }
  });



  return (
    <>
    <Head>
      <title>
        Guess the
      </title>
    </Head>
    <Box
      sx={{
        marginX: 2
      }}
    >

      <Link
        href="/admin/flag"
        passHref
      >
        <Button

          startIcon={<ArrowBackIcon fontSize="small" />}
        >
          Back
        </Button>
      </Link>
    </Box>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >

      <Container >
        <Box sx={{ my: 3 }}>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            Create a new flag
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body2"
          >
            Add a new flag
          </Typography>
        </Box>


        <form onSubmit={formik.handleSubmit}>
          <FormControl sx={{ width: '100%' }}>
            <TextField
              error={Boolean(formik.touched.name &&
                formik.errors.name
              )}
              fullWidth
              helperText={
                formik.touched.name &&
                formik.errors.name}
              label="Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />

            <Button
              variant="outlined"
              component="label"
              sx={{ width: '100%', height: 50 }}
            >
              Upload Image 
              <input
                id="image" name="image" 
                type="file"
                accept="image/*"
                hidden
              onChange={(event) => {
              if(event.currentTarget.files){
             
                // console.log(event.currentTarget.files[0])
                formik.setFieldValue("image",event.currentTarget.files[0])
              }                 
                }}
              />
            </Button>
            {formik.errors.image?(
<Box sx={{color:'red'}}>Image missing</Box>
            )
           
            :null}
            {formik.values.image?
            <Card sx={{ maxWidth: 345 }}>
      
        <CardMedia
          component="img"
          height="140"
          image= {`/images/${formik.values.image}`}
          alt="Flag"
        />
       
    </Card> :null}

            {/* <InputUnstyled  
       id="upload-photo"  
       name="upload-photo"  
       type="file"/>  */}


            {/* {
                      formik.values.image.length > 0 &&

                      <Card>
                          <CardActionArea>
                              <CardMedia
                                  component="img"
                                  alt="Contemplative Reptile"
                                  height="140"
                                  image={formik.values.image}
                                  title="Contemplative Reptile"
                              />
                          </CardActionArea>
                          <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                  Image
                              </Typography>
                          </CardContent>
                      </Card>
                  } */}

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </FormControl>
        </form>

      </Container>
    </Box>
  </>
  );
};

export default Edit;
