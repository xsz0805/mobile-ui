import  axios from 'axios'

const request = axios.create({
    //baseURL: 'http://ttapi.research.itcast.cn/app',
    // baseURL: 'http://112233.com/',
    //baseURL: 'app/',
    // transformResponse 允许自定义原始的响应数据（字符串）
    
    //  所有相应的数据就不会存在大数字问题了
//    transformResponse: [function (data) {
//      try {
//        // 如果转换成功则返回转换的数据结果
//        return jsonBig.parse(data)
//      } catch (err) {
//        // 如果转换失败，则包装为统一数据格式并返回
//        return {
//          data
//        }
//      }
//    }]
 
   //baseURL: "http://toutiao-app.itheima.net"
 });

 // 添加请求拦截器
request.interceptors.request.use(
    function(config) {
      // 在发送请求之前做些什么
      //console.log(config, 9999);
      // if (window.localStorage.getItem('SET_TOKEN')) {
      //     config.headers.Authorization = 'Bearer ' + JSON.parse(window.localStorage.getItem('SET_TOKEN')).token
      // }
  
    //   if (store.state.user) {
    //     config.headers.Authorization = "Bearer " + store.state.user.token;
    //   }
      return config;
    },
    function(error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
request.interceptors.response.use(
    function(response) {
      // 对响应数据做点什么
      return response;
    },
    function(error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
  
  export default request;