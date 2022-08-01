import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import EmailIcon from '@mui/icons-material/Email';
import PropTypes from 'prop-types';
import { toggleWidget } from 'react-chat-widget';

Avatar.propTypes = {
  setAnchorEl: PropTypes.func,
  anchorEl: PropTypes.object,
  user: PropTypes.number,
  username: PropTypes.string
};
export default function Avatar ({ setAnchorEl, anchorEl, user, username }) {
  const openProfile = Boolean(anchorEl);

  const handleCloseProfile = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
    if (parseInt(user) === parseInt(localStorage.getItem('user_id'))) {
      window.alert('can not send message to your self!')
    } else {
      toggleWidget()
      document.dispatchEvent(new CustomEvent('chatchage', { detail: { user, username } }))
    }
  };
  return (
  <Menu
  anchorEl={anchorEl}
  open={openProfile}
  onClose={handleCloseProfile}
  MenuListProps={{
    'aria-labelledby': 'basic-button',
  }}
>
  <MenuItem onClick={handleCloseProfile}>
  <ListItemIcon>
    <EmailIcon/>
    </ListItemIcon>
    <ListItemText onClick={handleClose}>Private message</ListItemText>
  </MenuItem>
</Menu>)
}
