/* eslint-disable multiline-ternary */
import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/TextField';

/* import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import SearchDetail from './SearchDetail/SearchDetail'; */
ActionAreaCard.propTypes = {
  data: PropTypes.object,
};

// eslint-disable-next-line space-before-function-paren
export default function ActionAreaCard({ data }) {
  if (localStorage.getItem('commentUid') === null) {
    localStorage.setItem('commentUid', 0)
  }
  const { number } = useParams();

  const navigate = useNavigate();
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const onEditorStateChange = (editorState) => { setEditorState(editorState) }
  const [isShowMore, setIsShowMore] = React.useState(true);
  const toggleReadMore = () => {
    setIsShowMore(!isShowMore);
  };
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [charged, setCharged] = React.useState(false)
  const text =
    'Hi im new to microsoft teams and am struggling to navigate the UI, Does anyone know how to create a new team and add the members i want to add ?';

  /*   const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    console.log(event, open);
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };
  const list = () => {
    return (
      <Box
        sx={{ width: '100vw' }}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
      >
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            console.log('wwwwww');
            setState(false);
          }}
        >
          {'<Back to result'}
        </Link>
        <SearchDetail></SearchDetail>
      </Box>
    );
  }; */
  const commentUid = parseFloat(localStorage.getItem('commentUid')) + 1;
  const handleSubmit = () => {
    fetch('comment/questions/' + number, {
      method: 'POST',
      headers: {
        user_id: localStorage.getItem('user_id'),
        token: localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment_content: editorState.getCurrentContent().getPlainText('\u0001'),
        comment_id: commentUid,
      })
    })
    setEditorState('')
  }
  return (
    <Card
      sx={{
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
            onClick={(e) => {
              e.preventDefault();
              navigate('/question/1');
            }}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            title={'How do i create a new team on microsoft teams'}
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
        </Box>
      </CardContent>
      <CardActions sx={{ ml: 3, display: 'auto', overflow: 'auto' }}>
        <Button size="small">Follow</Button>
        <Box sx={{ margin: 'auto' }}>2022/02/31 19:49:03</Box>
        <Box
          onClick={(e) => {
            e.preventDefault(
            )
            navigate('/question/1');
          }}
          sx={{
            margin: 'auto',
            color: '#1976d2',
            '&:hover': {
              textDecoration: 'underline',
            },
            cursor: 'pointer',
          }}
        >
          <span>3 answers</span>
        </Box>
        <Box sx={{ margin: 'auto' }}>

          <Button size="small" onClick={handleExpandClick}>Answer</Button>
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
/>
<Box sx={{}}>
<FormControlLabel
          value="start"
          control={<Checkbox checked={charged} onClick={(e) => { e.preventDefault(); setCharged(!charged) }}/>}
          label="charge score"
          labelPlacement="charge score"
  />
  <Box sx={{ transition: '1s all', opacity: charged ? 1 : 0, height: '2rem', pointerEvents: charged ? 'all' : 'none' }}>
  <Input type="number"placeholder="Score you want" />
  </Box>
  <Button sx={{ mb: 1, mt: 2, float: 'right' }} variant="contained" onClick={handleSubmit}>Submit</Button>
</Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
