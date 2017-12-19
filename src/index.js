import dva from 'dva';
// import { message } from 'antd';
import './index.less';
import createLoading from 'dva-loading';
// import { browserHistory } from 'dva/router';
import createHistory from 'history/createBrowserHistory';
// import axios from 'axios';

// 1. Initialize
const app = dva({
  // history: browserHistory,
  ...createLoading({
    effects: true,
  }),
  history: createHistory(),
  // onError: function(error) {
  //   console.log(error, 'error-----');
  //   console.log(error.response, 'error--response---');
  //   // console.log(error.response, 'error.response-----');
  //   message.error(error.message);
  // }
});

// 2. Plugins
// app.use(createLoading({
//     effects: true,
// }));

// app.model(require("./models/login"));

// 3. Model
app.model(require("./models/global"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

// axios.interceptors.response.use((response) => (response), (error) => {
//   if (axios.isCancel(error)) {
//     return Promise.reject(error);
//   }
//   const {response} = error;
//   let msg
//   let statusCode
//
//   if (response && response instanceof Object) {
//     statusCode = response.status;
//     msg = response.data.message || response.statusText;
//
//     if (response.data.errorCode === 401006 || response.data.errorCode === 401007) {
//       console.log('未登录');
//     }
//     if (response.data.errorCode === 401004) {
//       console.log(response, '认证失败');
//       message.error(response.data.message);
//     }
//   } else {
//     statusCode = 600;
//     msg = error.message || 'Network Error';
//   }
//
//   // const
//   const newErr = new Error(message);
//   newErr.response = response;
//   // return Promise.reject(error);
//   // return newErr;
//   // return error;
// });
