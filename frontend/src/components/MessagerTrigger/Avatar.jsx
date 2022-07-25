import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import PropTypes from 'prop-types';
import { toggleWidget } from 'react-chat-widget';

Avatar.propTypes = {
  setAnchorEl: PropTypes.func,
  anchorEl: PropTypes.array,
};
export default function Avatar ({ setAnchorEl, anchorEl }) {
  const openProfile = Boolean(anchorEl);

  const handleCloseProfile = () => {
    setAnchorEl(null);
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
      <AccountBoxIcon />
    </ListItemIcon>
    <ListItemText>Profile</ListItemText>
  </MenuItem>
  <MenuItem onClick={handleCloseProfile}>
  <ListItemIcon>
    <EmailIcon/>
    </ListItemIcon>
    <ListItemText onClick={toggleWidget}>Private message</ListItemText>
  </MenuItem>
</Menu>)
}
