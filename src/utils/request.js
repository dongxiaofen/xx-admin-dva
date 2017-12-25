import { message, Modal } from 'antd';
import { routerRedux } from 'dva/router';

export default async function request (axios) {
  return await axios
        .then((response) => {
          return Promise.resolve({
            success: true,
            ...response
          });
        })
        .catch((error) => {
          const {response} = error;
          console.log(response, 'response');

          if (response.data.errorCode === 401004) {
            message.error(response.data.message + ',请确认用户名和密码');
          }

          if (response.data.errorCode === 401006) {
            Modal.warning({
              title: '登录超时',
              content: '登录超时,请重新登录...',
              onOk() {
                // dispatch(routerRedux.push('/login'));
                window.location = '/login';
              }
            });
          }

          // const errorData = new Error(response.status, response.statusText);
          // errorData.response = response;
          // // throw errorData;
          // return Promise.reject(errorData);

          // return Promise.reject({
          //   success: false,
          //   message: 'err happen',
          //   ...response
          // });

          return {
            success: false,
            ...response
          };
        })
}
