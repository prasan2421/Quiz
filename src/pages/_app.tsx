import '../styles/globals.css'
import React, { useState, useEffect, useMemo } from "react";
import { AppProps } from 'next/app'
import useMediaQuery from '@mui/material/useMediaQuery';
import Layout, { siteTitle } from '../components/layout'
import { styled, alpha, ThemeProvider, createTheme, useTheme,responsiveFontSizes, } from '@mui/material/styles';
import GoTop from "../components/goTop";

import { DashboardLayout } from '../components/components/dashboard-layout';

import useBreakpoint from 'use-breakpoint';
import Script from 'next/script'
import { amber, deepOrange, grey, indigo,purple } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';
import { Provider } from 'react-redux';
import axios from 'axios';
import { store } from '../app/store';

const BREAKPOINTS = { mobile: 0, tablet: 900, desktop: 1280 }

export default function App({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {
 
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  let theme = useMemo(
    () =>
      createTheme({
        
        palette: {
          
          mode: prefersDarkMode ? 'dark' : 'light',
          ...(prefersDarkMode === false
          ? {
              // palette values for light mode
              primary: {
                main: purple[500],
                contrastText: "#FFFFFF"
              },
              secondary: {
                main: '#121858',
                contrastText: "#FFFFFF"
              },
              background: {
                default: '#adb8c4',
                paper: '#5f6b79',
                
              },
              
            }
          : {
              // palette values for dark mode
              primary: {
                main: '#007fff',
                contrastText: "#FFFFFF"
              },
              secondary: {
                main: '#004c99',
                contrastText: "#FFFFFF"
              },
              background: {
                default: '#0a192a',
                paper: '#0a192a',
                
              },
             
            }),

        },
      }),
    [prefersDarkMode],
  );


theme = responsiveFontSizes(theme);



const getLayout =
        router.pathname.includes('/admin') ? ((page:any) => <DashboardLayout children={page} />)
        : ((page:any) => <Layout children={page} />);


  return (
    
    <Provider store={store}>
     {/* <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-JEYE1RNNJV"/>
<Script id="google-analytics" strategy="lazyOnload">
  {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-JEYE1RNNJV', {
    page_path: window.location.pathname,
    });
  `}
</Script> */}

    <ThemeProvider theme={theme}>
      {/* <GoTop /> */}
     
     
      {getLayout(<Component  {...pageProps} />)}
  </ThemeProvider>
 
  </Provider>
 
  )
}