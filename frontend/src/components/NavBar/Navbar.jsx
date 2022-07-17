import Window from './Window';
import * as React from 'react';
import styles from './App.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ opened, setOpened }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.Navbar}>
      <div className={styles.logo}>
        <img
          width="229"
          height="49"
          viewBox="0 0 229 49"
          fill="none"
          src="https://my.unsw.edu.au/unsw/portallogin/muImages/muProducts/logos/unsw_logo.png"
          onClick={(e) => { e.preventDefault(); navigate(localStorage.getItem('token') ? '/main' : '/') }}

        >
        </img>
      </div>
      <Window opened={opened} setOpened={setOpened}></Window>
    </div>
  );
};
Navbar.propTypes = {
  opened: PropTypes.bool,
  setOpened: PropTypes.func
};
export default Navbar;
