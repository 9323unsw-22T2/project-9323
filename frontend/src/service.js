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
export const deleteQuestion = (number, token, userId) =>
  axios.delete(`${BASE_URL}/questions/${number}`, { headers: { user_id: userId, token: token } });
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
export const getLikedQuestions = (number, userId, token) =>
  axios.get(`${BASE_URL}/questions_like/${number}`, { headers: { user_id: userId, token: token } });
export const getLikedArticles = (number, userId, token) =>
  axios.get(`${BASE_URL}/articles_like/${number}`, { headers: { user_id: userId, token: token } });

export const commentLike = (number, token, userId) =>
  axios.patch(`${BASE_URL}/comment/${number}/thumb_up`, {}, { headers: { user_id: userId, token: token } });
export const commentDislike = (number, token, userId) =>
  axios.patch(`${BASE_URL}/comment/${number}/un_thumb_up`, {}, { headers: { user_id: userId, token: token } });
export const commentUnThumbdown = (number, token, userId) =>
  axios.patch(`${BASE_URL}/comment/${number}/un_thumb_down`, {}, { headers: { user_id: userId, token: token } });
export const commentThumbdown = (number, token, userId) =>
  axios.patch(`${BASE_URL}/comment/${number}/thumb_down`, {}, { headers: { user_id: userId, token: token } });

export const questionLike = (number, token, userId) =>
  axios.patch(`${BASE_URL}/questions/${number}/like`, {}, { headers: { user_id: userId, token: token } });
export const questionDislike = (number, token, userId) =>
  axios.patch(`${BASE_URL}/questions/${number}/dislike`, {}, { headers: { user_id: userId, token: token } });
export const articleLike = (number, token, userId) =>
  axios.patch(`${BASE_URL}/article/${number}/thumb_up`, {}, { headers: { user_id: userId, token: token } });
export const articleDislike = (number, token, userId) =>
  axios.patch(`${BASE_URL}/article/${number}/un_thumb_up`, {}, { headers: { user_id: userId, token: token } });
export const getTrend = () =>
  axios.get(`${BASE_URL}/newsfeed/trending`);

export const answerhistory = (token, userId) =>
  axios.get(`${BASE_URL}/expert/answer_history`, { headers: { user_id: userId, token: token } });
export const isExpert = (token, userId) =>
  axios.get(`${BASE_URL}/become_expert`, { headers: { user_id: userId, token: token } });
export const getScore = (token, userId) =>
  axios.get(`${BASE_URL}/auth/info`, { headers: { user_id: userId, token: token } });
export const expertCertificate = (body, token, userId) =>
  axios.post(`${BASE_URL}/auth/expert_by_certificate`, body, { headers: { user_id: userId, token: token } });
export const expertChangeAns = (Qid, body, token, userId) =>
  axios.post(`${BASE_URL}/expert/${Qid}/update`, body, { headers: { user_id: userId, token: token } });
export const sendMessages = (body, token, userId) =>
  axios.post(`${BASE_URL}/message/send`, body, { headers: { user_id: userId, token: token } });
export const deleteMessages = (body, token, userId) =>
  axios.post(`${BASE_URL}/message/delete`, body, { headers: { user_id: userId, token: token } });
export const getOneMessages = (user, token, userId) =>
  axios.post(`${BASE_URL}/message/get_one`, { target_user: user }, { headers: { user_id: userId, token: token } });
export const getAllMessages = (token, userId) =>
  axios.get(`${BASE_URL}/message/get_all`, { headers: { user_id: userId, token: token } });
export const getInfo = (token, userId) =>
  axios.get(`${BASE_URL}/auth/info`, { headers: { user_id: userId, token: token } });
export const postInfo = (body, token, userId) =>
  axios.post(`${BASE_URL}/auth/info`, body, { headers: { user_id: userId, token: token } });
export const buyComment = (number, token, userId) =>
  axios.post(`${BASE_URL}/comment/${number}/buy`, {}, { headers: { user_id: userId, token: token } });
export const getLeader = () =>
  axios.get(`${BASE_URL}/newsfeed/leaderboard`);
