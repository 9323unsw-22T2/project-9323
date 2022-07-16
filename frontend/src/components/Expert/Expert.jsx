import React from 'react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import Box from '@mui/material/Box';
import Diagram from './1.jpg';
import styles from './Expert.module.css';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  React.useEffect(() => {

  }, [])

  return (
    <Box sx={{ justifyContent: 'center' }} className={styles.background}>{localStorage.getItem('token') ? (<LoggedNarbar></LoggedNarbar>) : (<Navbar></Navbar>)}
      <Box sx={{ margin: 'auto', display: 'flex', flexDirection: 'column', mt: 20, width: '100%', height: '60vh', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderWidth: '0px', borderStyle: 'solid' }}>
        <div className={styles.title} >You are not a expert</div>
        <Box sx={{ margin: 'auto', display: 'flex', mt: 10, width: '70%', height: '60vh', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderWidth: '0px', borderStyle: 'solid' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%', height: '50vh', backgroundColor: 'transparent', borderColor: 'gray', justifyContent: 'flex-start', alignItems: 'center', borderWidth: '0px', borderStyle: 'solid', margin: '5px' }}>
            <img src={Diagram} alt="Logo" className={styles.diagram} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', height: '50vh', backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '5px' }}>
            <div className={styles.text}>
              <p>Your current score is: 67</p>
              <p>You have not yet reach enough score to become an expert. To become a expert, you will either need to earn enough score over 200 by contributing to the society or submitting your on-line applications. </p>
              <p>You can submit your expert application here, you will need to specify your professional field, certificates and your contact number. We will review your profile within 14 working days and will contact you once it is approval.</p>
            </div>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '10%', height: '50vh', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', borderColor: 'gray', borderWidth: '0px', borderStyle: 'none', margin: '5px' }}>
          </Box>
        </Box>
        <button className={styles.btn} onClick={(e) => { navigate('/ApplyExpert') }} >Apply</button>
      </Box>
    </Box>
  );
};

export default App;
