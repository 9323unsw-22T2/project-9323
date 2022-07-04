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
      <div className="home" style={{ backgroundColor: '#f6f9ff', height: 1035 }}>
        <Navbar/>
        <View style={{ alignItems: 'flex-end', marginRight: 10, marginTop: 0, float: 'right' }}>
                  <img
                    style={{ width: 1100, height: 935, marginTop: 10 }}
                    src='https://cdn.dribbble.com/users/691604/screenshots/10764642/media/b9888421afd46c03efef1ff072eec418.png'
                  />
        </View>
        <Accordians style ={{ position: 'absolute', float: 'left' }}/>
        <h1 style={{ color: '#4673cf', fontWeight: 'normal', marginLeft: 80, fontSize: 60, fontFamily: 'Roboto' }}> Welcome to Your Online </h1>
        <h2 style={{ color: '#4673cf', fontWeight: 'normal', marginLeft: 150, fontSize: 60, fontFamily: 'Roboto' }}>Information Hub</h2>
      </div>
  );
}
export default Home;
