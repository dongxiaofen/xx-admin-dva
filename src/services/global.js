import axios from 'axios';
import request from '../utils/request';

export const getUserInfo = () => request(axios.get('/api/admin/info'));

export const logout = () => request(axios.delete('/api/admin/logout'));
