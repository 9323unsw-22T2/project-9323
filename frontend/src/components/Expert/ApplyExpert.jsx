import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const App = () => {
  const [content, setContent] = React.useState('')
  function handleChange (content, editor) {
    setContent({ content });
  }
  React.useEffect(() => {

  }, [])
  const [field, setField] = React.useState('');

  const handleFieldChange = (event) => {
    setField(event.target.value);
  };
  return (
<Box sx={{ height: '100%' }}>

{localStorage.getItem('token')
  ? (
          <LoggedNarbar></LoggedNarbar>
    )
  : (
          <Navbar></Navbar>
    )}
<Box sx={{ display: 'flex', mt: 3, height: '88%', width: '100%', backgroundImage: 'url(https://cdn.dribbble.com/users/1362913/screenshots/4606447/media/781df62e1f36d160f60d855938b1e41d.png?compress=1&resize=800x600&vertical=top)' }}>
<Button sx={{ position: 'absolute', zIndex: '8', height: 'max-content', textDecoration: 'underline', fontSize: '1.3rem', color: '#1976d2 !important', ml: 2 }}href="javascript:history.back()">{'<Return'}</Button>
  <h1>Tell us about what you are good at</h1>
  <Box sx={{ width: '75%', opacity: '0.95', margin: 'auto', backgroundColor: 'white', borderRadius: '1rem' }}>
  <form style={{ margin: '2rem' }}>
  <h2>Provide a question</h2>

   <TextField rows={4} multiline sx={{ mb: 2, width: '100%' }} placeholder="Input question here..." />
   <FormControl fullWidth>
  <InputLabel >Field</InputLabel>
        <Select
          id="demo-simple-select"
          value={field}
          label="Field"
          onChange={handleFieldChange}
        >
          <MenuItem value={'Health'}>Health</MenuItem>
          <MenuItem value={'Science'}>Science</MenuItem>
          <MenuItem value={'Pet'}>Pet</MenuItem>
        </Select>
      </FormControl>
  <h2>Descpition</h2>

  <Editor
    apiKey="yhf0swre6kb5yv1owq7bcxmfxaxwundoc1htcq2tpvhkyz8t"
    value={content.innerText}
    init={{
      height: 300,
      menubar: false
    }}
    onEditorChange={handleChange}
  />
  <br />
  <Button variant="contained">Submit</Button>

</form>
</Box>
{/* <Box sx={{ width: '35%', margin: 'auto', height: '100%', border: '1px solid red' }}></Box>
 */}</Box>
</Box>
  );
};

export default App;
