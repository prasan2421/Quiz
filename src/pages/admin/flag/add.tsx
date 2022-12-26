import { useRef, useState } from "react";
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useFormik, FormikErrors } from 'formik';
import { FormControl, InputLabel, Input } from '@mui/material'
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux'

import { ButtonBase } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
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

  Typography,
  Card, CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,


} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import InputUnstyled from '@mui/base/InputUnstyled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import { JSDOM } from 'jsdom';

import { marked } from 'marked';
import { setDefaultResultOrder } from "dns";

const clean = marked('# Marked in browser\n\nRendered by **marked**.');

interface IFormInputs {

  image: any;

}



const Add = () => {
  const { user, isSuccess, spinnerAuth } = useSelector((state: any) => state.auth)
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState('')
  const [fieldValue, setFieldValue] = useState([])
  const [success, setSuccess] = useState(false)
  const ref = useRef();


  function selectProps(...props){
    return function(obj){
      const newObj = {};
      props.forEach(name =>{
        newObj[name] = obj[name];
      });
      
      return newObj;
    }
  }

  const submitBlog = async (data: any) => {

 
    if (!data) {
      return;
    }

//  const imageData = data.image.map(selectProps("displayName", "name"));

//  console.log(imageData);return;

    // console.log(data);return;
    const formData = new FormData();
    for(let i =0; i < data.image.length; i++) {

      // Third parameter informData.append (a,b,c) i.e. c-> change the default file name.
      formData.append('image', data.image[i], data.image[i].displayName)
}
      // formData.append('imageData', imageData)
    

    axios.post(process.env.HOST + '/flags'
      , formData,
      {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      }
    )
      .then(function (response) {

        // setSuccess(true)
        // console.log(response)
        alert(JSON.stringify(response))

      })
      .catch(function (error) {
        // setSuccess(false)
        alert('Error')
      })

  }
  // custom validation

  function withoutFormat(file) {
    const formats = ['png', 'jpg', 'jpeg', 'gif'];
    const regex = new RegExp(`.(${formats.join("|")})$`, 'gi');
    return file.replace(regex, "");
  }


  const validate = (values: any) => {
    const errors: FormikErrors<IFormInputs> = {};



    // else if (values.title.length > 15) {
    //   errors.title = 'Must be 15 characters or less';
    // }

    if (values.image.length < 1) {
      errors.image = 'Image is required';
    }

    // if (error) {
    //   errors.image = error;
    // }

    // else if (values.description.length > 20) {
    //   errors.description = 'Must be 20 characters or less';
    // }


    return errors;
  };


  const formik = useFormik<IFormInputs>({

    initialValues: {

      image: [],


    },
    validate,
    // validationSchema: yup.object({
    //   title: yup.string().required(),
    //   description: yup.string().required(),
    //   markdown: yup.string().required()
    // }),


    onSubmit: values => {

      // alert(JSON.stringify(values.image))
      // console.log(values); return;

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


          <form onSubmit={formik.handleSubmit} >
            <FormControl sx={{ width: '100%', alignItems: 'center' }}>

              <Button
                variant="outlined"
                // color={formik.errors.image ?"error":"primary"}
                component="label"
                sx={{ width: '100%', height: 50 }}
              >
                {formik.values.image.length > 0 ? 'Add Images' : 'Upload Images'}
                <input
                  id="image" name="image"
                  type="file"
                  accept="image/*"
                  hidden
                  multiple

                  onChange={(event) => {
                    if (event.currentTarget.files) {

                      const files = [...event.currentTarget.files];
                      const filesNew = []

                      for (let i = 0; i < files.length; i++) {
                        let obj = files[i]
                        // new File(getImageFile, "mynewfile.jpeg");
                        let obj2 = { 'displayName': withoutFormat(files[i].name) }
                        Object.assign(obj, obj2)
                        filesNew.push(obj)
                      }

                      // console.log(filesNew)
                      formik.setFieldValue("image", formik.values.image.concat(filesNew))
                    }
                  }}
                />
              </Button>
              {formik.errors.image ? (
                <Box sx={{ color: 'red' }}>Please fix the error</Box>
              )

                : null}

              <Grid container spacing={2} sx={{ marginTop: 2 }}>


                {formik.values.image.length ? formik.values.image.map((file: any, i: any) => (
                  <Grid item xs={12} md={4}>
                    <Card sx={{ textAlign: '-webkit-center', position: 'relative', }}>
                      <IconButton color="error" sx={{ position: 'absolute', right: 0 }} onClick={() => {
                        let newNotes = formik.values.image.splice(i, 1)
                        formik.setFieldValue("image", formik.values.image)
                      }
                      }>
                        <CancelIcon />
                      </IconButton>
                      
                      <CardMedia

                        key={i}
                        component="img"
                        sx={{ height: 150, width: 150, marginTop: 3 }}
                        image={URL.createObjectURL(file)}
                        alt="Flag"
                      />
                      <CardContent>
                      
                        <TextField
                          error={Boolean(!file.displayName
                          )}
                          required
                          fullWidth
                          helperText={
                            !file.displayName ? 'Enter the name' : null}
                          label="Name"
                          margin="normal"
                          name="name"
                          onBlur={formik.handleBlur}
                          onChange={(event) => {
                            // formik.setFieldValue("image", formik.values.image[i].display)
                            file.displayName = event.target.value
                            console.log(file.displayName)
                            // if (event.target.value == '') {
                            //   setError('Field cannot be empty.')
                            // }
                          }
                          }
                          // InputProps={{
                          //   endAdornment: <IconButton aria-label="Restart name" edge="end" color="secondary" 
                          //   onClick={() => {
                          //     file.displayName = file.name
                          //     console.log(file.displayName)
                          //   }
                          //   }
                          //   >
                          //     <RestartAltIcon />
                          //   </IconButton>,
                          // }}
                          defaultValue={file.displayName}
                          // value={file.displayName}
                          variant="outlined"
                        />


                      </CardContent>
                    </Card>
                  </Grid>

                )) : null}
              </Grid>
              {/* {formik.values.image ?

Object.keys(formik.values.image).map((item)=>{
  {item.name}
//   <CardMedia
//   component="img"
//   sx={{ height: 150, width: 150, margin: 5, }}
//   image={URL.createObjectURL(item.name)}
//   alt="Flag"
// />
})
               

                : null} */}


              <Box sx={{ py: 2, width: '100%' }}>
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

export default Add;


