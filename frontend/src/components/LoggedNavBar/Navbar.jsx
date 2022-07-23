import * as React from 'react';
import styles from './App.module.css';
import { Button, Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { styled, alpha } from '@mui/material/styles';
// import SettingsIcon from '@mui/icons-material/Settings';
import InputBase from '@mui/material/InputBase';
// import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SearchIcon from '@mui/icons-material/Search';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import { logOut, isExpert } from '../../service';
import { useNavigate } from 'react-router-dom';
import logo from './UNSW.png';
import { googleLogout } from '@react-oauth/google';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
    [theme.breakpoints.up('lg')]: {
      width: '50ch',
    },
  },
}));
const Navbar = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };
  const [isexpert, setIsexpert] = React.useState(false);
  React.useEffect(async () => {
    try {
      const response = await isExpert(localStorage.getItem('token'), localStorage.getItem('user_id'))
      setIsexpert(await Boolean(!response.data.expertOrNot))
    } catch (error) {
      console.log(error)
    }
  }, [])
  return (
    <div className={styles.Navbar}>
      <div className={styles.logo}>
        <img

          height="60"
          viewBox="0 0 229 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          src={logo}
          onClick={(e) => { e.preventDefault(); navigate(localStorage.getItem('token') ? '/main' : '/') }}
          className={styles.UNSWlogo}
        >
        </img>
      </div>
      <Search sx={{
        display: 'flex',
        margin: 'auto',
        height: 'max-content',
        '@media screen and (max-width:1000px)': {
          display: 'none'
        }
      }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '1rem' }}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
        <Box sx={{ margin: 'auto' }}>
          <Button
            xs={{ margin: 'auto !important', borderRadius: '1rem' }}
            variant="contained"
          >
            Search
          </Button>
        </Box>
      </Search>
      <Box sx={{ marginLeft: 'auto', mr: 2, textAlign: 'center' }}>
        <Button
          variant="standard"
          className={`${styles.loginbutton} `}
          sx={{ fontSize: '18px' }}
          onMouseOver={handleClick}
        >
          My account
        </Button>
        <Menu
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem
            sx={{ width: '10rem', fontSize: '1.2rem' }}
            onClick={(e) => {
              e.preventDefault()
              navigate('/profile')
            }}
          >
            <AccountBoxIcon></AccountBoxIcon>
            Profile
          </MenuItem>
          {/* <MenuItem sx={{ fontSize: '1.2rem' }} onClick={(e) => {
            e.preventDefault()
            navigate('/activity')
          }}>
            <QuestionAnswerIcon></QuestionAnswerIcon>
            Activity
          </MenuItem> */}
          <MenuItem sx={{ fontSize: '1.2rem' }} onClick={(e) => {
            e.preventDefault()
            if (!isexpert) {
              navigate('/expert')
            } else {
              navigate('/expertActivity')
            }
          }}>
            <WorkspacePremiumIcon></WorkspacePremiumIcon>
            Expert
          </MenuItem>
          {/* <MenuItem sx={{ fontSize: '1.2rem' }} onClick={handleClose}>
            <SettingsIcon></SettingsIcon>
            Setting
          </MenuItem> */}
          <MenuItem sx={{ fontSize: '1.2rem' }} onClick={(e) => {
            e.preventDefault()
            navigate('/help')
          }}>
            <HelpIcon></HelpIcon>
            Help
          </MenuItem>
          <MenuItem sx={{ fontSize: '1.2rem' }} onClick={async (e) => {
            e.preventDefault()
            googleLogout();
            try {
              await logOut({});
              localStorage.removeItem('token')
              window.location.reload(false);
            } catch (error) {
              window.alert('Fail to logout, please check network')
            }
            handleClose()
          }}>
            <LogoutIcon></LogoutIcon>
            Logout
          </MenuItem>
        </Menu>
        <Button
          variant="standard"
          className={`${styles.loginbutton} `}
          sx={{ fontSize: '18px' }}
          onClick={(e) => {
            e.preventDefault()
            navigate('/newquestion')
          }}
        >
          Ask question
        </Button>
        <Button
          variant="standard"
          className={`${styles.loginbutton} `}
          sx={{ fontSize: '18px' }}
          onClick={(e) => {
            e.preventDefault()
            navigate('/newguide')
          }}
        >
          Create Guide
        </Button>
      </Box>
    </div>
  );
};
export default Navbar;
