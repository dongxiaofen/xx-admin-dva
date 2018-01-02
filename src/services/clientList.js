import axios from 'axios';
import request from '../utils/request';

export const getClientList = params => request(axios.get('/api/admin/user/page', params));

export const getRoleType = () => request(axios.get('/api/admin/user/roleType'));
