import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import Collapse from '@mui/material/Collapse';
import { Editor } from '@tinymce/tinymce-react';
import Button from '@mui/material/Button';
import { getQuestionComments } from '../../service';
import { useState } from 'react'

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
  const [data, setData] = useState([]);
  const number = 0;
  React.useEffect(() => {
    const response = getQuestionComments(localStorage.getItem('user_id'), localStorage.getItem('token'), number)
    console.log(response.data)
    setData(response.data);
  }, [])

  return (
    <Card sx={{ width: '95%', margin: 'auto', marginBottom: '16px', padding: '1rem', borderRadius: '1rem' }} key={data?.hello}>
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
        title="Remoteworker23"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://cdn.windowsreport.com/wp-content/uploads/2019/12/Team-in-Microsoft-Teams-1.png"
        alt="Paella dish"
        sx={{ width: 'auto' }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {data?.map((user) => {
          return (
            <h1 key={user?.hello}>{user?.content}</h1>
          )
        })}
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
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
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
  )
}
