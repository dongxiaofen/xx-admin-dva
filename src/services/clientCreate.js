import axios from 'axios';
import request from '../utils/request';

export const getRoleType = () => request(axios.get('/api/admin/user/roleType'));
