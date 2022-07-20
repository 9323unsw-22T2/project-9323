/* eslint-disable multiline-ternary */
import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import styles from './Expert.module.css';
/* import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import SearchDetail from './SearchDetail/SearchDetail'; */
ActionAreaCard.propTypes = {
  data: PropTypes.object,
};

// eslint-disable-next-line space-before-function-paren
export default function ActionAreaCard({ data }) {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const onEditorStateChange = (editorState) => { setEditorState(editorState) }
  const [isShowMore, setIsShowMore] = React.useState(true);
  const toggleReadMore = () => {
    setIsShowMore(!isShowMore);
  };
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML('<p>My initial content.</p>'))
      ));
  };
  const text =
    "I've setup eslint & eslint-plugin-react When I run ESLint, the linter returns no-unused-vars errors for each React component. I'm assuming it's not recognizing that I'm using JSX or React syntax. Any ideas?";
  const Ans = 'First, install the following module npm install --save-dev eslint-plugin-react. Then, in your .eslintrc.json, under extends, include the following plugin:\'extends\': [\'plugin:react/recommended\']';

  return (
    <Card
      sx={{
        boxShadow: 12,
        borderRadius: '1rem',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#fff',
        borderTopColor: '#e6e5e6',
        mb: 1,
        overflow: 'unset'

      }}
    >
      <CardContent>
        <Box>
          <CardHeader
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              m: 1,
            }}
            title={'ESLint with React gives `no-unused-vars` errors '}
          ></CardHeader>
          <CardContent
            sx={{ borderBottom: '1px solid #e6e5e6' }}
            // eslint-disable-next-line react/no-children-prop
            children={
              <Box>
                {isShowMore ? text.slice(0, 300) : text}
                {text && text.length > 300 && (
                  <Box
                    onClick={toggleReadMore}
                    sx={{
                      cursor: 'pointer',
                      fontSize: '14px',
                      marginTop: '20px',
                      marginBottom: '30px',
                      textDecoration: 'underline',
                    }}
                  >
                    {isShowMore ? 'Show more...' : 'Show less'}
                  </Box>
                )}
              </Box>
            }
          ></CardContent>
          <Box className={styles.text1}>Your Answer:</Box>
          <CardContent
            sx={{ borderBottom: '1px solid #e6e5e6' }}
            // eslint-disable-next-line react/no-children-prop
            children={
              <Box className={styles.ans}>
                {isShowMore ? Ans.slice(0, 300) : Ans}
                {Ans && Ans.length > 300 && (
                  <Box
                    onClick={toggleReadMore}
                    sx={{
                      cursor: 'pointer',
                      fontSize: '14px',
                      marginTop: '20px',
                      marginBottom: '30px',
                      textDecoration: 'underline',
                    }}
                  >
                    {isShowMore ? 'Show more...' : 'Show less'}
                  </Box>
                )}
                <button onClick={handleExpandClick} className={styles.btn1}> Edit</button>
              </Box>
            }
          ></CardContent>
        </Box>
      </CardContent>
      <CardActions sx={{ ml: 3, display: 'auto', overflow: 'auto' }}>
        <Button size="small">Follow</Button>
        <Box sx={{ margin: 'auto' }}>2022/02/31 19:49:03</Box>
        <Box
          sx={{
            margin: 'auto',
            color: '#1976d2',
            cursor: 'pointer',
          }}
        >
          <span>$10 points </span>
        </Box>
        <Box sx={{ margin: 'auto' }}>
          <Button size="small" onClick={handleExpandClick}>Answer</Button>
        </Box>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperStyle={{ }}
            editorStyle={{ border: '1px solid grey', resize: 'vertical', overflow: 'auto' }}
            onEditorStateChange={onEditorStateChange}
            editorContent='Gi'
          />
          <Button sx={{ mb: 1, mt: 2, float: 'right' }} variant="contained">Submit</Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
