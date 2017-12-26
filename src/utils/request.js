import { message, Modal } from 'antd';
// import { routerRedux } from 'dva/router';

export default async function request(axios) {
  return await axios
        .then((response) => {
          return Promise.resolve({
            success: true,
            ...response
          });
        })
        .catch((error) => {
          const {response} = error;
          // console.log(response, 'response');

          if (response.data.errorCode === 401004) {
            message.error(response.data.message + ',请确认用户名和密码');
          } else if (window.location.pathname !== '/login' && response.data.errorCode === 401006) {
            window.localStorage.setItem('sessionOutUrl', window.location.pathname + window.location.search);
            Modal.warning({
              title: '登录超时',
              content: '登录超时,请重新登录...',
              onOk() {
                // dispatch(routerRedux.push('/login'));
                window.location = '/login';
              }
            });
          } else if (error.response.status === 502) {
            message.error('正在部署,请稍后');
          } else if (error.response.status === 504) {
            message.error('网络链接超时');
          } else if (error.response.status === 500) {
            message.error('服务器故障,请稍后');
          } else {
            if (error.response.data.errors) {
              message.error(error.response.data.errors[0].message);
            } else {
              message.error(response.data.message);
            }
          }

          return {
            success: false,
            ...response
          };
        });
}
