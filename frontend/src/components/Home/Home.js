import React from 'react';
import Navbar from '../NavBar/Navbar';
import Accordians from './Accordians'
import TypeAnimation from 'react-type-animation';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import styles from './App.module.css';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [load, setLoad] = React.useState(true);
  const navigate = useNavigate();

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
          : <Navbar></Navbar>}
{/*         <img src="https://cdn.dribbble.com/users/782052/screenshots/10927554/media/e961df046013321feb28cf99b7fc7800.jpg"
        style={{ alignItems: 'flex-end', width: 1200, height: 900, postiion: 'absolute', left: 5, top: 5 }}/> */}
        <div style={{ display: 'flex', marginTop: 3, height: '100%' }}>
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
          <Accordians style ={{ position: 'absolute', float: 'left' }}/>
        </div>
        </Collapse>

        <div className={load ? styles.unfocusButton : styles.focusButton}>
        <Button
          onClick={(e) => { e.preventDefault(); navigate('/main') }}
          onMouseOver={(e) => { e.preventDefault(); setLoad(false) }} onMouseOut={useThrottle((e) => {
            e.preventDefault();
            setLoad(true)
          })}sx={{ fontSize: '4rem', backgroundColor: 'rgba(60, 179, 113,0.5)', borderRadius: '2rem', '&:hover': { backgroundColor: 'rgba(60, 179, 113,0.8)' } }} color='success' variant="contained">Explore</Button>
</div>
        <div className={load ? styles.unfocusbackground : styles.focusbackground} style={{ position: 'absolute', width: '100%', height: '90%', backgroundImage: 'url(\'https://cdn.dribbble.com/users/691604/screenshots/10764642/media/b9888421afd46c03efef1ff072eec418.png\')' }}></div>
        </div>
      </div>
  );
}
export default Home;
