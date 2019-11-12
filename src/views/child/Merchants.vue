<template>
  <div class="merchant">

    <!-- 信息 -->
    <div class="shop-top">
      <div class="shop-name">
        <div class="shop-name-left">
          <h2>{{shopInfo.name}}</h2>
          <p>
            <Rate v-model="valueText" />
            (661) <span>月售390单</span>
          </p>
        </div>

        <div class="shop-name-right">
          <Icon type="md-heart" />
          <p>已收藏</p>
        </div>

        <div>

        </div>
      </div>
    </div>

    <!-- 时间和价钱 -->

    <div class="timandprice">
      <div class="startprice">
        <span>起送价</span>
        <p>{{shopInfo.minPrice}}元</p>
      </div>
      <div class="merchprice">
        <span>配送费</span>
        <p>{{shopInfo.deliveryPrice}}元</p>
      </div>
      <div class="avergetime">
        <span>平均配送时间</span>
        <p>40分钟</p>
      </div>

    </div>

    <!-- 活动与公告 -->
    <div class="activeandmeaaage">
      <h4 class="activeandmeaaage-title">公告与活动</h4>
      <p class="activeandmeaaage-content">{{shopInfo.bulletin}}</p>
      <ul>
        <li
          v-for="(iteam,index) in shopInfo.supports"
          :key="index"
        >
          <img
            :src="iteam.type | filterPicture"
            alt=""
          > {{iteam.description}}</li>
      </ul>
    </div>

    <!-- 商家实景 -->
    <div class="merchapicture">
      <h3>商家实景</h3>
      <div class="picture">
        <div
          v-for="(iteam,index) in shopInfo.pics"
          :key="index"
        >
          <img
            :src="iteam"
            alt=""
          >
        </div>

      </div>
    </div>

    <!-- 商家信息 -->

    <div class="merchinfo">
      <h3>商家信息</h3>
      <p
        v-for="(iteam,index) in shopInfo.infos"
        :key="index"
      >{{iteam}}</p>

    </div>
  </div>
</template>

<script>
import { getShopInfo } from "../../../api/apis";
export default {
  data() {
    return {
      valueText: 4,
      shopInfo: []
    };
  },

  async created() {
    let res = await getShopInfo();
    this.shopInfo = res.data.data;
  },
  computed: {
  
  },
  filters: {
    filterPicture(type) {
      if (type == 0) {
        return require("../../assets/img/decrease_3@3x.png");
      } else if (type == 1) {
        return require("../../assets/img/discount_3@3x.png");
      } else {
        return require("../../assets/img/special_3@2x.png");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.merchant {
  background-color: #f4f5f7;
  height: 100%;
  overflow: auto;
  .ivu-rate {
    font-size: 16px;
  }
  /* 上面信息部分 */
  .shop-top {
    background-color: #fff;
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    .shop-name {
      display: flex;
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      .shop-name-left {
        flex: 1;
        h2 {
          font-size: 16px;
        }
      }
      .shop-name-right {
        flex: 0 0 80px;
        // margin-left: 50px;
        .ivu-icon {
          color: red;
          margin-left: 15px;
        }
      }
    }
  }

  /* 中间的价钱和送达时间 */

  .timandprice {
    background-color: #fff;
    border-bottom: 2px solid #ccc;
    display: flex;
    justify-content: space-around;
    padding: 20px 10px;
    p {
      font-size: 18px;
    }
    span {
      font-size: 12px;
    }
    .startprice {
      padding-right: 40px;
      text-align: center;
      line-height: 24px;
      border-right: 1px solid #ccc;
    }
    .merchprice {
      padding-right: 40px;
      text-align: center;
      line-height: 24px;
      border-right: 1px solid #ccc;
    }
  }

  /* 活动与公告 */
  .activeandmeaaage {
    padding: 10px 20px;
    background-color: #fff;
    margin-top: 20px;
    border-top: 1px solid #ccc;
    .activeandmeaaage-title {
      line-height: 24px;
    }
    .activeandmeaaage-content {
      margin-left: 15px;
      line-height: 24px;
      color: red;
      font-size: 12px;
    }
    ul {
      li {
        margin-left: 15px;
        list-style: none;
        line-height: 42px;
        font-size: 12px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        img {
          width: 18px;
          height: 18px;
          margin-right: 10px;
        }
      }
    }
  }

  /* 商家实景 */
  .merchapicture {
    padding-left: 20px;
    background-color: #fff;
    margin-top: 20px;
    h3 {
      line-height: 30px;
    }
    .picture {
      display: flex;
      overflow: auto;
      padding: 10px 0px;
      img {
        width: 120px;
        height: 80px;
        margin-right: 10px;
      }
    }
  }

  /* 商家信息 */
  .merchinfo {
    padding: 15px 20px;
    background-color: #fff;
    margin-top: 20px;
    h3 {
      line-height: 40px;
      border-bottom: 1px solid #ccc;
    }
    p {
      padding-left: 12px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>