/**
 * Created by rrd on 2017/11/11.
 */
import axios from 'axios'
import qs from 'qs'
import auth from './authenticate'
import {Message, MessageBox, Notification} from 'element-ui'

// const Common = (function (api, axios) {
//   api.ajax = function (options) {
const ajax = (options) => {
    const token = auth.getToken() || '';
    axios.request({
      method: options.method || 'post',
      baseURL: '/api',
      url: options.url,
      headers: {
        'Content-Type': options.contentType || 'application/json',
        // 'Content-Type': options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
        // 'usertoken': token
        //  'Accept': options.accept || 'application/json, text/plain, */*',
      },
      params: options.params,
      data: options.data || {} ,
      transformRequest: options.isFormData ? [function (data) {
        // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，
        // 这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
        data = qs.stringify(data);
        return data;
      }] : [],
      // paramsSerializer: function(params) {
      //   console.log(params);
      //   return qs.stringify(params)
      // },
      timeout: options.timeout || 30 * 1000
    }).then(function (response) {
      let responseData = response.data;
      //兼容字符串0 和数字0
      if (responseData.status != 0) {
        if (responseData.status === '10111006' || responseData.status === '10111000' || responseData.status === '10111008' ) {
          // token失效
          let message =responseData.message || '登录已失效，请重新登录';
          auth.logout();
          MessageBox.alert(message, '警告', {
            confirmButtonText: '确定',
          }).then(action => {
              location.href = '/login';
          });
        }else if (responseData.status === '10111003' || responseData.status === '10111004'|| responseData.status === '10111005'|| responseData.status === '10111006') {
          Message.warning({
            message: responseData.message
          });
        } else if (options.error) {
          options.error(responseData);
        } else {
          Message.warning({
            message: responseData.message,
          });
        }

      } else {
        options.success && options.success(responseData);
      }

      options.complete && options.complete(responseData);
    }).catch(function (error) {
      console.log(error.response);
      console.log(error);
      options.error && options.error(error)
    });
  }
  // return api;
// })(Common || {}, axios);
// export default Common

export default ajax
