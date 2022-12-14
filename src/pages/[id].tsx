import React from "react";

import fs from 'fs';
import path from 'path'
// import matter from 'gray-matter';
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useRouter } from 'next/router'
// import Announcement from "../components/Announcement";
// import Categories from "../components/Categories";
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import CancelIcon from '@mui/icons-material/Cancel';
import useBreakpoint from 'use-breakpoint';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import TextareaAutosize from '@mui/material/TextareaAutosize';
// import Newsletter from "../components/Newsletter";
// import Products from "../components/Products";
// import Slider1 from "../components/Slider";
import { styled, alpha, ThemeProvider, createTheme, useTheme, responsiveFontSizes, } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import prasannapng from '../assets/images/prasannapng.png';
import IconButton from '@mui/material/IconButton';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Backdrop from '@mui/material/Backdrop';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Send from '@mui/icons-material/Send';
import Zoom from '@mui/material/Zoom';
import Image from 'next/image'
import BackgroundText from "../components/BackgroundText";
// import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Switch from '@mui/material/Switch';
import Button, { ButtonProps } from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import styles from '../styles/About.module.css';

import { GoogleMap, LoadScript, useLoadScript, Marker } from "@react-google-maps/api";



// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


// const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


const objectData = [
  { 'id': '0', 'img': 'images/doe.png', 'country': 'Ghana' },
  { 'id': '1', 'img': 'images/1.png', 'country': 'Nepal' },
  { 'id': '2', 'img': 'images/foodbusters.png', 'country': 'China' },
  { 'id': '3', 'img': 'images/covid.png', 'country': 'Norway' },
  { 'id': '4', 'img': 'images/patanjalisfa.png', 'country': 'France' },
  { 'id': '5', 'img': 'images/pbri.png', 'country': 'Bolivia' },
  { 'id': '6', 'img': 'images/doe.png', 'country': 'Burundi' },
  { 'id': '7', 'img': 'images/doe.png', 'country': 'Qatar' },
  { 'id': '8', 'img': 'images/doe.png', 'country': 'United Kingdom' },
  { 'id': '9', 'img': 'images/doe.png', 'country': 'Congo' },
  { 'id': '10', 'img': 'images/doe.png', 'country': 'Gambia' },
  { 'id': '11', 'img': 'images/doe.png', 'country': 'Bhutan' },
  { 'id': '12', 'img': 'images/doe.png', 'country': 'Sri Lanka' },
  { 'id': '13', 'img': 'images/doe.png', 'country': 'Mexico' },
  { 'id': '14', 'img': 'images/doe.png', 'country': 'South Africa' },
  { 'id': '15', 'img': 'images/doe.png', 'country': 'South Sudan' },
  { 'id': '16', 'img': 'images/doe.png', 'country': 'Antigua and Barbuda' },
  { 'id': '17', 'img': 'images/doe.png', 'country': 'Montenegro' },
  { 'id': '19', 'img': 'images/doe.png', 'country': 'Vatican City' },
  { 'id': '20', 'img': 'images/doe.png', 'country': 'Mexico' },
  { 'id': '21', 'img': 'images/doe.png', 'country': 'Micronesia' },
  { 'id': '22', 'img': 'images/doe.png', 'country': 'Thailand' },
  { 'id': '23', 'img': 'images/doe.png', 'country': 'Cuba' },
  { 'id': '24', 'img': 'images/doe.png', 'country': 'El Salvador' },
  { 'id': '25', 'img': 'images/doe.png', 'country': 'Oman' },
  { 'id': '26', 'img': 'images/doe.png', 'country': 'Colombia' },
  { 'id': '27', 'img': 'images/doe.png', 'country': 'Albania' },
  { 'id': '28', 'img': 'images/doe.png', 'country': 'Tanzania' },
  { 'id': '29', 'img': 'images/doe.png', 'country': 'United Arab Emirates' },
  { 'id': '30', 'img': 'images/doe.png', 'country': 'Guyana' },
  { 'id': '31', 'img': 'images/doe.png', 'country': 'Palau' },
  { 'id': '32', 'img': 'images/doe.png', 'country': 'Singapore' },
  { 'id': '33', 'img': 'images/doe.png', 'country': 'Saint Kitts and Nevis' },
  { 'id': '34', 'img': 'images/doe.png', 'country': 'Indonesia' },
  { 'id': '35', 'img': 'images/doe.png', 'country': 'Nicaragua' },
  { 'id': '36', 'img': 'images/doe.png', 'country': 'Lebanon' },
  { 'id': '37', 'img': 'images/doe.png', 'country': 'Kuwait' },
  { 'id': '38', 'img': 'images/doe.png', 'country': 'Belarus' },
  { 'id': '39', 'img': 'images/doe.png', 'country': 'Nigeria' },
  { 'id': '40', 'img': 'images/doe.png', 'country': 'New Zealand' },
]


