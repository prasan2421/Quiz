import React from "react";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useRouter } from 'next/router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  CardMedia,

} from '@mui/material';
import { styled, alpha, ThemeProvider, createTheme, useTheme, } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BackgroundText from "../components/BackgroundText";
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Button, { ButtonProps } from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import styles from '../styles/About.module.css';
import CssBaseline from '@mui/material/CssBaseline';
import { GoogleMap, LoadScript, useLoadScript, Marker } from "@react-google-maps/api";
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Boop from "../components/Boop";
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

const Work = () => {

  const router = useRouter()
  const { id } = router.query
  const [allData, setAllData] = React.useState<any>([]);
  const [currentItem, setCurrentItem] = React.useState<any>();
  const [optionsData, setOptionsData] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [objectData, setObjectData] = React.useState([]);
  const [count, setCount] = React.useState(1);
  const [start, setStart] = React.useState(null);
  const [checked, setChecked] = React.useState(true);
  const [correctAnswer, setCorrectAnswer] = React.useState('');
  const [incorrectAnswer, setIncorrectAnswer] = React.useState('');
  const theme = useTheme();

  useEffect(() => {

    getData()
    // fillData()

  }, [])

  const getData = async () => {
    try {
      await axios.get(process.env.HOST + '/flags/public/all',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then(function (response) {
          // alert(JSON.stringify(response.data[0].image))
          console.log(response)
          setObjectData(response.data[0].image)
          // setData(response.data)

        })
    }
    catch (error) {
      alert(JSON.stringify(error))
      console.log('Error is :' + error);
    };


  }


  const fillData = () => {
    let dataFiltered: any = ([...objectData].sort(() => 0.5 - Math.random())).slice(0, 20);
    setAllData(dataFiltered)
    generateItem(dataFiltered)
  }

  const generateItem = (data: any) => {

    // If previous current data is already present
    if (currentItem) {
      setValue('')
      setCorrectAnswer('')
      setIncorrectAnswer('')


      // filter out the old data item and update the data state
      let newAllData: any = allData.filter(item => item.originalname !== currentItem.originalname)

      //Set filtered data
      setAllData(newAllData)

      // generate new current data 
      const dataItem = newAllData[0];
      generateOptionsData(dataItem)
      setCurrentItem(dataItem)
      setCount((count) => count + 1)


    }


    // If no current data is present i.e. New start game
    else {
      const dataItem = data[0];
      generateOptionsData(dataItem)
      setCurrentItem(dataItem)
    }

  }

  const generateOptionsData = (data: any) => {

    let options = []

    //Generate 3 random items from array of objects and filter out data with the current item
    let dataFiltered: any = (([...objectData].sort(() => 0.5 - Math.random())).filter(item => item.originalname !== data.originalname)).slice(0, 3);

    //merging two arrays (3 random data items + 1 corrent data item)
    options.push(...dataFiltered)
    options.push(data)

    // setting random ordered array of 4 items
    setOptionsData([...options].sort(() => 0.5 - Math.random()))

  }

  const handleChange = (itemId: any) => {

    setValue(itemId);
    if (currentItem.originalname === itemId) {
      setCorrectAnswer(itemId)

      setScore((score) => score + 1)

    }
    else {
      setIncorrectAnswer(itemId)
      setCorrectAnswer(currentItem.originalname)
    }
  };

  const empty = () => {
    setStart(false);
    setAllData([]);
    setCurrentItem('');
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



      <Box className='main' component="main" sx={{ color: 'text.primary', }}>


        {/* -------------------------------------------- First grid --------------------------------------------------- */}

        <Box style={{ position: 'relative', overflow: 'hidden', paddingBottom: '5rem' }}>

          <BackgroundText text={id} />
          <Container maxWidth="xl" sx={{ marginBottom: '5rem' }}>


            <Box >{router.pathname !== "/" && (

              <Button sx={{ marginTop: 10 }}
                onClick={() => router.back()}
                startIcon={<ArrowBackIcon />}>
                Back
              </Button>
            )}</Box>
            <Slide direction="up" in={checked} container={containerRef.current}>
              <Box sx={{ color: 'text.primary' }} >
                <Box className={styles.PortfolioTitle} >

                  <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
                    {...(checked ? { timeout: 1000 } : {})}>
                    <Typography
                      sx={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundImage: '-webkit-linear-gradient(45deg, #64d5f8, #de4887, #f7fb14  70%)',
                      }}
                      variant="h2">{id}</Typography>
                  </Grow>

                </Box>

              </Box>
            </Slide>


          </Container>

        </Box>

        {/* -------------------------------------------- First grid end --------------------------------------------------- */}


        {/* -------------------------------------------- Second grid --------------------------------------------------- */}

        <Box className={styles.ProjectsDiv}>
          <Container maxWidth="xl"  >
            <Grid container >
              <Grid item xs={12} sx={{ justifyContent: 'center', textAlign: 'center' }} >
                {
                  start == null || start == false ? (
                    <Card sx={{ margin: '7px', }} >

                      <CardContent>
                        {start == false ?
                        
                          <Typography  variant="h3" color="text.secondary" gutterBottom>
                            Score: {score}
                          </Typography>
                          : null}


                        {/* <Button
                        color="secondary"
                        size="large"
                        variant="contained"
                        onClick={() => { setStart(true); setScore(0); fillData(); setCount(1); }}
                      >
                        {start == false ? 'Play Again' : 'Play'}

                      </Button> */}
                      <Boop scale={1.5} springConfig={{ tension: 150, friction: 10 }} >
                        <IconButton aria-label="Play" size="large" onClick={() => { setStart(true); setScore(0); fillData(); setCount(1); }}>
                          <PlayCircleIcon color="primary" sx={{ fontSize: 100 }} />
                        </IconButton>
                        </Boop>
                      </CardContent>
                    </Card>
                  ) :
                    <Box >
                      <Box sx={{ marginBottom: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Typography variant="h3" sx={{ alignItems: 'center' }}>Score: {score}</Typography>
                        <Typography variant="h3">{count}/20</Typography>
                      </Box>

                      <Card sx={{ margin: '7px', }} >

                        <CardContent>
                          <Box sx={{ textAlign: '-webkit-center' }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 300, marginBottom: 3 }}
                              image={'/images/flags/' + currentItem.filename}
                              alt="Flag"
                            />
                          </Box>



                          <Grid container rowSpacing={2} columnSpacing={2}>
                            {
                              optionsData.map((item: any, index) => (

                                <Grid item xs={12} md={6} key={index}>
                                  <Button sx={{ width: '100%', padding: 3, }} variant={value == item.originalname || (currentItem.originalname == item.originalname && value) ? "contained" : "outlined"}
                                    // Mltiple ternary operation
                                    color={correctAnswer === item.originalname ? "success" : incorrectAnswer === item.originalname ? "error" : "primary"}
                                    onClick={!value ? () => handleChange(item.originalname) : null}
                                    endIcon={correctAnswer === item.originalname ? <CheckCircleOutlineIcon /> : incorrectAnswer === item.originalname ? <CancelOutlinedIcon /> : null}
                                  >
                                    {item.originalname}
                                  </Button>
                                </Grid>
                              ))
                            }
                          </Grid>
                          <Box >
                            {value ?
                              <Button sx={{ marginTop: '10px' }} variant="contained"
                                onClick={() => allData.length > 1 ? generateItem(null) : empty()
                                }
                                endIcon={<ArrowForwardIcon />}>
                                {allData.length > 1 ? 'Next' : 'Finish'}
                              </Button>

                              : null}
                          </Box>



                        </CardContent>
                      </Card>
                      <Button
                        color="primary"
                        size="large"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => { empty() }}
                      >
                        Back
                      </Button>
                    </Box>
                }
              </Grid>

            </Grid>

          </Container>



        </Box>
        {/* -------------------------------------------- Second grid end--------------------------------------------------- */}


      </Box>


    </ThemeProvider>
  );
};

export default React.memo(Work);




