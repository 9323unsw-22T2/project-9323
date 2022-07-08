import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

import {
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
} from 'react-share';
import PropTypes from 'prop-types';

const popup = ({ opened, setOpened }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText('/joinGame/swsws');
  };
  const handleClose = () => setOpened(!opened);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
  };
  return <Modal open={ opened} onClose={handleClose} aria-labelledby="modal-session">
    <Box sx={modalStyle}>
      <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
        Share in social media
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        sx={{ display: 'flex', mt: 2 }}
      >
     <TwitterShareButton
               style={{ marginRight: '1rem' }}
                url={'Join in my game!/joinGame/'}
              >
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <FacebookShareButton
              style={{ marginRight: '1rem' }}
                url={'Join in my game! /joinGame/'}
              >
                <FacebookIcon sx={{ mr: 1 }} size={32} round={true} />
              </FacebookShareButton>
              <LineShareButton
              style={{ marginRight: '1rem' }}
                url={'Join in my game! /joinGame/'}
              >
                <LineIcon sx={{ mr: 1 }} size={32} round={true} />
              </LineShareButton>
              <LinkedinShareButton
              style={{ marginRight: '1rem' }}
                url={'Join in my game! /joinGame/'}
              >
                <LinkedinIcon sx={{ mr: 1 }} size={32} round={true} />
              </LinkedinShareButton>
      </Typography>
      <Button onClick={handleCopyLink} variant="contained" sx={{ mt: 2 }}>
        Copy URL link
      </Button>
      <Button
        name="close-url-modal"
        onClick={handleClose}
        sx={{ ml: 1, mt: 2 }}
      >
        Close
      </Button>
    </Box>
</Modal>
};
popup.propTypes = {
  opened: PropTypes.bool,
  setOpened: PropTypes.func

}
export default popup;
