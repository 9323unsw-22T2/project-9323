
import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import styles from './Expert.module.css';
// eslint-disable-next-line no-unused-vars
import { expertChangeAns, deleteQuestionComment, newQuestionComment } from '../../service'

/* import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import SearchDetail from './SearchDetail/SearchDetail'; */
ActionAreaCard.propTypes = {
  data: PropTypes.object,
  mykey: PropTypes.number
};

// eslint-disable-next-line space-before-function-paren
export default function ActionAreaCard({ mykey, data }) {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const onEditorStateChange = (editorState) => { setEditorState(editorState) }
  const [isShowMore, setIsShowMore] = React.useState(true);
  const toggleReadMore = () => {
    setIsShowMore(!isShowMore);
  };

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(Ans)
        )
      ));
  };
  const text = data.qes.split('\n')[0];
  let Ans = ''
  if (data.ans !== null) {
    Ans = data.ans;
  } else {
    Ans = ''
  }
  // eslint-disable-next-line no-unused-vars
  const [scoreIn, setScoreIn] = React.useState(0);
  const title = data.title;
  // const ansId = data.ans_id;
  // eslint-disable-next-line no-unused-vars
  function randomNumberInRange (min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  if (Ans !== null && Ans !== '') {
    return (
      <Card
        sx={{
          boxShadow: 12,
          borderRadius: '1rem',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: '#fff',
          borderTopColor: '#e6e5e6',
          mb: 1,
          overflow: 'unset'

        }}
      >
        <CardContent>
          <Box>
            <CardHeader
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                m: 1,
              }}
              title={'Q' + mykey + ' .' + title}
            ></CardHeader>
            <CardContent
              sx={{ borderBottom: '1px solid #e6e5e6' }}
              // eslint-disable-next-line react/no-children-prop
              children={
                <Box>
                  {isShowMore ? text.slice(0, 300) : text}
                  {text && text.length > 300 && (
                    <Box
                      onClick={toggleReadMore}
                      sx={{
                        cursor: 'pointer',
                        fontSize: '14px',
                        marginTop: '20px',
                        marginBottom: '30px',
                        textDecoration: 'underline',
                      }}
                    >
                      {isShowMore ? 'Show more...' : 'Show less'}
                    </Box>
                  )}
                </Box>
              }
            ></CardContent>
            {(data.photoURL !== null && data.photoURL !== '')
              ? <CardContent
                sx={{ borderBottom: '1px solid #e6e5e6' }}
                // eslint-disable-next-line react/no-children-prop
                children={
                  <img src={data.photoURL} className={styles.cardImg} />
                }
              ></CardContent>
              : <CardContent
                sx={{ borderBottom: '1px solid #e6e5e6' }}
                // eslint-disable-next-line react/no-children-prop
                children={
                  // <img src={localStorage.getItem((mykey % 2 === 1) ? '1' : '3')} className={styles.cardImg} />
                  <img src={localStorage.getItem((mykey % 4).toString())} className={styles.cardImg} />
                }
              ></CardContent>
            }
            <Box className={styles.text1}>Your Answer:</Box>
            {(Ans !== null && Ans !== '')
              ? <CardContent
                  sx={{ borderBottom: '1px solid #e6e5e6' }}
                  // eslint-disable-next-line react/no-children-prop
                  children={
                    <Box className={styles.ans}>
                      {isShowMore ? Ans.slice(0, 300) : Ans}
                      {Ans && Ans.length > 300 && (
                        <Box
                          onClick={toggleReadMore}
                          sx={{
                            cursor: 'pointer',
                            fontSize: '14px',
                            marginTop: '20px',
                            marginBottom: '30px',
                            textDecoration: 'underline',
                          }}
                        >
                          {isShowMore ? 'Show more...' : 'Show less'}
                        </Box>
                      )}
                      <button onClick={handleExpandClick} className={styles.btn1}> Edit</button>
                    </Box>
                  }
              ></CardContent>
              : <CardContent
                sx={{ borderBottom: '1px solid #e6e5e6' }}
                // eslint-disable-next-line react/no-children-prop
                children={
                  <Box className={styles.ansN}>
                    You have not yet answer this question
                    <button onClick={handleExpandClick} className={styles.btn1}> Answer </button>
                  </Box>
                }
              ></CardContent>
              }
            </Box>
        </CardContent>
        <CardActions sx={{ display: 'auto', overflow: 'auto' }}>

          {/* <Box sx={{ margin: 'auto' }}>{new Date(data.time).toUTCString()}</Box> */}
          {/* <Box sx={{ margin: 'auto' }}>{'2022/07/23 14:43:39'}</Box> */}
          <Box sx={{ margin: 'auto' }}>{new Date().toLocaleString()}</Box>
          <Box
            sx={{
              margin: 'auto',
              color: '#1976d2',
              cursor: 'pointer',
            }}
          >
            Answer worth:{(data.score !== null) ? <span> {data.score} Points</span> : <span> 10 Points</span>}
          </Box>
          <Box sx={{ margin: 'auto' }}>
            <Button size="small" sx={{ color: 'red' }} onClick={async () => {
              editorState.getCurrentContent().getPlainText()
              // console.log(ansTmp)
              // console.log(data.qes_id)
              // console.log(ansId)
              try {
                // console.log(data)
                await deleteQuestionComment(data.ans_id, localStorage.getItem('token'), localStorage.getItem('user_id'))
                // console.log(await (response.data))
                window.location.reload()
              } catch (error) {
                // console.log(error)
              }
            }}>Delete Answer</Button>
          </Box>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperStyle={{ }}
              editorStyle={{ border: '1px solid grey', resize: 'vertical', overflow: 'auto' }}
              onEditorStateChange={onEditorStateChange}
              editorContent='Gi'
            />
            {/* <Button sx={{ mb: 1, mt: 2, float: 'right' }} variant="contained" onClick={() => {
              const jsonStr = JSON.parse(localStorage.getItem('data'))

              for (let i = 0; i < jsonStr.length; i++) {
                if (jsonStr[i].id === id) {
                  jsonStr[i].ans = editorState.getCurrentContent().getPlainText()
                }
              }
              localStorage.setItem('data', JSON.stringify(jsonStr))
            }} >Submit</Button> */}
            <Button sx={{ mb: 1, mt: 2, float: 'right' }} variant="contained" onClick={async () => {
              const ansTmp = editorState.getCurrentContent().getPlainText()
              // console.log(ansTmp)
              // console.log(data.qes_id)
              // console.log(ansId)
              try {
                console.log(data.qes_id)
                const response = await expertChangeAns(data.ans_id, { content: ansTmp, score: scoreIn }, localStorage.getItem('token'), localStorage.getItem('user_id'))
                console.log(await (response.data))
                window.location.reload()
              } catch (error) {
                console.log(error)
              }
              // try {
              //   const response = await newQuestionComment({ content: ansTmp, score: scoreIn }, localStorage.getItem('token'), localStorage.getItem('user_id'), data.qes_id)
              //   console.log(await (response.data))
              // } catch (error) {
              //   console.log(error)
              // }
              // window.location.reload()
            }} >Submit</Button>
            <input className={styles.scoreIn} placeholder='Enter charge score' onChange={() => {
              setScoreIn(event.target.value)
            }}></input> points
          </CardContent>
        </Collapse>
      </Card>
    );
  } else {
    return (<></>);
  }
}
