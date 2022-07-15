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
import Help from './components/Help/Help'

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

  async function addLink (event) {
    event.preventDefault();
    console.log(event.clientX, event.clientY)
    const pagelink = '\n\n Original author at: ' + document.location.href;
    const copytext = window.getSelection() + pagelink;
    console.log(copytext, window.clipboardData)

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
      console.error('Async: Could not copy text: ', err);
    });
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
          <Route path="/main" element={<MainPage />} />
          <Route path="/question" element={<Question />} />
          <Route path="/newquestion" element={<NewQuestion />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/newguide" element={<NewGuide />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/expert" element={<Expert />} />
          <Route path="/applyexpert" element={<ApplyExpert />} />
          <Route path="/guide/:number" element={<GuideDetail />} />
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
