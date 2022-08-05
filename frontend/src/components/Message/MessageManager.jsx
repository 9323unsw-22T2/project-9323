import React from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationList,
  Conversation,
  Avatar
} from '@chatscope/chat-ui-kit-react';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from './Profile.module.css'
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllMessages, sendMessages, deleteMessages } from '../../service'
import Photo from './help.png';

function Help () {
  const matchesPad = useMediaQuery(
    '(max-width: 950px)'
  )
  const [cursor, setCursor] = React.useState('HelpBot')
  const [sampleData, setSampleData] = React.useState({
    amy: [{ message: 'hello', sender: 'amy', time: '1998' }, { message: 'hi', sender: 'me', time: '2002' }],
    lion: [{ message: 'hello', sender: 'lion', time: '1998' }, { message: 'hi', sender: 'me', time: '2002' }],
    peter: [{ message: 'hello', sender: 'peter', time: '1998' }, { message: 'hi', sender: 'peter', time: '2002' }]

  })
  const intervalRef = React.useRef();

  React.useEffect(async () => {
    const response = await getAllMessages(localStorage.getItem('token'), localStorage.getItem('user_id'))
    setSampleData(response.data.message_list)
  }, [])
  React.useEffect(async () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(async () => {
      try {
        const response = await getAllMessages(localStorage.getItem('token'), localStorage.getItem('user_id'))
        setSampleData(response.data.message_list)
      } catch (error) {}
    }, 2000);
  }, [])
  return (
    <>
            {localStorage.getItem('token')
              ? <LoggedNarbar></LoggedNarbar>
              : <Navbar ></Navbar>}{
                localStorage.getItem('token') &&
              <div style={{ display: matchesPad ? 'block' : 'flex' }} >
              <ConversationList className={matchesPad ? styles.conversationlist : ''}style={{ width: matchesPad ? '95vw' : '30vw' }}>
                {
                  Object.keys(sampleData)?.map((e) => {
                    return (
                      <Conversation
                      onClick={(event) => {
                        event.preventDefault()
                        setCursor(e)
                      }}
                      active={cursor === e}
                        key={e} name={sampleData[e][0].reciver_name === localStorage.getItem('username') ? sampleData[e][0].sender : sampleData[e][0].reciver_name} lastSenderName={sampleData[e][sampleData[e].length - 1]?.sender} info={sampleData[e][sampleData[e].length - 1]?.message}>
                        <Avatar src={'https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg'}/>
                        <Conversation.Operations visible>
                          <DeleteIcon onClick={(event) => {
                            event.preventDefault()
                            deleteMessages({ target_user: parseInt(e) }, localStorage.getItem('token'), localStorage.getItem('user_id'))
                          } } />
                        </Conversation.Operations>
                      </Conversation>
                    )
                  })
                }
                <Conversation onClick={(e) => {
                  e.preventDefault()
                  setCursor('HelpBot')
                }}active={cursor === 'HelpBot'} name="HelpBot" lastSenderName="HelpBot" info={'Click someone\'s avatar to start you first conversation!'}>
                  <Avatar src={'https://demo.chatscope.io/static/media/help.3118e5db.svg'}/>
                </Conversation>
              </ConversationList>
              <div style={{ width: matchesPad ? '95vw' : '70vw', height: matchesPad ? '80vh' : '90vh' }}>
                {cursor === 'HelpBot'
                  ? <MainContainer>
                  <ChatContainer>
                    <MessageList>
                    <Message
                            style={{ marginTop: '2rem' }}
                            model={{
                              message: 'Click someone\'s avatar to start you first conversation!',
                              sentTime: '',
                              sender: 'helpBot',
                              direction: 'incoming',
                            }}
                          >
                            <Avatar src={'https://demo.chatscope.io/static/media/help.3118e5db.svg'} name="Joe" />
                          </Message>
                          <Message type="image" model={{
                            direction: 'incoming',
                            payload: {
                              src: Photo,
                              width: '40rem'
                            }
                          }}>
                            <Avatar src={'https://demo.chatscope.io/static/media/help.3118e5db.svg'} name="Joe" />
        </Message>
                    </MessageList>
                  </ChatContainer>
                </MainContainer>
                  : <MainContainer>
                  <ChatContainer>
                    <MessageList>
                      {sampleData &&
                        sampleData[cursor]?.map((e) => {
                          // console.log(e)
                          return (
                            <Message
                            key={e.time}
                            style={{ marginTop: '2rem' }}
                            model={{
                              message: e.message,
                              sentTime: e.time,
                              sender: e.sender,
                              direction: e?.sender !== localStorage.getItem('username') ? 'incoming' : 'outgoing',
                            }}
                          >
                            <Avatar src={'https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg'} name="Joe" />
                          </Message>
                          )
                        })
                      }
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={
                      (textContent) => {
                        sendMessages({ message: textContent, target_user: cursor, time: Date.now(), reciver_name: 'ttt' }, localStorage.getItem('token'), localStorage.getItem('user_id'))
                      }
                     // sendMessages({ message: newMessage, target_user: currentChat[1], time: Date.now() }, localStorage.getItem('token'), localStorage.getItem('user_id'))
                    }

                      />
                  </ChatContainer>
                </MainContainer>
                  }
                </div>
                </div>}
    </>
  )
}

export default Help
