import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/TrendingUpRounded';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
  borderRadius: 3,
};

export default function ListDividers () {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Trending"/>
      </ListItem>
      <ListItem button>
        <ListItemText primary="Topic" secondary="Description" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Topic" secondary="Description" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Topic" secondary="Description" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Topic" secondary="Description"/>
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Topic" secondary="Description"/>
      </ListItem>
    </List>
  );
}
