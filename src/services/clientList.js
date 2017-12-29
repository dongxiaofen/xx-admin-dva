import axios from 'axios';
import request from '../utils/request';

export const getClientList = () => {
  return request(axios.get('/api/admin/user/page'));
};
