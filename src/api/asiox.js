import axios from "axios";
import config from "@/config";

const baseUrl = process.env.NODE_ENV === 'dvevlopment' ? config.baseUrl.dev : config.baseUrl.pro

class HTTPRequrest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }
    getInsideconfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }
    interceptors(instance) {
        instance.interceptors.request.use(function(config) {
            // 在发送请求之前做些什么
            return config;
        }, function(error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function(response) {
            console.log(response, 'response');
            // 对响应数据做点什么
            return response;
        }, function(error) {
            console.log(error, 'error');
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    request(option) {
        const instance = axios.create()
        option = {...this.getInsideconfig(), ...option }
        this.interceptors(instance)
        return instance(option)
    }
}
export default new HTTPRequrest(baseUrl)