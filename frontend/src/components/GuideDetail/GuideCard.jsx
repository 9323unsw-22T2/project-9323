import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Editor } from '@tinymce/tinymce-react';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import CommentIcon from '@mui/icons-material/Comment';
import SharePopup from '../SharePopup/SharePopup'
import GuideAnswerCard from '../GuideDetail/GuideAnswerCard'
import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteGuide, articleLike, newArticleComment, articleDislike } from '../../service'

import AvatarTrigger from '../MessagerTrigger/Avatar'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
RecipeReviewCard.propTypes = {
  data: PropTypes.object,
};
export default function RecipeReviewCard ({ data }) {
  const [commentExpanded, setCommentExpanded] = React.useState(false);
  const [social, setSocial] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const handleDelete = async () => {
    try {
      await deleteGuide(data.articleId, localStorage.getItem('token'), localStorage.getItem('user_id'))
      window.location.reload(false);
    } catch (error) {
      window.alert('cant delete, please check you login status')
    }
  }
  const handleExpandClick = (e) => {
    if (activeStep !== e) {
      setActiveStep(e)
    } else { setActiveStep(null) }
  };
  const handleCommentClick = () => {
    setCommentExpanded(!commentExpanded);
  };
  const [liked, setLiked] = React.useState(JSON.parse(data?.thumbUpBy).includes(parseInt(localStorage.getItem('user_id'))))
  const handleLike = async () => {
    try {
      if (liked) {
        await articleDislike(data.id, localStorage.getItem('token'), localStorage.getItem('user_id'))
        setLiked(false)
      } else {
        await articleLike(data.id, localStorage.getItem('token'), localStorage.getItem('user_id'))
        setLiked(true)
      }
    } catch (error) {
    }
  }
  const navigate = useNavigate();
  const [content, setContent] = React.useState('')
  function handleChange (contentt, editor) {
    setContent(contentt.replace(/<[^>]+>/g, ''))
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [score, setScore] = React.useState('');
  const handleSubmit = () => {
    newArticleComment({ content, score }, localStorage.getItem('token'), localStorage.getItem('user_id'), data.id)
    setScore(null)
    window.location.reload(false);
  }
  /*
  const [commentContent, setCommentContent] = React.useState('')
  const handleSubmit = () => {
    newArticleComment({ commentContent }, localStorage.getItem('token'), localStorage.getItem('user_id'))
  } */
  return (
    <Card sx={{ marginBottom: '16px', padding: '1rem', borderRadius: '1rem', fontFamily: 'Roboto', fontSize: 15 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], cursor: 'pointer' }} onClick={handleClickProfile}>
            R
          </Avatar>
        }
        action={
          parseInt(localStorage.getItem('user_id')) === data.author &&
          <IconButton aria-label="settings" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        }
        title={data.author_name}
        subheader={new Date(data.timeCreated * 1000).toLocaleString()}
      />
      <AvatarTrigger setAnchorEl={setAnchorEl} anchorEl={anchorEl} user={data.author} username={data.author_name}></AvatarTrigger>

      <CardContent sx={{
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'underline'
        },
      }} onClick={() => {
        navigate(`/guide/${data.id}`)
      }}>
        <Typography variant="h4" sx={{ fontfamily: 'Roboto', fontSize: 25 }}>
        {data.title}
        </Typography>
      </CardContent>

      {
        data.each_step.map((e, index) => {
          return (
          <div key={`step${index}`} >
            <CardActions disableSpacing>
                  {e.stepTitle}
                  <ExpandMore
                    expand={index === activeStep}
                    onClick={(event) => { event.preventDefault(); handleExpandClick(index) }}
                    aria-expanded={index === activeStep}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>

            </CardActions>
            <Collapse in={index === activeStep} timeout="auto" unmountOnExit>
            {e.video &&
        <div style={{ marginTop: '2rem', textAlign: 'center', overflow: 'auto' }}>
        <iframe width="560" height="315" src={e.video.replace('https://youtu.be/', 'https://www.youtube.com/embed/')} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>}
            <CardContent>
            <div style={{ overflow: 'auto' }}dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(e.content)) }}></div>

            </CardContent>
          </Collapse>
          </div>
          )
        })
      }
      <CardActions disableSpacing>
      {!liked ? <Button onClick={handleLike}size="small">Follow</Button> : <Button color="error" onClick={handleLike} size="small">Unfollow</Button>}
        <IconButton aria-label="share" onClick={(e) => { e.preventDefault(); setSocial(!social) }}>
          <ShareIcon />
        </IconButton>
        <IconButton onClick={handleCommentClick} aria-label="comment">
          <CommentIcon />
        </IconButton>
      </CardActions>
      <SharePopup opened={social} setOpened={setSocial}></SharePopup>
      <Collapse in={commentExpanded} timeout="auto" unmountOnExit>
      <CardContent>
        <h1 style={{ fontFamily: 'Roboto', fontSize: 25 }}>Comments</h1>
      <GuideAnswerCard/>
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
  <Button sx={{ mb: 1, float: 'right' }} variant="contained" onClick={handleSubmit}>Submit</Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
