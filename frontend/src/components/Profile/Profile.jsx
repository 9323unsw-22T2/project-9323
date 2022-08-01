/* eslint-disable no-unused-vars */

import React from 'react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import Box from '@mui/material/Box';
import Photo from '../../profile.png';
import styles from './Profile.module.css';
import { getInfo, postInfo } from '../../service'
const App = () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [Password, setPassword] = React.useState('');
  React.useEffect(async () => {
    try {
      const response = await getInfo(localStorage.getItem('token'), localStorage.getItem('user_id'))
      setData(response.data)
      console.log(data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <Box sx={{ justifyContent: 'center' }} className={styles.background}>{localStorage.getItem('token') ? (<LoggedNarbar></LoggedNarbar>) : (<Navbar></Navbar>)}
      <Box className={styles.card} sx={{ margin: 'auto', display: 'flex', flexDirection: 'column', mt: 10, justifyContent: 'center', alignItems: 'center', borderWidth: '0px', borderStyle: 'solid' }}>
        <div className={styles.title} >My Information</div>
        <div className={styles.title1}>{data.email}</div>
        {(error)
          ? <div className={styles.error} > Username has been used by another user, please try again! </div>
          : <></>
        }
        <Box className={styles.profileLogo2} sx={{ margin: 'auto', display: 'flex', mt: 5, width: '80%', justifyContent: 'center', justifyItems: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'transparent', borderWidth: '0px', borderStyle: 'solid' }}>
          <Box className={styles.profileLogo1} sx={{ flexDirection: 'column', width: '30%', backgroundColor: 'transparent', borderColor: 'gray', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', borderWidth: '0px', borderStyle: 'solid', margin: '5px' }}>
            <div className={styles.profileLogo}>
              <img src={Photo} alt="Logo" className={styles.logo} />
              {/* <button className={styles.button}> Change </button> */}
            </div>
          </Box>
          <Box className={styles.mobile} sx={{ flexDirection: 'column', width: '10%', backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center', borderColor: 'gray', borderWidth: '0px', borderStyle: 'none', margin: '5px' }}>
            <Box className={styles.mobile} sx={{ flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'transparent', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
              Username:
            </Box>

            <Box className={styles.mobile} sx={{ flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'transparent', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
              Password:
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'transparent', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%', backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '5px' }}>

            <Box className={styles.mobile2} sx={{ width: '90%', height: '60px', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
              <div className={styles.mobile3}> Username: </div>
              <input className={styles.input} placeholder={data.name} onChange={() => {
                setUserName(event.target.value);
                console.log(event.target.value)
              }}></input>
            </Box>
            <Box className={styles.mobile2} sx={{ width: '90%', height: '50px', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
              <div className={styles.mobile3}> Password: </div>
              <input className={styles.input} placeholder="********" onChange={() => {
                setPassword(event.target.value);
                console.log(event.target.value)
              }}></input>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', height: '50px', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', borderColor: 'gray', borderWidth: '0px', borderStyle: 'solid', margin: '20px' }}>
            </Box>
          </Box>
        </Box>

        <button className={styles.btn} onClick={ async () => {
          try {
            const res1 = await postInfo({ password: Password.toString(), name: userName.toString() }, localStorage.getItem('token'), localStorage.getItem('user_id'))
            console.log(res1.data)
            window.location.reload()
          } catch (error) {
            setError(true)
            console.log(error)
          }
        }} > Submit</button>
      </Box>
    </Box>
  );
};

export default App;
