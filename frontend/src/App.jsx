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

  return (

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
          <Route path="/guide/:number" element={<GuideDetail />} />
          <Route path="/help" element={<Help />} />
        </Route>

      </Routes>

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
