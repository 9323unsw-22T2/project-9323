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
        <ListItemText primary="231 Like" secondary="Totally 231 users like your answers" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="64 Comments" secondary="Totally 64 users comment on your answer " />
      </ListItem>
      <ListItem button>
        <ListItemText primary="5 Stars" secondary="You have earn 5 stars" />
      </ListItem>

    </List>
  );
}
