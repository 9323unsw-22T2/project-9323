/* eslint-disable multiline-ternary */
import React from 'react';
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
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import Collapse from '@mui/material/Collapse';
const Home = () => {
  const sample = [{ id: '12', type: 1 }, { id: '23', type: 2 }, { id: '45', type: 2 }]
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [follow, setFollow] = React.useState(true);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    console.log(editorState.toJS())
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="home">
      {localStorage.getItem('token') ? (
        <LoggedNarbar></LoggedNarbar>
      ) : (
        <Navbar></Navbar>
      )}
      <Box
        sx={{
          backgroundColor: 'rgb(118, 118, 118, 0.1)',
          display: 'flex',
          paddingTop: '1.3rem'
        }}
      >
        <Button sx={{ height: 'max-content', textDecoration: 'underline', fontSize: '1.3rem', color: '#1976d2 !important', ml: 2 }}href="javascript:history.back()">{'<Return'}</Button>

        <Box sx={{
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
                title={'Does anyone know how to create a teams account'}
              ></CardHeader>
              <CardContent
                sx={{ borderBottom: '1px solid #e6e5e6', width: '90%', margin: 'auto' }}
                // eslint-disable-next-line react/no-children-prop
                children={
                  'Hi im new to microsoft teams and am struggling to navigate the UI, Does anyone know how to create a new team and add the members i want to add ?'
                }
              ></CardContent>
        <CardActions sx={{ ml: 3, margin: 'auto', width: '90%' }}>{follow ? <Button onClick={(e) => {
          e.preventDefault()
          setFollow(!follow)
        }}size="small">Follow</Button> : <Button color="error" onClick={(e) => {
          e.preventDefault()
          setFollow(!follow)
        }} size="small">Unfollow</Button>}

          <Box sx={{ margin: 'auto' }}>2022/02/31 19:49:03</Box>
          <Box sx={{ margin: 'auto' }}>{"author:'people1'"}</Box>
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
  <Button sx={{ mb: 1, mt: 2, float: 'right' }}variant="contained">Submit</Button>
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

        {sample.map((ele) => {
          return (
            <AnswerCard key={ele.id}></AnswerCard>)
        })}
      </Box>
        <Box
          sx={{
            width: '20%',
            marginLeft: 'auto',
            marginRight: ' auto',
            height: '80vh',
            border: '1px solid red',
            marginTop: ' 2rem',
          }}
        ></Box>

      </Box>
    </div>
  );
};
export default Home;
