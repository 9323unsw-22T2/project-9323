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
export const deleteGuide = (number, token, userId) =>
  axios.delete(`${BASE_URL}/article/${number}`, { headers: { user_id: userId, token: token } });
export const thumbUp = (number, token, userId) =>
  axios.patch(`${BASE_URL}/article/${number}/thumb_up`, {}, { headers: { user_id: userId, token: token } });
export const unThumbUp = (number, token, userId) =>
  axios.patch(`${BASE_URL}/article/${number}/un_thumb_up`, {}, { headers: { user_id: userId, token: token } });
export const newQuestion = (body, token, userId) =>
  axios.post(`${BASE_URL}/questions/add`, body, { headers: { user_id: userId, token: token } });
export const newArticleComment = (body, token, userId, number) =>
  axios.post(`${BASE_URL}/comment/articles/${number}`, body, { headers: { user_id: userId, token: token } });
export const getArticleComments = (userId, token, number) =>
  axios.get(`${BASE_URL}/comment/articles/${number}`, { headers: { user_id: userId, token: token } });
export const newQuestionComment = (body, token, userId, number) =>
  axios.post(`${BASE_URL}/comment/questions/${number}`, body, { headers: { user_id: userId, token: token } });
export const deleteQuestionComment = (number, token, userId) =>
  axios.delete(`${BASE_URL}/comment/${number}/delete`, { headers: { user_id: userId, token: token } });
export const getQuestionComments = (userId, token, number) =>
  axios.get(`${BASE_URL}/comment/questions/${number}`, { headers: { user_id: userId, token: token } });
export const questionDetail = (userId, token, number) =>
  axios.get(`${BASE_URL}/questions/${number}`, { headers: { user_id: userId, token: token } });
export const getNewsFeed = (number) =>
  axios.get(`${BASE_URL}/newsfeed/${number}`);

export const commentLike = (number, token, userId) =>
  axios.patch(`${BASE_URL}/comment/${number}/thumb_up`, {}, { headers: { user_id: userId, token: token } });
export const commentDislike = (number, token, userId) =>
  axios.patch(`${BASE_URL}/comment/${number}/un_thumb_up`, {}, { headers: { user_id: userId, token: token } });

export const answerhistory = (token, userId) =>
  axios.get(`${BASE_URL}/expert/answer_history`, { headers: { user_id: userId, token: token } });
export const isExpert = (token, userId) =>
  axios.get(`${BASE_URL}/become_expert`, { headers: { user_id: userId, token: token } });
export const getScore = (token, userId) =>
  axios.get(`${BASE_URL}/auth/info`, { headers: { user_id: userId, token: token } });
export const expertCertificate = (body, token, userId) =>
  axios.post(`${BASE_URL}/auth/expert_by_certificate`, body, { headers: { user_id: userId, token: token } });
