import axios from 'axios';
import request from '../utils/request';

export const login = param => request(axios.post('/api/admin/login', param));

// export function logout() {
//   console.log('logout');
// };
