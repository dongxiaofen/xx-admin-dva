import axios from 'axios';
import request from '../utils/request';

export const login = (param) => {
  return request(axios.post('/api/admin/login', param));
  // console.log(param, 'param');
};

// export function logout() {
//   console.log('logout');
// };
