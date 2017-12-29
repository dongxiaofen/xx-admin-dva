import axios from 'axios';
import request from '../utils/request';

export const getUserInfo = () => {
  return request(axios.get('/api/admin/info'));
};

export const logout = () => {
  return request(axios.delete('/api/admin/logout'));
};
