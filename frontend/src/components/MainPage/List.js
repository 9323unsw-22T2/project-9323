import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/TrendingUpRounded';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
  borderRadius: 3,
};
ListDividers.propTypes = {
  data: PropTypes.object,
};
export default function ListDividers ({ data }) {
  const navigate = useNavigate();

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
      <Divider />
      {Object.keys(data).map((post) => {
        return (
          <ListItem key={`trend${data[post].id}`} button onClick={(e) => {
            e.preventDefault()
            navigate(`/question/${data[post].id}`);
          }}>
          <ListItemText primary={data[post].title} secondary={data[post].answer_nums === '[]' ? 'No answer' : `${data[post].answer_nums} answer`} />
           </ListItem>
        )
      })}
    </List>
  );
}
