import React from 'react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import styles from './Expert.module.css';
import { newGuide } from '../../service'
import CommonMessage from '../CommonMessage/CommonMessage'
import { useNavigate } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-dropdown/style.css';

const App = () => {
  const [steps, setStep] = React.useState([{ step_title: 'Step1', content: EditorState.createEmpty(), finished: false }, { step_title: 'Step2', content: EditorState.createEmpty(), finished: false }, { step_title: 'Step3', content: EditorState.createEmpty(), finished: false }]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState(['', 'error', false]);
  function setMessageStatus () {
    setErrorMessage(['', 'error', false])
  }
  const navigate = useNavigate();

  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    let count = 0
    steps.forEach((e) => { e.finished && (count = count + 1) })
    return count;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const onEditorStateChange = (editorState) => { setEditorState(editorState) }
  const handleNext = () => {
    const newActiveStep =
      isLastStep()
        ? activeStep
        : activeStep + 1;
    document.getElementById('step_title').value = steps[newActiveStep].step_title
    setEditorState(steps[activeStep + 1].content ? steps[activeStep + 1].content : EditorState.createEmpty())

    setActiveStep(newActiveStep);
  };
  const handleBack = () => {
    document.getElementById('step_title').value = steps[activeStep].step_title
    setEditorState(steps[activeStep - 1].content ? steps[activeStep - 1].content : EditorState.createEmpty())

    setActiveStep(activeStep - 1);
  }
  const handleNew = () => {
    const list = [...steps.slice(0, activeStep + 1), { step_title: 'new step', content: EditorState.createEmpty(), finished: false }, ...steps.slice(activeStep + 1)]
    setStep(list)
  };

  const handleDelete = () => {
    if (isLastStep()) {
      handleBack()
      const list = [...steps.slice(0, activeStep)]
      setStep(list)
    } else {
      const list = [...steps.slice(0, activeStep), ...steps.slice(activeStep + 1)]
      setStep(list)
    }
  }

  const handleComplete = async () => {
    const newSteps = steps;
    if (!editorState || !document.getElementById('guide_title').value) { setErrorMessage(['Please fill in all fields', 'error', true]) } else {
      newSteps[activeStep] = { step_title: document.getElementById('step_title').value, content: editorState, finished: true };
      setStep(newSteps)
      if (allStepsCompleted()) {
        /* console.log(steps) */

        Object.keys(steps).forEach((ele) => { steps[ele].title = document.getElementById('guide_title').value })
        Object.keys(steps).forEach((ele) => { steps[ele].content = convertToRaw(steps[ele].content.getCurrentContent()) })
        /* console.log(steps) */

        if (!(localStorage.getItem('token'))) { window.alert('Please log in first') } else {
          try {
            const response = await newGuide(Object.assign({}, steps), localStorage.getItem('token'), localStorage.getItem('user_id'))
            navigate(`/guide/${response.data.article_id}`)
          } catch (error) {
            setErrorMessage(['network error', 'error', true])
          }
        }
      }
    }
  };

  const Input = styled('input')({
    display: 'none',
  });
  return (
    <Box sx={{ height: '100%' }} className={styles.background}>
      {localStorage.getItem('token')
        ? (
          <LoggedNarbar></LoggedNarbar>
          )
        : (
          <Navbar></Navbar>
          )}
      {/* <Button sx={{ position: 'absolute', zIndex: '8', height: 'max-content', mt: 2, textDecoration: 'underline', fontSize: '1.3rem', color: '#1976d2 !important', ml: 2 }}href="javascript:history.back()">{'<Return'}</Button> */}
      <h1 className={styles.title}>Tell us about what you good at</h1>
      <Box sx={{ width: '70%', margin: 'auto', mt: 6, opacity: '0.95', backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem' }}>
        <div>
          <React.Fragment>
            <Box>
              <h4 className={styles.guideh4}>Select your area</h4>
              <form>
              <p>Area you good at:</p>
              <select className={styles.step_title}>
                <option value="Computer Science">Computer Science</option>
                <option value="Biology">Biology</option>
                <option value="Policy">Policy</option>
                <option value="Animal">Animal</option>
              </select>
              </form>
              {/* <TextField rows={1} id='step_title' multiline sx={{ mb: 2, width: '100%' }} defaultValue={steps[activeStep].step_title} /> */}
              <br></br>
              <h4 className={styles.guideh4}>Achieve you have gotten in this area:</h4>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperStyle={{}}
                initialContentState={steps[activeStep].content}
                editorStyle={{ border: '1px solid grey', resize: 'vertical', overflow: 'auto', height: '10rem' }}
                onEditorStateChange={onEditorStateChange}
              />
              </Box>
            <Box sx={{ display: 'flex', marginTop: '10px' }}>
              <br></br><br></br>
                <Box sx={{ display: 'flex' }}>
                  <br></br><br></br>
                  <h4 className={styles.guideh4} style={{ marginRight: '5rem' }}>{'Upload your certificates'}</h4>
                  <label htmlFor="contained-button-file" style={{ margin: 'auto' }}>
                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                    <Box>
                      <Button variant="contained" component="span">
                        Upload
                      </Button>
                    </Box>
                  </label>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', marginTop: '30px' }}>
              <h4 className={styles.guideh4}>Guide Title</h4> <span>&nbsp;&nbsp;</span>
              <TextField rows={1} id='guide_title' />
            </Box>

            {<CommonMessage
              setVisible={setMessageStatus}
              message={errorMessage[0]}
              severity={errorMessage[1]}
              visible={errorMessage[2]}
            ></CommonMessage>}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                size="large"
                variant="outlined"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button
                size="large"
                color="inherit"
                disabled={steps.length === 1}
                onClick={handleDelete}
                sx={{ mr: 1 }}
              >
                delete
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button size="large"
                variant="outlined"
                onClick={handleNew} sx={{ mr: 1 }}>
                New
              </Button>
              <Button
                size="large"
                variant="outlined"
                disabled={activeStep === steps.length - 1}
                onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              <Button
                size="large"
                variant="outlined"
                onClick={handleComplete}>
                {activeStep === totalSteps() - 1
                  ? 'Finish'
                  : 'Save Step'}
              </Button>

            </Box>
          </React.Fragment>
        </div>
      </Box>
    </Box>
  );
};

export default App;
