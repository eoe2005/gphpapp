import axios from "axios";
import router from "@/router";
// import Vue from "vue";
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.log("request", config);
    config.headers["Content-Type"] = "multipart/form-data";
    // config.url = "http://admin.nysxb.com:8080" + config.url;
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log("respose", response);
    if (response.status == 200) {
      if (response.data.code == 302) {
        router.replace("/login");
      }
      return response.data;
    }
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log("resp err", error);
    return Promise.reject(error);
  }
);
const req = {
  install(app) {
    app.prototype.$post = this.post;
  },
  async post(url, data) {
    return await axios.post(url, data);
  },
};

export default req;
