import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000';
// ADMIN AUTH
export const register = (body) =>
  axios.post(`${BASE_URL}/auth/register`, body);
export const signIn = (body) =>
  axios.post(`${BASE_URL}/auth/login`, body);
export const logOut = (body) =>
  axios.post(`${BASE_URL}/auth/logout`, body);
export const guideDetail = (userId, token, number) =>
  axios.get(`${BASE_URL}/article/${number}`, { headers: { user_id: userId, token: token } });
export const fetchDashboard = () =>
  axios.get('actors');
export const newGuide = (body, token, userId) =>
  axios.post(`${BASE_URL}/article`, body, { headers: { user_id: userId, token: token } });
export const thumbUp = (number, token, userId) =>
  axios.patch(`${BASE_URL}/article/${number}/thumb_up`, {}, { headers: { user_id: userId, token: token } });
export const unThumbUp = (number, token, userId) =>
  axios.patch(`${BASE_URL}/article/${number}/un_thumb_up`, {}, { headers: { user_id: userId, token: token } });
export const newQuestion = (body, token, userId) =>
  axios.post(`${BASE_URL}/question`, body, { headers: { user_id: userId, token: token } });
