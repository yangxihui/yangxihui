import Vue from 'vue'
import Vuex from 'vuex'
import { getGoodsInfo } from "../../api/apis"
Vue.use(Vuex)

var store = new Vuex.Store({
    //交互状态
    state: {
        goodlist: [],
        
    },
    //同步改变
    mutations: {
        //清空购物车
        del(state){
           let newarr = store.getters.getShopcarList
           console.log(newarr);
           for(let iteam  of state.goodlist){
            for(let data of iteam.foods){
               data.num=0
            }
           
        }

        },
        //改变商品数组
        getGood(state,obj){
            state.goodlist = obj.shopdata
        },
        //改变数字
        changeNum(state,obj){
            for(let iteam  of state.goodlist){
                for(let data of iteam.foods){
                    if(data.name === obj.name&&obj.father==iteam.name){
                        data.num+=obj.num
                        return
                    }
                }
               
            }
                
        }
    },
    //异步改变
    actions: {
        async getGood({commit}) {
            let res = await getGoodsInfo();
            commit({
                type:'getGood',
                shopdata:res.data.data
            })
           
        }
    },

    //计算属性
    getters: {
       
        getShopcarList(state){
            let arr =[]
            for(let iteam of state.goodlist){
                for(let food of iteam.foods){
                    if(food.num>0){
                        food["father"] = iteam.name
                        arr.push(food)
                    }
                }
            }
            return arr
        }
    }
    

})
console.log(store.state);

export default store
