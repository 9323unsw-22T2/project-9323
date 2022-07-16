import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import { Editor } from '@tinymce/tinymce-react';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import CommentIcon from '@mui/icons-material/Comment';
import SharePopup from '../SharePopup/SharePopup'
import GuideAnswerCard from '../GuideDetail/GuideAnswerCard'
import { newArticleComment } from '../../service';
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
export default function RecipeReviewCard () {
  const [expanded, setExpanded] = React.useState(false);
  const [commentExpanded, setCommentExpanded] = React.useState(false);
  const [social, setSocial] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setExpanded2(false);
  };
  const [expanded2, setExpanded2] = React.useState(false);
  const handleCommentClick = () => {
    setCommentExpanded(!commentExpanded);
  };
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
    setExpanded(false);
  };
  const navigate = useNavigate();
  const [content, setContent] = React.useState('')
  function handleChange (content, editor) {
    setContent({ content });
    setCommentContent({ content })
  }
  /* const handleSubmit = () => {
    fetch('/comment/articles/1', {
      method: 'POST',
      headers: {
        user_id: '1',
        token: '1301ccf6-1891-42ba-8cbb-310e3bdda032',
      },
      body: JSON.stringify({
        comment_content: 'hello',
        comment_id: '2',
      })
    })
    setContent('')
  } */
  const [commentContent, setCommentContent] = React.useState('')
  const handleSubmit = () => {
    newArticleComment({ commentContent }, localStorage.getItem('token'), localStorage.getItem('user_id'))
  }
  return (
    <Card sx={{ marginBottom: '16px', padding: '1rem', borderRadius: '1rem' }}>
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
        title="RemoteWorker98"
        subheader="September 14, 2016"
      />

      <CardActionArea sx={{ cursor: 'pointer' }} onClick={() => {
        navigate('/guide/1')
      }}>
      <Typography variant="h5">
          How to create a channel in a micosoft teams team.
      </Typography>
      <CardMedia
        component="img"
        height="194"
        image="https://images.idgesg.net/images/article/2019/02/cw_microsoft_office_365_teams-100787163-large.jpg?auto=webp&quality=85,70"
        alt="Paella dish"
        sx={{ width: 'auto' }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        As an admin, you can create and manage teams and channels in the Teams client or the Microsoft Teams admin center. You can create teams as public or private. You can also create an org-wide team. Anyone using Teams in your organization can join a public team. For private teams, team owners manage team membership. And for an org-wide team, everyone in your organization is automatically added.

To get started, we recommend you create private teams and add another owner to manage team settings and membership.
        </Typography>
      </CardContent>
      </CardActionArea >
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
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
      <CardActions disableSpacing>
        Step1
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          On the left side of Teams, click Teams, at the bottom of the teams list, click Join or create a team, and then click Create a new team.

Once youve created the team, invite people to join it. You can add individual users, groups, and even entire contact groups (formerly known as distribution lists).
          </Typography>
          <Typography paragraph>
          Find the team that you created, click More options ...  Manage team. Then go to the Members tab. Find the people you want to designate as team owners. Under Role, click Owner.
          </Typography>
        </CardContent>
      </Collapse>
      <CardActions disableSpacing>
        Step2
      <ExpandMore
          expand={expanded2}
          onClick={handleExpandClick2}
          aria-expanded={expanded2}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded2} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
          Find the team that you created, click More options ...  Add channel. You can also click Manage team and add a channel in the Channels tab. Give the channel a descriptive name to make it easier for users to understand the purpose of the channel.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
