/* eslint-disable multiline-ternary */
/* eslint-disable space-before-function-paren */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Navbar from '../NavBar/Navbar';
import LoggedNarbar from '../LoggedNavBar/Navbar';
import SearchResultCard from '../SearchResultCard/SearchResultCard';
import SortIcon from '@mui/icons-material/Sort';
import { MenuItem, Button, Menu } from '@mui/material';
import GuideCard from '../GuideDetail/GuideCard'
import List from './List'

import { getNewsFeed, getLikedQuestions, getTrend, getLikedArticles } from '../../service'
import useMediaQuery from '@mui/material/useMediaQuery';
import CommonMessage from '../CommonMessage/CommonMessage'

// eslint-disable-next-line space-before-function-paren
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const matchesPad = useMediaQuery(
    '(max-width: 950px)'
  )
  return (
    <div >
      <div
        style={{
          width: matchesPad ? '100vw' : '86vw',
          minHeight: '89vh',
          backgroundAttachment: 'fixed',
          // backgroundColor: 'rgb(118, 118, 118, 0.1)',
          backgroundPosition: 'right bottom',
          backgroundImage: 'url(https://cdni.iconscout.com/illustration/premium/thumb/businessman-working-in-office-3455479-2929000.png)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#f2f9fe'
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
  const [data, setData] = React.useState([]);

  const [likedQ, setLikedQ] = React.useState([]);
  const [likedA, setLikedA] = React.useState([]);

  const [trend, setTrend] = React.useState({})

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const matchesPad = useMediaQuery(
    '(max-width: 950px)'
  )
  const [feed, setFeed] = React.useState(1)
  // const [likedfeed, setLikedFeed] = React.useState(1)

  React.useEffect(async() => {
    try {
      const response = await getNewsFeed(feed)
      setData([...Object.values(response.data)])
    } catch (error) {
      setErrorMessage(['last page', 'error', true])

      feed > 1 && setFeed(feed - 1)
    }
    try {
      const trendResponse = await getTrend()
      setTrend(trendResponse.data)
    } catch (error) {
      setErrorMessage(['fail to get trend', 'error', true])
    }
  }, [feed, value])
  const [errorMessage, setErrorMessage] = React.useState(['', 'error', false]);
  React.useEffect(async() => {
    try {
      const response = await getLikedQuestions(localStorage.getItem('user_id'), localStorage.getItem('user_id'), localStorage.getItem('token'))
      // console.log(response.data)
      setLikedQ([...Object.values(response.data)])
      const res = await getLikedArticles(localStorage.getItem('user_id'), localStorage.getItem('user_id'), localStorage.getItem('token'))
      // console.log(res.data)
      setLikedA([...Object.values(res.data)])
    } catch (error) {
      setErrorMessage(['failed to get liked list', 'error', true])
    }
  }, [value])
  function setMessageStatus () {
    setErrorMessage(['', 'error', false])
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function compareTime (a, b) {
    if (a.timeCreated < b.timeCreated) {
      return 1;
    }
    if (a.timeCreated > b.timeCreated) {
      return -1;
    }
    return 0;
  }
  function compareTimeDescend (a, b) {
    if (a.timeCreated < b.timeCreated) {
      return -1;
    }
    if (a.timeCreated > b.timeCreated) {
      return 1;
    }
    return 0;
  }
  // a simple debounce function https://www.cnblogs.com/Peter2014/p/13254268.html
  /*   function debounce (fn, delay) {
    let timer = null
    return function () {
      const context = this
      const args = arguments
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  } */

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
          display: matchesPad ? 'block' : 'flex',
          height: '89%',
        }}
      >
        <Tabs
          orientation={matchesPad ? 'horizontal' : 'vertical'}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            margin: matchesPad ? 'auto' : '',
            borderRight: 1,
            borderColor: 'divider',
            width: '13vw',
            minWidth: 'max-content',
          }}
        >
          <Tab label="All" sx={{
            borderRight: 1,
            width: '13vw',
            backgroundColor: 'white',
            borderColor: 'divider',
            minWidth: 'max-content',
          }}{...a11yProps(0)} />
          <Tab label="Followed" sx={{
            borderRight: 1,
            borderColor: 'divider',
            minWidth: 'max-content',
            backgroundColor: 'white',
            width: '13vw',
          }}{...a11yProps(1)}/>
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
              backgroundColor: '#f2f9fe',
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
            <MenuItem onClick={(e) => {
              e.preventDefault()
              setData(data.sort(compareTime))
              handleClose()
            }}>Time (new to old)</MenuItem>
            <MenuItem onClick={(e) => {
              e.preventDefault()
              setData(data.sort(compareTimeDescend))
              handleClose()
            }}>Time (old to new)</MenuItem>
          </Menu>
          <Box sx={{ margin: 'auto', display: 'flex', opacity: '0.95' }}>
            <Box sx={{ width: matchesPad ? '90%' : '60%', margin: 'auto' }}>
              <Box>{feed === 1 ? <Button disabled size="large">{'<Previous'} </Button>

                : <Button size="large" onClick={(e) => {
                  !value && feed > 1 && setFeed(feed - 1)
                  // value && setLikedFeed(feed - 1)
                }}>{'<Previous'} </Button>}

                <Button sx={{ float: 'right' }} size="large" onClick={(e) => {
                  !value && feed > 1 && setFeed(feed + 1)
                  // value && setLikedFeed(feed + 1)
                }}>{'Next>'}</Button>
              </Box>
              {<CommonMessage
              setVisible={setMessageStatus}
              message={errorMessage[0]}
              severity={errorMessage[1]}
              visible={errorMessage[2]}
            ></CommonMessage>}
              { data.length && data.map((e, i) => {
                return (
                  e.isDeleted ? <></>
                    : e.TYPE !== 'ARTICLE'
                      ? <SearchResultCard
                    key={'resultCard' + i}
                    data={e}
                  ></SearchResultCard> : <GuideCard key={'resultCard' + i} data={e}></GuideCard>
                );
              })}
            </Box>
            <Box
              sx={{
                display: matchesPad ? 'none' : 'block',
                width: '30%',
              }}
            >
              <List data={trend}></List>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Box sx={{ width: matchesPad ? '90%' : '60%', margin: 10 }}>
          { likedQ.length && likedQ[0].map((e, i) => {
            return (
              <SearchResultCard
                    key={'question' + i}
                    data={e}
                  ></SearchResultCard>
            );
          })}
          { likedA.length && Object.keys(likedA).map((e, i) => {
            return (
              <GuideCard key={'resultCard' + i} data={likedA[e]}></GuideCard>
            );
          })}
        </Box>
        </TabPanel>
      </Box>
    </>
  );
}
