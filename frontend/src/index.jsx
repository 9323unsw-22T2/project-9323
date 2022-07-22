import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2398735135051938"
     crossOrigin="anonymous"></script>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
  window.localStorage.removeItem('expert'),

  window.localStorage.setItem('data', JSON.stringify([
    {
      id: 1,
      title: 'ESLint with React gives `no-unused-vars` errors',
      qes: "I've setup eslint & eslint-plugin-react When I run ESLint, the linter returns no-unused-vars errors for each React component. I'm assuming it's not recognizing that I'm using JSX or React syntax. Any ideas?",
      ans: 'First, install the following module npm install --save-dev eslint-plugin-react. Then, in your .eslintrc.json, under extends, include the following plugin:\'extends\': [\'plugin:react/recommended\']',
      commentID: '2',
      photoURL: 'https://i.postimg.cc/xC7fp7LN/1.jpg',
      score: 10,
      time: '2022/02/31 19:49:03'
    },
    {
      id: 2,
      title: 'Why is java var type variables not working?',
      qes: 'I declared var type variable however the program throws compilation error. Can someone suggest the reason for this error?',
      ans: 'The output from the java -version command you posted above indicates you are using Java 8. var was only introduced in to the language at java 10. If you want to use var you need to install a more recent version of Java - Java 10 or above. This is an include file. It gets literally copy-pasted on your sources. On top of that, the compiler could notify the error around the wrong line, but it could be before or after the one which is actually wrong. Check your sources that include such header, you must miss a semicolon there, or another typo. You should not look into the header. ',
      photoURL: 'https://i.postimg.cc/BvP4Lprq/2.jpg',
      score: 3,
      time: '2022/03/11 10:49:03'
    },
    {
      id: 3,
      title: 'How can I fix this problem with bulding project at Vitis?',
      qes: "I'm trying to build a project with vitis using the library xuartps.h but I can't because of this error code screenchot. I don't know why this happens. Could you help me please?",
      ans: '',
      photoURL: '',
      score: 20,
      time: '2022/01/11 12:49:03'
    },
    {
      id: 4,
      title: 'C++ set slower than Java TreeSet?',
      qes: 'I was working on leetcode problem 792. Number of Matching Subsequences, and one of the initial solutions I came up with was to create a list of ordered sets. Then we can determine if a word is a subsequence of string s by trying to find the ceiling of the next available character of string word using the current index we are in of s. If we can reach the end of word, it is then a subsequence, otherwise, it is not.',
      ans: '',
      photoURL: '',
      score: 3,
      time: '2022/01/11 12:49:03'
    },
    {
      id: 5,
      title: 'How can I fix this problem with bulding project at Vitis?',
      qes: "I'm trying to build a project with vitis using the library xuartps.h but I can't because of this error code screenchot. I don't know why this happens. Could you help me please?",
      ans: '',
      photoURL: '',
      score: 10,
      time: '2022/01/11 12:49:03'
    },
  ]))
);
