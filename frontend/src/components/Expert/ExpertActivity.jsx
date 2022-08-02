/* eslint-disable multiline-ternary */
/* eslint-disable space-before-function-paren */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import MyAnswerCard from './MyAnswerCard';
import MyQesCard from './MyQesCard';
// import SortIcon from '@mui/icons-material/Sort';
import { MenuItem, Button, Menu } from '@mui/material';
import styles from './Expert.module.css';
import List from './List';
import { answerhistory } from '../../service'
import useMediaQuery from '@mui/material/useMediaQuery';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div className={styles.vipbackground2}>
      <div
        className={styles.vipbackground}
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(async() => {
    try {
      const response = await answerhistory(localStorage.getItem('token'), localStorage.getItem('user_id'))
      setData(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }, [])
  const matchesPad = useMediaQuery(
    '(max-width: 1080px)'
  )

  return (
    <>
      {' '}
      <div className="home">
        {' '}
        {localStorage.getItem('token') ? (
          <LoggedNarbar></LoggedNarbar>
        ) : (
          <Navbar></Navbar>
        )}
      </div>
      <Box
        className={styles.box1}
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: matchesPad ? 'block' : 'flex',
          height: '100%',
          weight: '100%'
        }}
      >
        <Tabs
          orientation={ matchesPad ? 'horizontal' : 'vertical'}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            margin: matchesPad ? 'auto' : '',
            borderRight: 1,
            borderColor: 'divider',
            width: '15vw',
            minWidth: 'max-content',
          }}
        >
          <Tab label="Answer History" {...a11yProps(0)} />
          <Tab label="New Questions" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              margin: 'auto',
              color: 'grey !important',
              marginLeft: '1.5rem',
            }}
          >
            {/* <SortIcon></SortIcon>Sort */}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Time (new to old)</MenuItem>
            <MenuItem onClick={handleClose}>Time (old to new)</MenuItem>
          </Menu>
          <Box sx={{ margin: 'auto', display: 'flex', opacity: '0.95' }}>
            <Box sx={{ width: matchesPad ? '100%' : '50%', margin: 'auto' }}>
              {data.map((e, i) => {
                return (
                  <MyAnswerCard
                    mykey={i}
                    key={i}
                    data={e}
                  ></MyAnswerCard>
                );
              })}
            </Box>
            <Box
              sx={{
                width: matchesPad ? '40%' : '40%',
                display: matchesPad ? 'none' : 'block'
              }}
            >
              <List></List>

            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              margin: 'auto',
              color: 'grey !important',
              marginLeft: '1.5rem',
            }}
          >
            {/* <SortIcon></SortIcon>Sort */}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Time (new to old)</MenuItem>
            <MenuItem onClick={handleClose}>Time (old to new)</MenuItem>
          </Menu>
          <Box sx={{ margin: 'auto', display: 'flex', opacity: '0.95' }}>
            <Box sx={{ width: matchesPad ? '100%' : '50%', margin: 'auto' }}>
              {data.map((e, i) => {
                return (
                  <MyQesCard
                    mykey={i}
                    key={i}
                    data={e}
                  ></MyQesCard>
                );
              })}
            </Box>
            <Box
              sx={{
                width: matchesPad ? '40%' : '40%',
                display: matchesPad ? 'none' : 'block'
              }}
            >
            <List></List>

            </Box>
          </Box>
        </TabPanel>
      </Box>
    </>
  );
}
