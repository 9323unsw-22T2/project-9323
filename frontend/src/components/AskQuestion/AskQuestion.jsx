import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { newQuestion } from '../../service';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const App = () => {
  const [contentt, setContent] = React.useState('')
  function handleChange (contentt, editor) {
    setContent({ contentt });
    setDescritpion(contentt.replace(/<[^>]+>/g, '')) // FIX THIS
  }
  React.useEffect(() => {

  }, [])
  const [title, setTitle] = React.useState('');
  const [content, setDescritpion] = React.useState('');
  // const [user, setUser] = React.useState('');
  const navigate = useNavigate();
  const handleSubmitQ = async () => {
    try {
      const response = await newQuestion({ title, content }, localStorage.getItem('token'), localStorage.getItem('user_id'))
      if (response.status === 200) { navigate(`/question/${response.data.question_id}`) }
    } catch (error) {

    }
  }
  return (
<Box sx={{ height: '100%' }}>

{localStorage.getItem('token')
  ? (
          <LoggedNarbar></LoggedNarbar>
    )
  : (
          <Navbar></Navbar>
    )}
<Box sx={{ display: 'flex', mt: 3, height: '88%', width: '100%', backgroundAttachment: 'fixed', backgroundPosition: 'left bottom', backgroundImage: 'url(https://cdni.iconscout.com/illustration/premium/thumb/work-from-home-2952363-2509256.png)', backgroundRepeat: 'no-repeat', backgroundColor: 'white' }}>
 <Button variant="outlined" startIcon={<ArrowBackRoundedIcon/>} sx={{ position: 'absolute', zIndex: '8', height: 'max-content', fontFamily: 'Roboto', color: '#1976d2 !important', ml: 2 }}onClick={(e) => {
   e.preventDefault()
   navigate('/main')
 }}> Return </Button>
  <Box sx={{ width: '50%', opacity: '0.95', margin: 'auto', backgroundColor: 'white', borderRadius: '1rem', fontFamily: 'Roboto', float: 'right' }}>
<form style={{ margin: '2rem' }}>
  <h2>Provide a question</h2>

   <TextField rows={4} multiline sx={{ mb: 2, width: '100%' }} placeholder="Input question here..." value={title} onChange={(e) => setTitle(e.target.value)}/>
  <h2>Descpition</h2>

  <Editor
    apiKey="yhf0swre6kb5yv1owq7bcxmfxaxwundoc1htcq2tpvhkyz8t"
    value={contentt.innerText}
    init={{
      height: 300,
      width: '100%',
      menubar: false
    }}
    onEditorChange={handleChange}
  />
  <br />
  <Button variant="contained" onClick={handleSubmitQ}>Submit</Button>

</form>
</Box>
{/* <Box sx={{ width: '35%', margin: 'auto', height: '100%', border: '1px solid red' }}></Box>
 */}</Box>
</Box>
  );
};

export default App;
