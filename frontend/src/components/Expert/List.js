/* eslint-disable no-unused-vars */
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import logo from './1.png'
import styles from './Expert.module.css';
// eslint-disable-next-line no-unused-vars
import { getLeader } from '../../service'
const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
  borderRadius: 3,
};

export default function ListDividers () {
  const [data, setData] = React.useState([]);
  React.useEffect(async () => {
    try {
      const response = await getLeader()
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <img src={logo} className={styles.ted} ></img>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Top score users"/>
      </ListItem>

      {data.map((e, i) => {
        return (
          <ListItem key={i}>
            <ListItemText primary={e.name} secondary={'Score:' + e.scores + ' points'} />
          </ListItem>
        );
      })}
    </List>
  );
}
