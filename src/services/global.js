import axios from 'axios';
import request from '../utils/request';

export function getUserInfo() {
  return request(axios.get('/api/admin/info'))
};

export function logout() {
  return request(axios.delete('/api/admin/logout'))
};
