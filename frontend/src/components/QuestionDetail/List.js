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
import { getTrend } from '../../service'

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
  borderRadius: 3,
  height: 'max-content',
  marginRight: 'auto'
};
ListDividers.propTypes = {
  data: PropTypes.array,
};
export default function ListDividers () {
  const navigate = useNavigate();
  const [trend, setTrend] = React.useState({})

  React.useEffect(async () => {
    try {
      const trendResponse = await getTrend()
      setTrend(trendResponse.data)
    } catch (error) {
    }
  }, [])
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
      {Object.keys(trend).map((post) => {
        return (
          <ListItem key={`trend${trend[post].id}`} button onClick={(e) => {
            e.preventDefault()
            navigate(`/question/${trend[post].id}`);
          }}>
          <ListItemText primary={trend[post].title} secondary={trend[post].answer_nums === '[]' ? 'No answer' : `${trend[post].answer_nums} answer`} />
           </ListItem>
        )
      })}
    </List>
  );
}
