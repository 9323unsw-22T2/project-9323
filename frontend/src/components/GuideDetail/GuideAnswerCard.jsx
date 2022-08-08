import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import Collapse from '@mui/material/Collapse';
import { Editor } from '@tinymce/tinymce-react';
import Button from '@mui/material/Button';
import { commentLike, commentDislike, commentThumbdown, commentUnThumbdown } from '../../service'
// import { getArticleComments } from '../../service';
// import { useParams } from 'react-router-dom';
import SharePopup from '../SharePopup/SharePopup'
import AvatarTrigger from '../MessagerTrigger/Avatar'
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';

/* {data.map((users) => {
   return <Typography variant="body2" color="text.secondary" key={users.id}>{users.name}</Typography>;
 })} */
RecipeReviewCard.propTypes = {
  data: PropTypes.object,
}
export default function RecipeReviewCard ({ data }) {
// const [data, setData] = useState([]);
  /*  useEffect(() => {
    fetch('/comment/articles/1') // SAMPLE API
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
  }, []);
*/
  const [thumbUp, setThumbUp] = React.useState(false);
  const [thumbDown, setThumbDown] = React.useState(false);
  // const { number } = useParams();

  const ThumbUp = () => {
    if (thumbDown) {
      setThumbDown(!thumbDown)

      commentUnThumbdown(data?.id, localStorage.getItem('token'), localStorage.getItem('user_id'))
    }

    thumbUp && commentDislike(data?.id, localStorage.getItem('token'), localStorage.getItem('user_id'))
    !thumbUp && commentLike(data?.id, localStorage.getItem('token'), localStorage.getItem('user_id'))

    setThumbUp(!thumbUp)
  }
  const [social, setSocial] = React.useState(false);

  const ThumbDown = () => {
    if (thumbUp) {
      setThumbUp(!thumbUp)

      commentDislike(data?.id, localStorage.getItem('token'), localStorage.getItem('user_id'))
    }
    thumbDown && commentUnThumbdown(data?.id, localStorage.getItem('token'), localStorage.getItem('user_id'))

    !thumbDown && commentThumbdown(data?.id, localStorage.getItem('token'), localStorage.getItem('user_id'))
    setThumbDown(!thumbDown)
  }
  const [thumbUpCount, setThumbUpCount] = React.useState(0)

  const changeThumbCount = (e) => {
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  React.useEffect(() => {
    data.thumbUpBy && setThumbDown(JSON.parse(data.thumbUpBy).includes(parseInt('-' + localStorage.getItem('user_id'))))
    data.thumbUpBy && setThumbUp(JSON.parse(data.thumbUpBy).includes(parseInt(localStorage.getItem('user_id'))))
    let count = 0;
    data.thumbUpBy && JSON.parse(data.thumbUpBy).forEach((e) => {
      e > 0 ? count++ : count--
    })
    // console.log('result', count)
    data.thumbUpBy && setThumbUpCount(count)
  }, [data])
  return (
          <Card sx={{ width: '69%', margin: 'auto', marginBottom: '16px', padding: '1rem', borderRadius: '1rem' }} key={Comment.id}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], cursor: 'pointer' }} onClick={handleClickProfile}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <DeleteIcon />
          </IconButton>
        }
        title={data?.author_name}
        subheader="September 14, 2016"
      />
      <AvatarTrigger setAnchorEl={setAnchorEl} anchorEl={anchorEl} username={data?.author_name}user={data?.author}></AvatarTrigger>

      <CardContent>
        <Typography variant="body2" color="text.secondary" key={data?.commentid}>{data?.content}</Typography>
        </CardContent>
        <CardActions disableSpacing sx={{
          width: 'max-content',
          float: 'right'
        }}>
          <Typography> {thumbUpCount} </Typography>
        <IconButton aria-label="Thumb up" onClick={(e) => { e.preventDefault(); changeThumbCount(0); ThumbUp() }} sx={{ color: thumbUp ? 'red' : '' }}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="Thumb down"onClick={(e) => { e.preventDefault(); changeThumbCount(1); ThumbDown() }} sx={{ color: thumbDown ? 'blue' : '' }}>
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
