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
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import Collapse from '@mui/material/Collapse';
import { Editor } from '@tinymce/tinymce-react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import CommonMessage from '../CommonMessage/CommonMessage'
import PropTypes from 'prop-types';
import AvatarTrigger from '../MessagerTrigger/Avatar'
import { commentLike, commentDislike, buyComment, deleteQuestionComment } from '../../service'
import SharePopup from '../SharePopup/SharePopup';
import ShareIcon from '@mui/icons-material/Share';

RecipeReviewCard.propTypes = {
  data: PropTypes.object,
}
export default function RecipeReviewCard ({ data }) {
  const [thumbUp, setThumbUp] = React.useState(false);
  const [thumbDown, setThumbDown] = React.useState(false);
  const ThumbUp = () => {
    if (thumbDown) { ThumbDown() }

    setThumbUp(!thumbUp)

    commentLike(data?.id, localStorage.getItem('token'), localStorage.getItem('user_id'))
  }
  const [thumbUpCount, setThumbUpCount] = React.useState(0)
  const [social, setSocial] = React.useState(false);

  const ThumbDown = () => {
    if (thumbUp) { ThumbUp() }
    setThumbDown(!thumbDown)
    commentDislike(data?.id, localStorage.getItem('token'), localStorage.getItem('user_id'))
  }
  const changeThumbCount = (e) => {
    console.log(thumbUp, thumbDown)
    if (e === 1) {
      !thumbUp && !thumbDown && setThumbUpCount(thumbUpCount - 1)
      !thumbUp && thumbDown && setThumbUpCount(thumbUpCount + 1)
      thumbUp && !thumbDown && setThumbUpCount(thumbUpCount - 2)
    } else {
      !thumbUp && !thumbDown && setThumbUpCount(thumbUpCount + 1)
      !thumbUp && thumbDown && setThumbUpCount(thumbUpCount + 2)
      thumbUp && !thumbDown && setThumbUpCount(thumbUpCount - 1)
    }
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  React.useEffect(() => {
    setThumbUp(JSON.parse(data.thumbUpBy).includes(!!parseInt(localStorage.getItem('user_id'))))
    JSON.parse(data.userPaid).includes(!!parseInt(localStorage.getItem('user_id'))) && setLocked(true)
    data.author_name === localStorage.getItem('username') && setLocked(true)
  }, [])
  const handleDelete = async () => {
    try {
      await deleteQuestionComment(data.id, localStorage.getItem('token'), localStorage.getItem('user_id'))
      window.location.reload(false);
    } catch (error) {
      window.alert('cant delete, please check you login status')
    }
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
    <Card sx={{ width: '95%', margin: 'auto', marginBottom: '16px', padding: '1rem', borderRadius: '1rem' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], cursor: 'pointer' }} onClick={handleClick} >
            R
          </Avatar>
        }
        action={
          parseInt(localStorage.getItem('user_id')) === data.user && <IconButton aria-label="settings" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        }
        title={data.author_name}
        subheader={new Date(data.timeCreated * 1000).toLocaleString()}
      />
      <AvatarTrigger user={data.user}username={data.author_name}setAnchorEl={setAnchorEl} anchorEl={anchorEl}></AvatarTrigger>

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
        <Typography> {'99'} </Typography>

        <IconButton aria-label="Thumb up" onClick={(e) => { e.preventDefault(); changeThumbCount(0); ThumbUp() }} sx={{ color: thumbUp ? 'blue' : '' }}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="Thumb down" onClick={(e) => { e.preventDefault(); changeThumbCount(1); ThumbDown() }} sx={{ color: thumbDown ? 'red' : '' }}>
          <ThumbDownIcon />
        </IconButton>
        <IconButton aria-label="comment" onClick={handleExpandClick}>
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={(e) => { e.preventDefault(); setSocial(!social) }}>
          <ShareIcon />
        </IconButton>
      </CardActions>

      </div>
      <div style={{ display: 'flex', zIndex: '9999', animation: 'blink 5s linear infinite' }}>
        <Button onClick={(e) => { e.preventDefault(); handleUnlock() }}sx={{ margin: 'auto' }}variant="contained">{'Unlock expert\'s answer'}</Button>
      </div>
      </>
        : <>

      <CardContent>
      {data.content}
        </CardContent>

        <CardActions disableSpacing sx={{
          width: 'max-content',
          float: 'right'
        }}>
                    <Typography> {thumbUpCount} </Typography>

        <IconButton aria-label="Thumb up" onClick={(e) => { e.preventDefault(); changeThumbCount(0); ThumbUp() }} sx={{ color: thumbUp ? 'blue' : '' }}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="Thumb down" onClick={(e) => { e.preventDefault(); changeThumbCount(1); ThumbDown() }} sx={{ color: thumbDown ? 'red' : '' }}>
          <ThumbDownIcon />
        </IconButton>
        <IconButton aria-label="comment" onClick={handleExpandClick}>
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={(e) => { e.preventDefault(); setSocial(!social) }}>
          <ShareIcon />
        </IconButton>
      </CardActions>
      <SharePopup opened={social} setOpened={setSocial}></SharePopup>

      </>

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

      <div style={{ display: 'flex', width: '20rem' }}>
      <DialogContent>
      <Typography variant="h6" color="text.secondary">
        You need <span style={{ color: 'red' }}>500</span> to unlock this answer. Are you sure you want to continue?
        </Typography>
          <Button
          onClick={async (e) => {
            try {
              const response = await buyComment(data.id, localStorage.getItem('token'), localStorage.getItem('user_id'))
              if (response.data.user_score) {
                handleClose(e)
                setLocked(true);
              } else {
                setErrorMessage(['your score is not enough to see this comment', 'error', true])
              }
            } catch (error) {
              setErrorMessage(['network error', 'error', true])
            }
          }}>
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
