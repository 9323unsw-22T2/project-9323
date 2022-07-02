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
      <View style={{ alignItems: 'flex-end', marginRight: 10, marginTop: 0, float: 'right' }}>
                <img
                  style={{ width: 1100, height: 935, marginTop: 0 }}
                  src='https://cdn.dribbble.com/users/2217210/screenshots/12205457/media/c2a7d0d3b8d33c298b1e17de263eb7a5.jpg?compress=1&resize=1000x750&vertical=top'
                />
      </View>
      <Accordians style ={{ position: 'absolute', float: 'left' }}/>
      <h1 style={{ color: 'darkblue', fontWeight: 'normal', marginLeft: 80, fontSize: 60, fontFamily: 'Roboto' }}> Welcome to Your Online </h1>
      <h2 style={{ color: 'darkblue', fontWeight: 'normal', marginLeft: 150, fontSize: 60, fontFamily: 'Roboto' }}>Information Hub</h2>
    </div>

  );
}
export default Home;
