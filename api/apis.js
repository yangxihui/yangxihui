import axios from 'axios'

let IP = 'http://127.0.0.1:3000'

//获取商家信息
export var getShopInfo  = ()=>{
    return axios.get(IP+'/api/seller')
} 

//获取商家信息
export var getGoodsInfo  = ()=>{
    return axios.get(IP+'/api/goods')
} 


//获取评论列表
export var getEvaluation  = ()=>{
    return axios.get(IP+'/api/ratings')
} 
