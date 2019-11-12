<template>
  <div class="home">
    <!-- 头部 -->
    <div class="header">
      <div class="header-top">

        <!-- 左边 -->
        <div class="left">
          <div>
            <img
              :src="shopinfo.avatar"
              alt=""
              class="shopimg"
            >
          </div>
          <div class="text">
            <h3><span class="logo"><img
                  src="../assets/img/brand@2x.png"
                  alt=""
                ></span> {{shopinfo.name}}</h3>
            <p> {{shopinfo.description}} /{{shopinfo.deliveryTime}} 分钟送达</p>
            <p class="supports"><span
                :key="index"
                v-for="(iteam,index) in shopinfo.supports"
              >{{iteam.description}}</span></p>
          </div>
        </div>
        <!-- 右边 -->
        <div class="right">
          <span>5个 ></span>
        </div>
      </div>

      <!-- 底部 -->
      <div class="header-bottom">
        <p> <span><img
              src="../assets/img/bulletin@2x.png"
              alt=""
            ></span> {{shopinfo.bulletin}}</p>
      </div>
    </div>

    <!-- 导航 -->
    <div class="nav">
      <router-link
        to="/"
        :class="{active:$route.path=='/'}"
        @click="changecheck('/')"
      >商品</router-link>
      <router-link
        to="/evaluation"
        :class="{active:$route.path=='/evaluation'}"
        @click="changecheck('/evaluation')"
      >评价</router-link>
      <router-link
        to="/merchants"
        :class="{active:$route.path=='/merchants'}"
        @click="changecheck('/merchants')"
      >商家</router-link>
    </div>

    <!-- 内容 -->
    <div class="conntent">
      <router-view></router-view>
    </div>

    <transition name="slide-fade">
      <div
        v-show="flag"
        class="shop-car-cont"
      >

        <Shop></Shop>
      </div>
    </transition>

    <!-- gouwuche -->
    <div
      @click="ifshow"
      class="shopCarBar"
    >
     
      <img :src="imgurl" class="carIcon" alt="">
      <span v-if="this.$store.getters.getShopcarList.length>0" class="shopCarBar-num">{{changeTotalnum}}</span>
      <p><span class="price">￥{{changeTotal}}</span>
        <span class="transPrice">另需配送费￥4元</span></p>
      <p class="minPrice" v-show="price>0">￥20起送 还差{{price}}</p>
      <p :class="{minPrice1:price<=0}" v-show="price<=0">去结算</p>
    </div>
  </div>
</template>

<script>
import Shop from "./child/Shop";
import { getShopInfo } from "../../api/apis";
export default {
  components: {
    Shop
  },
  data() {
    return {
      currentpath: "/",
      shopinfo: {},
      flag: false,
     
    };
  },
  methods: {
    changecheck(path) {
      // console.log(path);

      this.currentpath = path;
    },
    ifshow() {
      this.flag = !this.flag;
    }
  },

  computed: {

    //价钱
    price(){
      let prices= 0;
      prices = 20-this.changeTotal
      return prices
    },
    //改变图片
    imgurl(){
      if(this.$store.getters.getShopcarList.length>0){
        return require('../assets/imgs/购物车空.png')
      }
      else{
        return require('../assets/imgs/购物车空 (1).png')
      }
    },

    //改变总价
    changeTotal(){
      let total = 0
      
      for(let item of this.$store.getters.getShopcarList){
        total+=item.num*item.price+4
      }
      return total
    },

    //改变数量
     changeTotalnum(){
      let totalnum = 0
      
      for(let item of this.$store.getters.getShopcarList){
        totalnum+=item.num
      }
      return totalnum
    }
  },

  async created() {
    let res = await getShopInfo();
    let shopinfo = res.data.data;
    this.shopinfo = shopinfo;
    // console.log(this.shopinfo);
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    .header-top {
      display: flex;
      justify-content: space-between;
      padding: 15px;
      background-color: #463f39;
      color: #fff;
      .left {
        display: flex;
        flex: 10;
        .shopimg {
          width: 80px;
          height: 80px;
          margin-right: 15px;
        }
        .text {
          line-height: 25px;
          .supports {
            width: 210px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          h3 {
            .logo {
              img {
                width: 30px;
                height: 20px;
              }
            }
          }
        }
      }
      .right {
        flex: 1;
        span {
          display: inline-block;
          width: 40px;
          height: 20px;
          background-color: #000;
          text-align: center;
          border-radius: 10px;
        }
      }
    }
    .header-bottom {
      border-bottom: 1px solid #ccc;
      background-color: #463f39;
      color: #fff;
      font-size: 12px;
      padding: 5px 10px;
      opacity: 0.7;
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 25px;
        img {
          width: 30px;
          vertical-align: middle;
        }
      }
    }
  }
  .nav {
    display: flex;
    justify-content: space-around;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    a {
      color: #000;
    }
    a.active {
      color: red;
    }
  }
  .conntent {
    height: 100%;
  }
  .shop-car-cont {
    position: fixed;
    width: 100%;
    bottom: 50px;
    background-color: #ccc;
  }
  .shopCarBar {
    background: #141c27;
    display: flex;
    justify-content: space-between;
    position: relative;
    .carIcon {
      background: #2b343b;
      width: 50px;
      height: 50px;
      border: 6px solid #141c27;
      border-radius: 50%;
      text-align: center;
      position: absolute;
      left: 20px;
      top: -10px;
    }
    .shopCarBar-num{
      display: inline-flex;
      width: 20px;height: 20px;
      background-color: red;;
      border-radius: 50%;
      position: absolute;
      left: 60px;
      top: -19px;
      color: #fff;
      border: 1px solid #fff;
      display: flex;
      justify-content: center;
    }
    .price {
      font-size: 20px;
      line-height: 50px;
      padding-right: 10px;
      border-right: 1px solid #333;
      margin-left: 70px;
    }
    .transPrice {
      font-size: 14px;
      line-height: 50px;
      margin-left: 10px;
    }
    .minPrice {
      width: 130px;
      background: #2b343b;
      text-align: center;
      line-height: 50px;
    }
    .minPrice1 {
      width: 110px;
      background: #2b343b;
      text-align: center;
      line-height: 50px;
      background-color: orange;
      color: #fff;
    }
  }

  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.5s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(100px);
    opacity: 0;
  }
}
</style>