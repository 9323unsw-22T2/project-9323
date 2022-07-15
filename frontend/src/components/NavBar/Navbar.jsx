import Window from './Window';
import * as React from 'react';
import styles from './App.module.css';

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <div className={styles.logo}>
        <svg
          width="229"
          height="49"
          viewBox="0 0 229 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
        </svg>
      </div>
      <Window></Window>
    </div>
  );
};
export default Navbar;
