import React from 'react';
import PropTypes from 'prop-types';
import styles from './App.module.css';

chatbot.propTypes = {
  data: PropTypes.string,
}
export default function chatbot ({ data }) {
  return (
    <div className={styles.full} id='aaa'>
  <img style={{ width: '80%' }}src={data}></img>
  </div>
  )
}
