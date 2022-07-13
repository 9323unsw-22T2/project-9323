import React from 'react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import Box from '@mui/material/Box';
import Diagram from './1.jpg';
import styles from './Expert.module.css';
const App = () => {
  React.useEffect(() => {

  }, [])

  return (
    <Box sx={{ justifyContent: 'center' }} className={styles.background}>{localStorage.getItem('token') ? (<LoggedNarbar></LoggedNarbar>) : (<Navbar></Navbar>)}
      <Box sx={{ margin: 'auto', display: 'flex', flexDirection: 'column', mt: 10, width: '100%', height: '60vh', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderWidth: '0px', borderStyle: 'solid' }}>
        <div className={styles.title} >You are not a expert</div>
      <Box sx={{ margin: 'auto', display: 'flex', mt: 10, width: '70%', height: '60vh', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderWidth: '0px', borderStyle: 'solid' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%', height: '50vh', backgroundColor: 'transparent', borderColor: 'gray', justifyContent: 'flex-start', alignItems: 'center', borderWidth: '0px', borderStyle: 'solid', margin: '5px' }}>
            <img src={Diagram} alt="Logo" className={styles.diagram} />
        </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', height: '50vh', backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '5px' }}>
            <div className={styles.text}>
              <p>From divorce lawyers and dog vets to Maytag techs and Mercedes mechanics, if you have professional expertise then you can earn cash on JustAnswer. Join the thousands of Experts who have answered over 16 million questions.</p>
              <p>As a service provider with Local Expert, you will discover a seamless platform, designed by service providers for service providers. Decades of our experience has been applied to ensure that customers can easily find the trades and services they are looking for. As you manage your leads and make connections using the seamless features of the platform, both you and your customers will enjoy a better experience with Local Expert.</p></div>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '10%', height: '50vh', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', borderColor: 'gray', borderWidth: '0px', borderStyle: 'none', margin: '5px' }}>
          </Box>
        </Box>
        <button className={styles.btn} >Apply</button>
      </Box>
    </Box>
  );
};

export default App;