const Work = () => {
  const router = useRouter()
  const { id } = router.query
  const [allData, setAllData] = React.useState();
  const [currentItem, setCurrentItem] = React.useState();
  const [optionsData, setOptionsData] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [count, setCount] = React.useState(1);
  const [start, setStart] = React.useState(null);
  const [correctAnswer, setCorrectAnswer] = React.useState('');
  const [incorrectAnswer, setIncorrectAnswer] = React.useState('');
  const theme = useTheme();


  // const imgData=['/images/Patanjalisfa/1.jpg','/images/Patanjalisfa/2.jpg','/images/Patanjalisfa/3.jpg','/images/Patanjalisfa/4.jpg','/images/Patanjalisfa/5.jpg','/images/Patanjalisfa/6.jpg','/images/Patanjalisfa/7.jpg','/images/Patanjalisfa/8.jpg','/images/Patanjalisfa/9.jpg','/images/Patanjalisfa/10.jpg','/images/Patanjalisfa/11.jpg','/images/Patanjalisfa/12.jpg','/images/Patanjalisfa/13.jpg','/images/Patanjalisfa/14.jpg','/images/Patanjalisfa/15.jpg','/images/Patanjalisfa/16.jpg','/images/Patanjalisfa/17.jpg','/images/Patanjalisfa/18.jpg','/images/Patanjalisfa/19.jpg','/images/Patanjalisfa/20.jpg','/images/Patanjalisfa/21.jpg','/images/Patanjalisfa/22.jpg',]

  useEffect(() => {
    window.scrollTo(0, 0)

    fillData()

  }, [])



  const fillData = () => {

    let dataFiltered: any = ([...objectData].sort(() => 0.5 - Math.random())).slice(0, 5);


    setAllData(dataFiltered)

    generateItem(dataFiltered)



  }

  const generateItem = (data: any) => {



    if (currentItem) {
      setValue('')
      setCorrectAnswer('')
      setIncorrectAnswer('')

      let newAllData = allData.filter(item => item.id !== currentItem.id)

      const dataItem = newAllData[0];
      setAllData(newAllData)
      generateOptionsData(dataItem)
      setCurrentItem(dataItem)
      setCount((count) => count + 1)


    }
    else {
      const dataItem = data[0];

      generateOptionsData(dataItem)
      setCurrentItem(dataItem)


    }


    // setCurrentItem(item)

  }

  const generateOptionsData = (data: any) => {

    let options = []

    //Generate 3 random items from array of objects
    let dataFiltered: any = (([...objectData].sort(() => 0.5 - Math.random())).filter(item => item.id !== data.id)).slice(0, 3);

    //merging two arrays
    options.push(...dataFiltered)
    options.push(data)


    // alert(JSON.stringify(options))

    // setting random ordered array of 4 items
    setOptionsData([...options].sort(() => 0.5 - Math.random()))

  }

  const matches = useMediaQuery('(min-width:600px)');
  // const colorMode = React.useContext(ColorModeContext);
  const [checked, setChecked] = React.useState(true);
  const [imgData, setImgData] = React.useState([]);

  // const handleStepChange = () => (
  //   setCheckedZoom(true)
  // )

  // const handleHireForm = () => (
  //   setCheckedZoom(false)
  // );


  const handleRadioChange = (itemId: any) => {

    setValue(itemId);
    if (currentItem.id === itemId) {
      setCorrectAnswer(itemId)

      setScore((score) => score + 1)

    }
    else {
      setIncorrectAnswer(itemId)
      setCorrectAnswer(currentItem.id)
    }
  };

  const empty =()=>{
    setStart(false);
    setAllData();
    setCurrentItem();
    setOptionsData([]);
    setValue('');
  
    setCorrectAnswer('');
    setIncorrectAnswer('');
    
  }


  const containerRef = React.useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD52vW7Nc0Dxavo8s5wd_uaPjLr8SuWYJM',
  });

  if (!isLoaded) return <div>Loading...</div>;



  return (
    <ThemeProvider
      theme={theme}
    >
      <Box sx={{ flex: 1, justifyContent: 'left', display: 'flex' }}>{router.pathname !== "/" && (

        <Button sx={{ zIndex: 100000, marginLeft: '10px', marginTop: '10px' }} variant="contained"
          onClick={() => router.back()}
          startIcon={<ArrowBackIcon />}>
          Back
        </Button>
      )}</Box>

    
        <Box className='main' component="main" sx={{ color: 'text.primary',  }}>

          {/* -------------------------------------------- First grid --------------------------------------------------- */}

          <Box style={{ position: 'relative', overflow: 'hidden', paddingTop: '6rem', paddingBottom: '5rem' }}>
            <BackgroundText text={id} />
            <Grid container sx={{ paddingX: { xs: '2.5rem', md: '4.5rem' }, marginBottom: '5rem' }}>
              <Grid item xs={12} lg={8}>
                <Slide direction="up" in={checked} container={containerRef.current}>
                  <Box sx={{ color: 'text.primary' }} >
                    <Box className={styles.PortfolioTitle} >

                      <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
                        {...(checked ? { timeout: 1000 } : {})}>
                        <Typography variant="h2">{id}</Typography>
                      </Grow>

                    </Box>

                  </Box>
                </Slide>
              </Grid>
            
            </Grid>

          </Box>

          {/* -------------------------------------------- First grid end --------------------------------------------------- */}


          {/* -------------------------------------------- Second grid --------------------------------------------------- */}

          {
        start==null ||  start==false ?(
          <Card sx={{justifyContent:'center', textAlign:'center', display:'flex',}}>
          <CardContent >
            
            {start==false?
            <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
              Score: {score}
            </Typography>
            :null}
            
          </CardContent>
          <CardActions>
          <Button
  color="secondary"
  size="large"
  variant="contained"
  onClick={()=>{setStart(true); setScore(0); fillData();   setCount(1);}}
>
  {start==false?'Play Again':'Play'}

  </Button>
           
          </CardActions>
        </Card>

          
  
        ):
          <Box className={styles.ProjectsDiv}>
            <Container maxWidth="xl"  >
              <Grid container >
                <Grid xs={12} sx={{ justifyContent: 'center', textAlign: 'center' }} >
                  <Typography variant="h3" sx={{ marginBottom: 5 }}>Score: {score}  .......   {count}/5</Typography>
                  <Card sx={{ margin: '7px', borderTop: `2px solid lightgreen` }}>

                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" color="lightgreen">
                        {currentItem ? currentItem.country : null}
                      </Typography>

                      {
                        optionsData.map((item: any) => (

                          <Button sx={{ margin: 1 }} variant={value == item.id || (currentItem.id == item.id && value) ? "contained" : "outlined"}
                            // Mltiple ternary operation
                            color={correctAnswer === item.id ? "success" : incorrectAnswer === item.id ? "error" : "primary"}
                            onClick={!value ? () => handleRadioChange(item.id) : null}
                            endIcon={correctAnswer === item.id ? <CheckCircleOutlineIcon /> : incorrectAnswer === item.id ? <CancelOutlinedIcon /> : null}
                          >
                            {item.country}
                          </Button>
                        ))
                      }
                      <Box >
                        {value ?
                          <Button sx={{ marginTop: '10px' }} variant="contained"
                            onClick={() => allData.length > 1 ?  generateItem(null) :  empty()
                              }
                            endIcon={<ArrowForwardIcon />}>
                            {allData.length > 1 ? 'Next' : 'Finish'}
                          </Button>

                          : null}
                      </Box>
                    </CardContent>

                  </Card>
                </Grid>

              </Grid>

            </Container>



          </Box>
}

          {/* -------------------------------------------- Second grid end--------------------------------------------------- */}


      </Box>
      
     
    </ThemeProvider>
  );
};

export default React.memo(Work);



