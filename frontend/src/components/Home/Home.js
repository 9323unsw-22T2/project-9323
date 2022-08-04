import React from 'react';
import Navbar from '../NavBar/Navbar';
import Accordians from './Accordians'
import TypeAnimation from 'react-type-animation';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import styles from './App.module.css';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useMediaQueries } from '@react-hook/media-query'

const Home = () => {
  const [load, setLoad] = React.useState(true);
  const [opened, setOpened] = React.useState(false);

  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { matches, matchesAny, matchesAll } = useMediaQueries({
    screen: 'screen',
    width: '(min-width: 1000px)'
  })
  function useThrottle (fn, delay, dep = []) {
    const { current } = React.useRef({ fn, timer: null });
    React.useEffect(function () {
      current.fn = fn;
    }, [fn]);

    return React.useCallback(function f (...args) {
      if (!current.timer) {
        current.timer = setTimeout(() => {
          delete current.timer;
        }, delay);
        current.fn(...args);
      }
    }, dep);
  }
  /*   React.useEffect(async (e) => {
    try {
      const response = await fetchDashboard({ });
      console.log(response.data.message.page);
      setData(response.data.message.page);
    } catch (error) {
      alert(error);
    }
  }, []); */
  /*  {localStorage.getItem('token')
        ? <LoggedNarbar></LoggedNarbar>
        : <Navbar></Navbar>}
        <img src="https://cdn.dribbble.com/users/782052/screenshots/10927554/media/e961df046013321feb28cf99b7fc7800.jpg"
        style={{ alignItems: 'flex-end', width: 1200, height: 900, postiion: 'absolute', left: 5, top: 5 }}/>
  */

  return (
      <div className="home" style={{ backgroundColor: '#f6f9ff', height: '100%' }}>
        {localStorage.getItem('token')
          ? <LoggedNarbar></LoggedNarbar>
          : <Navbar opened={opened} setOpened={setOpened}></Navbar>}
{/*         <img src="https://cdn.dribbble.com/users/782052/screenshots/10927554/media/e961df046013321feb28cf99b7fc7800.jpg"
        style={{ alignItems: 'flex-end', width: 1200, height: 900, postiion: 'absolute', left: 5, top: 5 }}/> */}
        <div className={load ? styles.unfocusbackground : styles.focusbackground} style={{ position: 'absolute', width: '100%', height: '90%', backgroundImage: 'url(\'https://cdn.dribbble.com/users/691604/screenshots/10764642/media/b9888421afd46c03efef1ff072eec418.png\')' }}></div>
        <Box sx={{
          display: matches.width ? 'flex' : 'grid',
          marginTop: 3,
          marginLeft: 10,
          height: '70%',
        }}>
        <Collapse sx={{ zIndex: 3 }} orientation='horizontal' in={load} timeout="auto" >

        <div style={{ zIndex: 3 }}>
        <TypeAnimation
            cursor={false}
            sequence={['Welcome to Your Online', 100, 'Welcome to Your Online']}
            wrapper="h1"
            className={styles.text}
          />
          <TypeAnimation
            cursor={false}
            sequence={['Information Hub', 100, 'Information Hub']}
            wrapper="h1"
            className={styles.text}
          />
          {matches.width &&
          <Accordians style ={{ position: 'absolute', float: 'left' }}/>}
        </div>
        </Collapse>
        <div className={load ? styles.unfocusButton : styles.focusButton}>
        <Button
          onClick={(e) => { e.preventDefault(); if (localStorage.getItem('token')) { navigate('/main') } else { setOpened(true) } }}
          onMouseOver={(e) => { e.preventDefault(); setLoad(false) }} onMouseOut={useThrottle((e) => {
            e.preventDefault();
            setLoad(true)
          }, 300)}sx={{ fontSize: '4rem', backgroundColor: 'rgba(60, 179, 113,0.5)', borderRadius: '2rem', '&:hover': { backgroundColor: 'rgba(60, 179, 113,0.8)' } }} color='success' variant="contained">Explore</Button>
        </div>

        </Box>
      </div>
  );
}
export default Home;
