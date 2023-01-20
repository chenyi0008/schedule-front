import axios from "axios";
const service = axios.create({
  baseURL: "http://113.125.103.168:8085/", // url = base url + request url
  timeout: 5000, // request timeout
});

// respone拦截器
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 在status不正确的情况下，判别status状态码给出对应响应
    if (error.response) {
      console.log("在respone拦截器检查到错误：");
      switch (error.response.status) {
        case 204:
          error.response.data.error = "204:No Content（没有内容）";
          break;
        case 401:
          location.reload(); // 刷新页面，触发路由守卫
          error.response.data.error = "401:Unauthorized（未经授权）";
          break;
        case 403:
          error.response.data.error = "403:Forbidden（被禁止的）";
          break;
        case 500:
          error.response.data.error = "500:服务器内部错误";
          break;
        default:
          return error;
      }
      return Promise.reject(error.response.data.error);
    }

    return Promise.reject(error);
  }
);

export default service;
