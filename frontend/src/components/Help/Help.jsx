import React from 'react'
import {
  Box,
  Typography,
  DialogContent
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import styles from './App.module.css';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Select from 'react-select'

function Help () {
  const options = [
    { value: 'How It Workesws For Renters', label: 'question1' },
    { value: 'How It Workwes For comsumers', label: 'question2' },
    { value: '「……というわけで、無事解決しましたっ!!」ヒ口をつけつつ、つまらなそうに顔を顰しかめ', label: 'ョン取っていいのか分からないのよね」「あ、す、すみません……」' },
    { value: 'How It Workss wwFor Renters', label: 'Please condupective A is d' },
    { value: 'How It Workssws For comsumers', label: 'Cras maac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.' },
    { value: '「……というわけで、無事解決しましたカップに口をつけつつ', label: '「貴方あなたの話、『色々あって』とか、『なんやかんや』とか、『そんなこんな』とか、ン取っていいのか分からないのよね」「あ、す、すみません……」' }
  ]
  const [open, setOpen] = React.useState(false);
  const [popTitle, setPopTitle] = React.useState('this is a title');
  const [popDescription, setPopDescription] = React.useState('this is a description');

  const handleClickOpen = (title, description) => {
    setPopTitle(title)
    setPopDescription(description)
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  const sampleData = [
    { title: 'How It Works For Renters', description: 'Please conduct the Retrospective A meeting as soon as possible after Progressive Demo A.You need to be present at your Retrospective A meeting to receive a mark for this Retrospective A assessment item.The report for Retrospective A is d' },
    { title: 'How It Works For comsumers', description: 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.' },
    { title: '「……というわけで、無事解決しましたっ!!」ヒ口をつけつつ、つまらなそうに顔を顰しかめ', description: '「貴方あなたの話、『色々あって』とか、『なんやかんや』とか、『そんなこんな』とか、あらすじだけの映画レビュー見てるみたいで、どうリアクション取っていいのか分からないのよね」「あ、す、すみません……」' },
    { title: 'How It Works For Renters', description: 'Please conduct the Retrospective A meeting as soon as possible after Progressive Demo A.You need to be present at your Retrospective A meeting to receive a mark for this Retrospective A assessment item.The report for Retrospective A is d' },
    { title: 'How It Works For comsumers', description: 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.' },
    { title: '「……というわけで、無事解決しましたカップに口をつけつつ', description: '「貴方あなたの話、『色々あって』とか、『なんやかんや』とか、『そんなこんな』とか、あらすじだけの映画レビュー見てるみたいで、どうリアクション取っていいのか分からないのよね」「あ、す、すみません……」' }
  ]
  console.log(sampleData)
  return (
    <>
    <Box sx={{ ml: 3 }}>
    <Typography variant="h5" gutterBottom component="div"sx={{ mt: 5, mb: 3 }}>
    {'What can I help you'}
    </Typography>
    <Select options={options} placeholder={'Search questions here'} onChange={(e) => {
      handleClickOpen(e.label, e.value)
    }}/>

    </Box>
    <Typography variant="h5" gutterBottom component="div"sx={{ mt: 5, ml: 3 }}>
    {'Hot FAQ \'s'}
    </Typography>
    <div className={styles.login}>
      <Box sx={{ ml: 3, mt: 3, textAlign: 'left', textDecoration: 'underline' }}>
      {sampleData.map((e, index) => {
        return (<div style={{ marginTop: '1rem', cursor: 'pointer' }}key={`lineone${index}`} onClick={(event) => {
          event.preventDefault()
          handleClickOpen(e.title, e.description)
        }} >{e.title}</div>
        )
      })}
      </Box>
      <Box sx={{ ml: 2, mt: 3, margin: 'auto', textAlign: 'left', textDecoration: 'underline' }}>
      {sampleData.map((e, index) => {
        return (<div style={{ marginTop: '1rem', cursor: 'pointer' }}key={`linetwo${index}`} onClick={(event) => {
          event.preventDefault()
          handleClickOpen(e.title, e.description)
        }} >{e.title}</div>
        )
      })}
      </Box>

    <Dialog sx={{ '& .MuiDialog-paper': { maxWidth: 'none' } }} open={open} onClose={handleClose}>
      <div>
        <div style={{ display: 'flex', borderBottom: '1px solid grey' }}>

          <DialogTitle>{popTitle}</DialogTitle>
          <IconButton sx={{ marginLeft: 'auto' }}aria-label="close" size="large" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          {popDescription}
        </DialogContent>
      </div>
    </Dialog>

  </div>
      <Box sx={{ ml: 3, mt: 7, fontSize: '2rem' }}><CallIcon fontSize={'large'}></CallIcon>Call 61-455 263 955</Box>
      <Box sx={{ ml: 3, mt: 7, fontSize: '2rem' }}><EmailIcon fontSize={'large'}></EmailIcon>Email z5333605@gmail.com</Box>
      <Box sx={{ ml: 3, mt: 7, fontSize: '2rem' }}><LocationOnIcon fontSize={'large'}></LocationOnIcon>Sydney NSW 2052</Box>
    </>
  )
}

export default Help
