import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import DialogContent from '@mui/material/DialogContent';

import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import Collapse from '@mui/material/Collapse';
import { Editor } from '@tinymce/tinymce-react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import CommonMessage from '../CommonMessage/CommonMessage'

export default function RecipeReviewCard () {
  const [thumbUp, setThumbUp] = React.useState(false);
  const [thumbDown, setThumbDown] = React.useState(false);

  const ThumbUp = (e) => {
    if (thumbDown) { ThumbDown() }
    setThumbUp(!thumbUp)
  }
  const ThumbDown = (e) => {
    if (thumbUp) { ThumbUp() }
    setThumbDown(!thumbDown)
  }
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [content, setContent] = React.useState('')
  function handleChange (content, editor) {
    setContent({ content });
  }
  const [locked, setLocked] = React.useState(false)
  function handleUnlock () {
    handleClickOpen()
  }
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const [errorMessage, setErrorMessage] = React.useState(['', 'error', false]);
  function setMessageStatus () {
    setErrorMessage(['', 'error', false])
  }
  return (
    <>
    <Card sx={{ width: '95%', margin: 'auto', marginBottom: '16px', padding: '1rem', borderRadius: '1rem' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Bill Gates"
        subheader="September 14, 2016"
      />
      {!locked
        ? <>
      <div style={{ filter: 'blur(8px)', pointerEvents: 'none', userSelect: 'none' }}>
      <CardMedia
        component="img"
        height="194"
        image="https://cdn.windowsreport.com/wp-content/uploads/2019/12/Team-in-Microsoft-Teams-1.png"
        alt="Paella dish"
        sx={{ width: 'auto' }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        dewdewdewdwedwedwedwedwedwedwedwd
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Once youve created the team, invite people to join it. You can add individual users, groups, and even entire contact groups (formerly known as distribution lists).
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Find the team that you created, click More options ...  Manage team. Then go to the Members tab. Find the people you want to designate as team owners. Under Role, click Owner.
        </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{
          width: 'max-content',
          float: 'right'
        }}>
        <IconButton aria-label="Thumb up" onClick={ThumbUp} sx={{ color: thumbUp ? 'blue' : '' }}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="Thumb down" onClick={ThumbDown} sx={{ color: thumbDown ? 'red' : '' }}>
          <ThumbDownIcon />
        </IconButton>
        <IconButton aria-label="comment" onClick={handleExpandClick}>
          <CommentIcon />
        </IconButton>
      </CardActions>
      </div>
      <div style={{ display: 'flex', zIndex: '9999', animation: 'blink 5s linear infinite' }}>
        <Button onClick={(e) => { e.preventDefault(); handleUnlock() }}sx={{ margin: 'auto' }}variant="contained">{'Unlock expert\'s answer'}</Button>
      </div>
      </>
        : <>      <CardMedia
        component="img"
        height="194"
        image="https://cdn.windowsreport.com/wp-content/uploads/2019/12/Team-in-Microsoft-Teams-1.png"
        alt="Paella dish"
        sx={{ width: 'auto' }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        dewdewdewdwedwedwedwedwedwedwedwd
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Once youve created the team, invite people to join it. You can add individual users, groups, and even entire contact groups (formerly known as distribution lists).
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Find the team that you created, click More options ...  Manage team. Then go to the Members tab. Find the people you want to designate as team owners. Under Role, click Owner.
        </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{
          width: 'max-content',
          float: 'right'
        }}>
        <IconButton aria-label="Thumb up" onClick={ThumbUp} sx={{ color: thumbUp ? 'blue' : '' }}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="Thumb down" onClick={ThumbDown} sx={{ color: thumbDown ? 'red' : '' }}>
          <ThumbDownIcon />
        </IconButton>
        <IconButton aria-label="comment" onClick={handleExpandClick}>
          <CommentIcon />
        </IconButton>
      </CardActions></>
}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Editor
                  toolbar='redo aligncenter alignjustify alignleft alignright blockquote undo bold italic underline code'

    apiKey="yhf0swre6kb5yv1owq7bcxmfxaxwundoc1htcq2tpvhkyz8t"
    value={content.innerText}
    init={{
      height: 300,
      menubar: false
    }}
    onEditorChange={handleChange}
  />
  <br />
  <Button sx={{ mb: 1, float: 'right' }} variant="contained">Submit</Button>
        </CardContent>
      </Collapse>
    </Card>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Confirmation</DialogTitle>

      <div style={{ display: 'flex', width: '20rem', height: '12rem' }}>
      <DialogContent>
      <Typography variant="h6" color="text.secondary">
        You need <span style={{ color: 'red' }}>500</span> to unlock this answer. Are you sure you want to continue?
        </Typography>
          <Button
          onClick={(e) => { setLocked(true); handleClose(e) }}>
            Yes
          </Button>
          <Button
          color="error"
          onClick={handleClose}
          >
            Not now
          </Button>
          {<CommonMessage
          setVisible={setMessageStatus}
          message={errorMessage[0]}
          severity={errorMessage[1]}
          visible={errorMessage[2]}
        ></CommonMessage>}
         </DialogContent>
      </div>

    </Dialog>
    </>
  );
}
