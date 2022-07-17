import * as React from 'react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import { useParams } from 'react-router-dom';
import { guideDetail, thumbUp, unThumbUp } from '../../service'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Box } from '@mui/material';
import styles from './App.module.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import CommentIcon from '@mui/icons-material/Comment';
import { Editor } from '@tinymce/tinymce-react';
import Collapse from '@mui/material/Collapse';
import SharePopup from '../SharePopup/SharePopup'
import draftToHtml from 'draftjs-to-html';
import GuideAnswerCard from './GuideAnswerCard'
// eslint-disable-next-line space-before-function-paren
export default function VerticalTabs() {
  const { number } = useParams();
  const [data, setData] = React.useState({ 0: { title: 'none' }, 1: { title: 'none' } })
  const [activeStep, setActiveStep] = React.useState(0);
  const [commentExpanded, setCommentExpanded] = React.useState(false);
  const handleCommentClick = () => {
    setCommentExpanded(!commentExpanded);
  };

  const [social, setSocial] = React.useState(false);

  const [content, setContent] = React.useState('')
  function handleChange (content, editor) {
    setContent({ content });
  }
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const hendleThumb = async () => {
    if (data[0]?.thumb_up_by?.find((e) => e === parseInt(localStorage.getItem('user_id')))) {
      try {
        const response = await unThumbUp(number, localStorage.getItem('token'), localStorage.getItem('user_id'))
        setData(response.data.article)
      } catch (error) {

      }
    } else {
      try {
        const response = await thumbUp(number, localStorage.getItem('token'), localStorage.getItem('user_id'))
        setData(response.data.article)
      } catch (error) {

      }
    }
  }
  React.useEffect(async () => {
    /*     console.log(number, localStorage.getItem('user_id'), localStorage.getItem('token'))
 */ try {
      const response = await guideDetail(localStorage.getItem('user_id'), localStorage.getItem('token'), number)
      setData(Object.fromEntries(Object.entries(response.data.article)))
    } catch (error) {}
  }, [])
  return (
  <div className="home">
  {localStorage.getItem('token')
    ? (
    <LoggedNarbar></LoggedNarbar>
      )
    : (
    <Navbar></Navbar>
      )}
      <Box>
        <Button sx={{ position: 'absolute', zIndex: '8', height: 'max-content', textDecoration: 'underline', fontSize: '1.3rem', color: '#1976d2 !important', ml: 2 }}href="/main">{'<Return'}</Button>
        </Box>
      <Box sx={{ display: 'flex' }}>
      <Box className={styles.guideDetail}>
      <CardHeader
            sx={{ width: '95%', margin: 'auto', mt: 3 }}
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
        <Box sx={{ width: '95%', margin: 'auto' }}>
          <Stepper nonLinear activeStep={activeStep}>
          {Object.keys(data).map((ele, index) => (

            <Step key={`label${index}`} >
              <StepButton color="inherit" onClick={handleStep(index)}>
                {data[ele].step_title ? data[ele].step_title : 'unknown'}
              </StepButton>
            </Step>
          ))}

          </Stepper>
        </Box>

        <Card sx={{ width: '95%', border: 'none', margin: 'auto', boxShadow: 'none', height: '32rem', overflow: 'scroll', mt: 3 }}>

          <CardMedia
            component="img"
            sx={{ height: 'max-content', width: 'max-content' }}
            image="https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e"
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="h4" color="text.secondary">
            <div dangerouslySetInnerHTML={{ __html: draftToHtml(data[activeStep].content) }}></div>
            </Typography>
          </CardContent>

        </Card>
        <CardActions sx={{ width: '95%', margin: 'auto' }}disableSpacing>
            <IconButton onClick={hendleThumb} aria-label="add to favorites" sx={{ color: data[0]?.thumb_up_by?.find((e) => e === parseInt(localStorage.getItem('user_id'))) ? 'red' : 'grey' } }>
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
      </Box>
      <Box
          sx={{
            width: '20%',
            marginLeft: 'auto',
            marginRight: ' auto',
            height: '80vh',
            border: '1px solid red',
          }}
        ></Box>
        </Box>
  <GuideAnswerCard></GuideAnswerCard>
  <h2>

  </h2>
</div>
  )
}
