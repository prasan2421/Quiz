import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image';
import Head from 'next/head'
// import Layout, { siteTitle } from '../../../components/layout'
import utilStyles from '../../styles/utils.module.css'
// import { getSortedPostsData } from '../../../../lib/posts'
import Link from 'next/link'
import ButtonBase from '@mui/material/ButtonBase';
// import Date from '../../../components/date'
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
// import { getProjectsIds } from '../../../../lib/posts'
import { CardActionArea, CardActions } from '@mui/material';
import Zoom from '@mui/material/Zoom';
import Paper from '@mui/material/Paper';
import useBreakpoint from 'use-breakpoint';
import deer from '../../assets/images/deer.png';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import BackgroundText from "../../components/BackgroundText";

import { GetStaticProps } from 'next'
// import {Link as Link2} from '@mui/material/Link';

import {Box, Slide, Grow, Typography, Button, IconButton} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled, alpha, ThemeProvider, createTheme, useTheme,responsiveFontSizes, } from '@mui/material/styles';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import DownloadIcon from '@mui/icons-material/Download';
import { url } from "inspector";

const BREAKPOINTS = { mobile: 0, tablet: 900, desktop: 1280 }



const CustomButton = styled(Button)({
 
    padding:'1rem 3rem 1rem 3rem'
   });

   const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    overflow:'hidden',
   
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
     
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .Image-mui': {
        transform: 'scale(1.5)',
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));
  
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    transition: 'transform .2s',
    
    '&:hover': {
      
     
     
    },
  });
  
  const ImageBox = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,

    

    '&:hover': {
      '& .ImageBox-Text': {
        backgroundColor:theme.palette.mode === 'dark' ?'rgb(48 48 48 / 50%)':'rgb(255 255 255 / 24%)',
      },
     
     
    },
    
  }));
  
  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));
  
  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));   

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function HomeSectionSecond({posts}) {

  const router = useRouter()
  const { breakpoint, maxWidth, minWidth } = useBreakpoint(BREAKPOINTS, 'desktop');

    const [checked, setChecked] = React.useState(true);
    const [mouseOverItem, setMouseOverItem] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    
    const containerRef = React.useRef(null);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const handleOpen = () => {
      router.push('/projects')
    };

    const handlePopoverOpen = (index:any) => {
      setMouseOverItem(index)
    };

    
  
  
  
  
  const objectData=[
      {'id':'1','img':'images/1.png','title':'Guess the Country Flag','subtitle':'Test your knowledge','color':'red'},
      {'id':'2','img':'images/foodbusters.png','title':'Guess the Country','subtitle':'Test your knowledge','color':'green'},
      {'id':'3','img':'images/covid.png','title':'Guess the Animal','subtitle':'Test your knowledge','color':'#81D8F7'},
      {'id':'4','img':'images/patanjalisfa.png','title':'Guess the Plant','subtitle':'Test your knowledge','color':'yellow'},
      {'id':'5','img':'images/pbri.png','title':'Guess the Country Flag','subtitle':'Test your knowledge','color':'cyan'},
      {'id':'9','img':'images/doe.png','title':'Guess the Country Flag','subtitle':'Test your knowledge','color':'purple'},
    ]
    
  //     useEffect(()=>{
      
  //   // getStaticProps()
  //   alert(JSON.stringify(posts))
  // })

 

  
  const theme = useTheme();
  return (

    <Box sx={{position:'relative', overflow: 'hidden', paddingBottom:'10rem',backgroundColor: 'background.default'}}>
    <BackgroundText text={'Guess'}/>

    <Container maxWidth="xl" sx={{ marginTop: '5rem' }}  >
      <Grid container className="portfolioGallary" spacing={2} columns={2}>
      {(objectData?objectData:[]).map((data, index) => (
        <Grid xs={12} sm={12} md={12} key={index}>
        <Card sx={{margin:'7px', borderTop:`2px solid  ${data.color}`,}}>
        <CardActionArea sx={{ display: 'flex' }} onClick={() => {
          router.push({
            pathname: `/${data.title}`,
            // query: data,
          })}}>
          <CardContent sx={{flex:1, textAlign:'center'}}>
            <Typography component="div" variant="h5">
             {data.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
            {data.subtitle}
            </Typography>
          </CardContent>
          {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
          </Box> */}
       
        <CardMedia
          component="img"
          sx={{ width: '100%', height:100,flex:1 }}
          image={data.img}
          alt="Live from space album cover"
        />
        </CardActionArea>
      </Card>
      </Grid>
      ))}
     

      
      </Grid>
      </Container>
  </Box>
  );
}



