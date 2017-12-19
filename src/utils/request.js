import { message } from 'antd';

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
