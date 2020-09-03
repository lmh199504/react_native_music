import axios from 'axios'
import { Toast } from '@ant-design/react-native'
const ConfigBaseURL = 'http://192.168.3.3:3200'
const Service = axios.create({
    timeout: 10000, // 请求超时时间
    baseURL: ConfigBaseURL,
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 添加请求拦截器
Service.interceptors.request.use(config => {

	return config
    
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
	try{
		// if(response.data.code !== 0 && response.data.data.code !== 0){
		//     message.error(response.data.msg)
		// }
		
		if(response.data.code === 10000){
			Toast.fail(response.data.msg)
		}
	}catch(e){
		
	}
    return response.data
}, error => {
    const msg = error.Message !== undefined ? error.Message : '请求错误.'
    Toast.fail(msg)
    return Promise.reject(error)
})

const request = (url,data={},type="POST") => {
    if(type === 'GET'){
        return Service.get(url,{params:data})
    }else{
        return Service.post(url,data)
    }
}

export default request

