import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet
} from 'react-router-dom';
import { motion } from 'framer-motion';

import Home from './components/Home/Home';
import MainPage from './components/MainPage/MainPage';
import Question from './components/QuestionDetail/QuestionDetail';
import NewQuestion from './components/AskQuestion/AskQuestion';
import Profile from './components/Profile/Profile'
import NewGuide from './components/CreateGuide/CreateGuide'
import Activity from './components/Activity/Activity'
import GuideDetail from './components/GuideDetail/GuidePage'
import ApplyExpert from './components/Expert/ApplyExpert'
import Expert from './components/Expert/Expert'
import ExpertActivity from './components/Expert/ExpertActivity'
import Help from './components/Help/Help'
import { getScore } from './service'
const PageLayout = ({ children }) => children;

const pageVariants = {
  initial: {
    opacity: 0,
    height: '100%'
  },
  in: {

    opacity: 1,
    height: '100%'
  },
  out: {

    opacity: 0,
    height: '100%'
  }
};

const pageTransition = {
  type: 'Inertia',
  ease: 'linear',
  duration: 1
};

const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <motion.div
        key={pathname}
        initial="initial"
        animate='in'
        variants={pageVariants}
        transition={pageTransition}

      >
        <Outlet />
      </motion.div>
    </PageLayout>
  );
};
const App = () => {
  const location = useLocation();
  const timerRef = React.useRef();
  const [isexpert, setIsexpert] = React.useState('0');

  try {
    getScore(localStorage.getItem('token'), localStorage.getItem('user_id')).then((response) => {
      setIsexpert(response.data.expertOrNot)
    }).then(console.log(isexpert))
  } catch (error) {
    console.log(error)
  }
  async function addLink (event) {
    event.preventDefault();
    if (localStorage.getItem('token')) {
      const pagelink = '\n\n Original author at: ' + document.location.href;
      const copytext = window.getSelection() + pagelink;
      console.log(copytext, navigator.clipboard)
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(copytext).then(function () {
          document.getElementById('copynotify').style.opacity = 1;

          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            document.getElementById('copynotify').style.opacity = 0;
          }, 500);
          console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
          window.alert('Async: Could not copy text: ', err);
        });
      } else {
        window.alert('This website isn\'t https or localhost');
      }
    } else {
      window.alert('Only login user can copy text');
    }
  }
  React.useEffect(() => {
    document.addEventListener('copy', addLink);
  }, [])
  return (
    <>
      <div id='copynotify' style={{ opacity: 0, transition: 'all 0.5s', color: 'white', textShadow: '3px 0px 3px red,-3px 0px 3px red,6px 0px 6px red,-6px 0px 6px red', marginLeft: '40%', marginTop: '10%', position: 'absolute', fontSize: '1rem', zIndex: 10000 }}>Copying to clipboard was successful!</div>
      <Routes location={location} key={location.pathname}>
        <Route element={<AnimationLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={localStorage.getItem('token') ? <MainPage /> : <Home />} />
          <Route path="/question/:number" element={ <Question /> } />
          <Route path="/newquestion" element={localStorage.getItem('token') ? <NewQuestion /> : <Home />} />
          <Route path="/profile" element={localStorage.getItem('token') ? <Profile /> : <Home />} />
          <Route path="/newguide" element={localStorage.getItem('token') ? <NewGuide /> : <Home />} />
          <Route path="/activity" element={localStorage.getItem('token') ? <Activity /> : <Home />} />
          <Route path="/expert" element={localStorage.getItem('token') ? (isexpert === '0') ? <Expert /> : <ExpertActivity /> : <Home />} />
          <Route path="/expertActivity" element={localStorage.getItem('token') ? (isexpert === '0') ? <Expert /> : <ExpertActivity /> : <Home />} />
          {/* <Route path="/expertActivity" element={localStorage.getItem('token') ? <ExpertActivity /> : <Home />} /> */}
          <Route path="/applyexpert" element={localStorage.getItem('token') ? (isexpert === '0') ? <ApplyExpert /> : <ExpertActivity /> : <Home />} />
          <Route path="/guide/:number" element={localStorage.getItem('token') ? <GuideDetail /> : <Home />} />
          <Route path="/help" element={<Help />} />
        </Route>

      </Routes>
      </>
  );
};
function root () {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
export default root;
