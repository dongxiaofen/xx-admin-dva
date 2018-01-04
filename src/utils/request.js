import { message, Modal } from 'antd';
// import { routerRedux } from 'dva/router';
let outTime;
let errAlert;
export default async function request(axios) {
  return await axios
        .then(response => Promise.resolve({
          success: true,
          ...response
        }))
        .catch((error) => {
          const { response } = error;
          // console.log(response, 'response');

          if (response.data.errorCode === 401004) {
            if (!errAlert) {
              errAlert = message.error(`${response.data.message},请确认用户名和密码`, 3, () =>{errAlert = null});
            }
          } else if (window.location.pathname !== '/login' && response.data.errorCode === 401006) {
            window.localStorage.setItem('sessionOutUrl', window.location.pathname + window.location.search);
            if (!outTime) {
              outTime = Modal.warning({
                title: '登录超时',
                content: '登录超时,请重新登录...',
                onOk() {
                  // dispatch(routerRedux.push('/login'));
                  outTime = null;
                  window.location = '/login';
                }
              });
            }
          } else if (error.response.status === 502) {
            if (!errAlert) {
              errAlert = message.error('正在部署,请稍后', 3, () =>{errAlert = null});
            }
          } else if (error.response.status === 504) {
            if (!errAlert) {
              errAlert = message.error('网络链接超时', 3, () =>{errAlert = null});
            }
          } else if (error.response.status === 500) {
            if (!errAlert) {
              errAlert = message.error('服务器故障,请稍后', 3, () =>{errAlert = null});
            }
          } else if (error.response.data.errors) {
            if (!errAlert) {
              errAlert = message.error(error.response.data.errors[0].message, 3, () =>{errAlert = null});
            }
          } else {
            if (!errAlert) {
              errAlert = message.error(response.data.message, 3, () =>{errAlert = null});
            }
          }

          return {
            success: false,
            ...response
          };
        });
}
