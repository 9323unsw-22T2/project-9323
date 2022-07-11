/* eslint-disable multiline-ternary */
/* eslint-disable space-before-function-paren */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import MyAnswerCard from '../MyAnswerCard/MyAnswerCard';
import SortIcon from '@mui/icons-material/Sort';
import { MenuItem, Button, Menu } from '@mui/material';

import List from './List'
// eslint-disable-next-line space-before-function-paren
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div>
      <div
        style={{
          // backgroundColor: 'rgb(118, 118, 118, 0.1)',
          backgroundImage: 'url(https://cdn.dribbble.com/users/782052/screenshots/10927554/media/e961df046013321feb28cf99b7fc7800.jpg)'
        }}
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
  const sampleData = [
    {
      id: '123',
      photo: ['', '', ''],
      location: 'George Street, Redfern New South Wales',
      description:
        'Redfern- Security Motorcycle Parking For Lease,Redfern- Security Motorcycle Parking For LeaseRedfern- Security Motorcycle Parking For Lease,Redfern- Security Motorcycle Parking For Lease                                                              Redfern- Security Motorcycle Parking For Lease,Redfern- Security Motorcycle Parking For LeaseRedfern- Security Motorcycle Parking For Lease,Redfern- Security Motorcycle Parking For Lease',
      size: 'Van',
      type: 'Undercover',
      monthly: true,
      hourly: true,
      daily: true,
      priceCurrent: 980,
      electricCharing: true,
    },
    {
      id: '123',
      location:
        'George Street, Redfern New South Wales,Redfern- Security Motorcycle Parking For Lease',
      description: 'Redfern- Security Motorcycle Parking For Lease',
      size: 'samoleedew',
      type: 'Undercover',
      monthly: true,
      hourly: false,
      daily: true,
      priceMonth: 300,
      priceDay: 20,
      pricehour: null,
      priceCurrent: 980,
      electricCharing: true,
    },
    {
      id: '123',
      location: 'George Street, Redfern New South Wales',
      description: 'Redfern- Security Motorcycle Parking For Lease',
      size: 'Van',
      type: 'Undercover',
      monthly: true,
      hourly: true,
      daily: true,
      priceCurrent: 980,
      electricCharing: false,
    },
  ];
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
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          height: '100%',
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            width: '15vw',
            minWidth: 'max-content',
          }}
        >
          <Tab label="My Answer" {...a11yProps(0)} />
          <Tab label="My Question" {...a11yProps(1)} />

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
            <SortIcon></SortIcon>Sort
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
            <MenuItem onClick={handleClose}>Distance</MenuItem>
            <MenuItem onClick={handleClose}>Price(high to low)</MenuItem>
            <MenuItem onClick={handleClose}>Price(low to high)</MenuItem>
          </Menu>
          <Box sx={{ margin: 'auto', display: 'flex', opacity: '0.95' }}>
            <Box sx={{ width: '50%', margin: 'auto' }}>
              {sampleData.map((e, i) => {
                return (
                  <MyAnswerCard
                    key={'resultCard' + i}
                    data={e}
                  ></MyAnswerCard>
                );
              })}
            </Box>
            <Box
              sx={{
                width: '40%',
              }}
            >
              <List></List>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>

      </Box>
    </>
  );
}
