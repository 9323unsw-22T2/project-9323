import React from 'react';
import Navbar from '../NavBar/Navbar';
import Accordians from './Accordians'
import {
  View,
} from 'react-native';
// import LoggedNarbar from '../LoggedNavBar/Navbar';
const Home = () => {
  console.log(localStorage.getItem('token'));
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
    <div className="home">
      <Navbar/>
      <Accordians style ={{ position: 'absolute' }}/>
      <View style={{ alignItems: 'flex-end', marginRight: 10, bottom: 0 }}>
                <img
                  style={{ width: 1200, height: 900, bottom: 0 }}
                  src='https://cdn.dribbble.com/users/190848/screenshots/10888028/media/80d8ff1065b2f2b11aa86462b90606e1.png'
                />
              </View>
    </div>
  );
}
export default Home;
