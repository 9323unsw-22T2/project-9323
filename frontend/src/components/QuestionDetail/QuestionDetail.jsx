/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import SortIcon from '@mui/icons-material/Sort';
import { MenuItem, Menu } from '@mui/material';
import AnswerCard from './AnswerCard';
import ChargeAnswerCard from './ChargeAnswerCard';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from './List'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import Collapse from '@mui/material/Collapse';
import { newQuestionComment, questionDetail } from '../../service';
import { useParams } from 'react-router-dom';

const Home = () => {
  //  const sample = [{ id: '12', type: 1 }, { id: '23', type: 2 }, { id: '45', type: 2 }]
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [follow, setFollow] = React.useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    setCommentContent(editorState.getCurrentContent().getPlainText('\u0001'))
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { number } = useParams();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [charged, setCharged] = React.useState(false)

  const [content, setCommentContent] = React.useState();
  const handleSubmit = () => {
    newQuestionComment({ content }, localStorage.getItem('token'), localStorage.getItem('user_id'), number)
    window.location.reload(false);
  }
  /* const handleSubmit = () => {
    fetch('/comment/questions/1', { // somone set a proxy ?
      method: 'POST',
      headers: {
        user_id: '1',
        token: '1301ccf6-1891-42ba-8cbb-310e3bdda032',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment_content: editorState.getCurrentContent().getPlainText('\u0001'),
        comment_id: '2',
      })
    })
    setEditorState('')
  }; */
  const [data, setData] = useState([{ }]);
  React.useEffect(async () => {
    const response = await questionDetail(localStorage.getItem('user_id'), localStorage.getItem('token'), number)
    console.log(response)
    setData(Object.fromEntries(Object.entries(response.data.question)))
  }, [])
  return (
    <div className="home" style={{ overflow: 'auto' }}>
      {localStorage.getItem('token') ? (
        <LoggedNarbar></LoggedNarbar>
      ) : (
        <Navbar></Navbar>
      )}
      <Box
        sx={{
          backgroundImage: 'url(https://cdn.dribbble.com/users/782052/screenshots/10927554/media/e961df046013321feb28cf99b7fc7800.jpg)',

          // backgroundColor: 'rgb(118, 118, 118, 0.1)',
          display: 'flex',
          paddingTop: '1.3rem'
        }}
      >
        <Button sx={{ position: 'absolute', zIndex: '8', height: 'max-content', textDecoration: 'underline', fontSize: '1.3rem', color: '#1976d2 !important', ml: 2 }}href="javascript:history.back()">{'<Return'}</Button>

        <Box sx={{
          opacity: '0.95',
          marginLeft: ' auto',
          marginRight: ' auto',
          width: '70%'
        }}>
          <CardContent
          >
            <Box sx={{ backgroundColor: '#FFF' }}>
              <CardHeader
                sx={{
                  width: '90%',
                  margin: 'auto',
                  textAlign: 'center',
                }}
                title={data[1]}
              ></CardHeader>
              <CardContent
                sx={{ borderBottom: '1px solid #e6e5e6', width: '90%', margin: 'auto' }}
                // eslint-disable-next-line react/no-children-prop
                children={data[2]}
              ></CardContent>
        <CardActions sx={{ ml: 3, margin: 'auto', width: '90%' }}>{follow ? <Button onClick={(e) => {
          e.preventDefault()
          setFollow(!follow)
        }}size="small">Follow</Button> : <Button color="error" onClick={(e) => {
          e.preventDefault()
          setFollow(!follow)
        }} size="small">Unfollow</Button>}

          <Box sx={{ margin: 'auto' }}>2022/02/31 19:49:03</Box>
          <Box
            sx={{
              margin: 'auto'
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
  <Button sx={{ mb: 1, mt: 2, float: 'right' }}variant="contained" onClick ={handleSubmit}>Submit</Button>
  </Box>

        </CardContent>
      </Collapse>
          </Box>

        </CardContent>

          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              margin: 'auto',
              color: 'grey !important',
              marginLeft: '1.5rem',
            }}
          >
            <SortIcon></SortIcon>Sort
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Distance</MenuItem>
            <MenuItem onClick={handleClose}>Price(high to low)</MenuItem>
            <MenuItem onClick={handleClose}>Price(low to high)</MenuItem>
          </Menu>
         <ChargeAnswerCard></ChargeAnswerCard>
          <AnswerCard></AnswerCard>)
      </Box>
        <List></List>

      </Box>
    </div>
  );
};
export default Home;
