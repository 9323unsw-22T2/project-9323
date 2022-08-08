import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet
} from 'react-router-dom';
import { motion } from 'framer-motion';
import { Widget, deleteMessages, addUserMessage, addResponseMessage, renderCustomComponent } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
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
import Message from './components/Message/MessageManager'
import { getScore, sendMessages, getOneMessages } from './service'
import expert from './expert.png';
import expert1 from './expert1.png';
import expert2 from './expert2.png';
import expert3 from './expert3.png';
import chatImg from './chatbotImg';
import profileHelp from './profileHelp.png';
import profileHelp0 from './profileHelp0.png';
import video from './video.png';
import video0 from './video0.png';
import helppage from './helppage.png';
import helppage1 from './helppage1.png';
import helppage2 from './helppage2.png';
import message from './message.png';
import message1 from './message1.png';
import message2 from './message2.png';
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
  // console.log(location)
  const timerRef = React.useRef();
  const [isexpert, setIsexpert] = React.useState('0');
  React.useEffect(async () => {
    try {
      await getScore(localStorage.getItem('token'), localStorage.getItem('user_id')).then((response) => {
        setIsexpert(response.data.expertOrNot)
        localStorage.setItem('expert', response.data.expertOrNot)
        localStorage.setItem('username', response.data.name)
      }).then(console.log(isexpert))
    } catch (error) {
      console.log(error)
    }
  }, [])
  const [currentChat, setCurrentChat] = React.useState(['HelpBot', 0]);
  const ref = React.useRef();
  const intervalRef = React.useRef();
  const historyRef = React.useRef();

  async function addLink (event) {
    event.preventDefault();
    if (localStorage.getItem('token')) {
      const pagelink = '\n\n Original author at: ' + document.location.href;
      const copytext = window.getSelection() + pagelink;
      // console.log(copytext, navigator.clipboard)
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

  React.useEffect(async () => {
    addResponseMessage('You can input key word expert|score|profile|help|video|message|chat to get guidance')

    document.addEventListener('copy', addLink);
    document.addEventListener('chatchage', async (event) => {
      deleteMessages(999)
      intervalRef.current && clearInterval(intervalRef.current)
      const response = await getOneMessages(event.detail.user, localStorage.getItem('token'), localStorage.getItem('user_id'))
      historyRef.current = response.data.message_list.length
      ref.current = response.data.message_list
      // eslint-disable-next-line array-callback-return
      Array.isArray(response.data.message_list) && response.data.message_list.map((e) => {
        if (localStorage.getItem('username') === e.sender) {
          addUserMessage(e.message)
        } else {
          addResponseMessage(e.message)
        }
      })
      setCurrentChat([event.detail.username, event.detail.user])
    });
  }, [])
  React.useEffect(async () => {
    clearInterval(intervalRef.current)
    if (location.pathname !== '/message' && currentChat[1] !== 0) {
      intervalRef.current = setInterval(async () => {
        try {
          const response = await getOneMessages(currentChat[1], localStorage.getItem('token'), localStorage.getItem('user_id'))
          if (response.data.message_list.length > (ref.current.length)) {
            // eslint-disable-next-line array-callback-return
            response?.data?.message_list?.slice(ref.current.length - response.data.message_list.length).map((e, index) => {
              // eslint-disable-next-line no-empty
              if (localStorage.getItem('username') === e.sender) {} else {
                addResponseMessage(e.message)
              }
            })
            ref.current = response.data.message_list
          }
        } catch (error) {}
      }, 2000);
    }
  }, [currentChat, location])
  const responseTemplate = {
    expert: ['Those with some experience in the industry have the opportunity to become experts'],
    Expert: ['Those with some experience in the industry have the opportunity to become experts'],
    score: ['Being active in the community gets you more points', 'You can use the score to buy other people\'s answers, and you can become an expert when you reach 200 points or more'],
    Score: ['Being active in the community gets you more points', 'You can use the score to buy other people\'s answers, and you can become an expert when you reach 200 points or more'],
    profile: ['Click profile bar to change you information'],
    Profile: ['Click profile bar to change you information'],
    help: ['Please check the Help page.'],
    Help: ['Please check the Help page.'],
    Video: ['You can upload youtube video now, upload local video is undering developing'],
    video: ['You can upload youtube video now, upload local video is undering developing'],
    Thanks: ['You are welcome~'],
    Thank: ['You are welcome~'],
    chat: ['Click someone\'s avatar to start you first conversation'],
    Chat: ['Click someone\'s avatar to start you first conversation'],
    message: ['Click someone\'s avatar to start you first conversation'],
    Message: ['Click someone\'s avatar to start you first conversation'],

  }
  const responseImgTemplate = {
    expert: [expert, expert1, expert2, expert3],
    Expert: [expert, expert1, expert2, expert3],
    profile: [profileHelp0, profileHelp],
    Profile: [profileHelp0, profileHelp],
    help: [helppage, helppage1, helppage2],
    Help: [helppage, helppage1, helppage2],
    Video: [video0, video],
    video: [video0, video],
    chat: [message, message1, message2],
    Chat: [message, message1, message2],
    message: [message, message1, message2],
    Message: [message, message1, message2]
  }
  const handleNewUserMessage = (newMessage) => {
    if (currentChat[1] === 0) {
      const match = Object.keys(responseTemplate).every((post) => {
        if (newMessage.includes(post)) {
          responseTemplate[post].map((ele) => {
            addResponseMessage(ele)
            return (<></>)
          })
          responseImgTemplate[post]?.map((ele) => {
            renderCustomComponent(chatImg, { data: ele })

            return (<></>)
          })
          addResponseMessage('Please contact z5333605@ad.unsw.edu.com if it doesn\'t solve you problem')

          return false
        } else return true
      })
      if (match) {
        addResponseMessage('Sorry can found match question. Please contact z5333605@ad.unsw.edu.com')
      }
    } else {
      try {
        sendMessages({ message: newMessage, target_user: currentChat[1], reciver_name: currentChat[0], time: Date.now() }, localStorage.getItem('token'), localStorage.getItem('user_id'))
      } catch (error) {

      }
    }
  }

  // Now send the message throught the backend AP
  return (
    <>
      <div id='copynotify' style={{ opacity: 0, transition: 'all 0.5s', color: 'white', textShadow: '3px 0px 3px red,-3px 0px 3px red,6px 0px 6px red,-6px 0px 6px red', marginLeft: '40%', marginTop: '10%', position: 'absolute', fontSize: '1rem', zIndex: 10000 }}>Copying to clipboard was successful!</div>
      {location.pathname !== '/message' && <Widget showBadge={false}chatId={currentChat[1]}showTimeStamp={false} subtitle={'Welcome'}emojis= {true} resizable={true} title={currentChat[0]} handleNewUserMessage={handleNewUserMessage} />}

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
          <Route path="/message" element={<Message />} />

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
