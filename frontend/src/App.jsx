import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import MainPage from './components/MainPage/MainPage';
import Question from './components/QuestionDetail/QuestionDetail';
import NewQuestion from './components/AskQuestion/AskQuestion';
import Profile from './components/Profile/Profile'
import NewGuide from './components/CreateGuide/CreateGuide'
import GuideDetail from './components/GuideDetail/GuidePage'
import Help from './components/Help/Help'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/question" element={<Question />} />
        <Route path="/newquestion" element={<NewQuestion />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newguide" element={<NewGuide />} />
        <Route path="/guide/:number" element={<GuideDetail />} />
        <Route path="/help" element={<Help />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
