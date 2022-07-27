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
function Help () {
  const matchesPad = useMediaQuery(
    '(max-width: 950px)'
  )
  const [cursor, setCursor] = React.useState('HelpBot')
  const sampleData = {
    amy: [{ message: 'hello', sender: 'amy', time: '1998' }, { message: 'hi', sender: 'me', time: '2002' }],
    lion: [{ message: 'hello', sender: 'lion', time: '1998' }, { message: 'hi', sender: 'me', time: '2002' }],
    peter: [{ message: 'hello', sender: 'peter', time: '1998' }, { message: 'hi', sender: 'peter', time: '2002' }]

  }
  return (
    <>
            {localStorage.getItem('token')
              ? <LoggedNarbar></LoggedNarbar>
              : <Navbar ></Navbar>}
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
                        key={e} name={e} lastSenderName={sampleData[e][sampleData[e].length - 1]?.sender} info={sampleData[e][sampleData[e].length - 1]?.message}>
                        <Avatar src={'https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg'}/>
                        <Conversation.Operations visible>
                          <DeleteIcon onClick={() => alert('Information!')} />
                        </Conversation.Operations>
                      </Conversation>
                    )
                  })
                }
                <Conversation onClick={(e) => {
                  e.preventDefault()
                  setCursor('HelpBot')
                }}active={cursor === 'HelpBot'} name="HelpBot" lastSenderName="HelpBot" info={'Start you first conversation!'}>
                  <Avatar src={'https://demo.chatscope.io/static/media/help.3118e5db.svg'}/>
                </Conversation>
              </ConversationList>
              <div style={{ width: matchesPad ? '95vw' : '70vw', height: matchesPad ? '80vh' : '90vh' }}>
                {cursor === 'HelpBot'
                  ? <></>
                  : <MainContainer>
                  <ChatContainer>
                    <MessageList>
                      {sampleData &&
                        sampleData[cursor]?.map((e) => {
                          console.log(e)
                          return (
                            <Message
                            key={e.time}
                            style={{ marginTop: '2rem' }}
                            model={{
                              message: e.message,
                              sentTime: e.time,
                              sender: e.sender,
                              direction: e?.sender === 'me' ? 'incoming' : 'outgoing',
                            }}
                          >
                            <Avatar src={'https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg'} name="Joe" />
                          </Message>
                          )
                        })
                      }
                    </MessageList>
                    <MessageInput placeholder="Type message here" />
                  </ChatContainer>
                </MainContainer>
                  }
                </div>
                </div>
    </>
  )
}

export default Help
