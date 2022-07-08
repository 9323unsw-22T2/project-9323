import React from 'react';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import styles from './App.module.css';
import { newGuide } from '../../service'
import CommonMessage from '../CommonMessage/CommonMessage'
import { useNavigate } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
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
  const handleStep = (step) => () => {
    setActiveStep(step);
    if (steps[step]?.content) {
      setEditorState(steps[step].content)
    }
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
        console.log(steps)

        Object.keys(steps).forEach((ele) => { steps[ele].title = document.getElementById('guide_title').value })
        Object.keys(steps).forEach((ele) => { steps[ele].content = convertToRaw(steps[ele].content.getCurrentContent()) })
        console.log(steps)

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
<Box >
{localStorage.getItem('token')
  ? (
          <LoggedNarbar></LoggedNarbar>
    )
  : (
          <Navbar></Navbar>
    )}
<Button sx={{ height: 'max-content', mt: 2, textDecoration: 'underline', fontSize: '1.3rem', color: '#1976d2 !important', ml: 2 }}href="javascript:history.back()">{'<Return'}</Button>

<Box sx={{ width: '70%', margin: 'auto', mt: -1, backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem' }}>

      <h4 className={styles.guideh4}>Guide Title</h4>
      <TextField rows={1} id='guide_title'multiline sx={{ mb: 2, width: '100%' }} />
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={`label${index}`} completed={steps[index].finished}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label.step_title}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
          <React.Fragment>
            <Box>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <h4 className={styles.guideh4}>Step Title</h4>
            <TextField rows={1} id='step_title'multiline sx={{ mb: 2, width: '100%' }} defaultValue={steps[activeStep].step_title} />
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'block', width: '20rem' }}>
              <h4 className={styles.guideh4}>{'Upload Photo(optional)'}</h4>
              <label htmlFor="contained-button-file" style={{ margin: 'auto' }}>
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
              </Box>
              <Box sx={{ display: 'flex' }}>
              <h4 className={styles.guideh4} style={{ marginRight: '5rem' }}>{'Upload Video(optional)'}</h4>
              <label htmlFor="contained-button-file" style={{ margin: 'auto' }}>
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <Box>
                <Button variant="contained" component="span">
                  Upload
                </Button>
                <TextField rows={1} multiline sx={{ mb: 1, mt: 2, width: '100%' }} placeholder="Or input youtube video here..." />
                </Box>
              </label>
              </Box>
            </Box>
            <h4 className={styles.guideh4}>Description</h4>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperStyle={{ }}
                initialContentState={steps[activeStep].content}
                editorStyle={{ border: '1px solid grey', resize: 'vertical', overflow: 'auto' }}
                onEditorStateChange={onEditorStateChange}
              />
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
