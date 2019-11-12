<template>
  <div class="evaluation">
    <!-- 评分 -->
    <div class="score">
      <div class="score-left">
        <h2>3.9</h2>
        <p>综合评分</p>
        <p>高于周边商家69.2%</p>
      </div>
      <div class="score-right">
        <p>
          <span>服务态度&emsp;&emsp;</span>
          <Rate
            show-text
            allow-half
            v-model="valueCustomText"
          >
            <span style="color: #f5a623">{{ valueCustomText }}</span>
          </Rate>
        </p>
        <p><span>服务态度 &emsp;&emsp;</span>
          <Rate
            show-text
            allow-half
            v-model="valueCustomText"
          >
            <span style="color: #f5a623">{{ valueCustomText }}</span>
          </Rate>
        </p>
        <p>送达时间 &emsp;&emsp;<span>44分钟</span></p>
      </div>
    </div>

    <!-- 是否满意 -->
    <div class="mood">
      <p class="state"><span class="state1">全部57</span> <span class="state2">满意47</span> <span class="state3">不满意10</span></p>
    </div>

    <!-- n内容 -->
    <div class="content">
      <p class="content-title">
        <Icon
          type="md-checkmark-circle"
          :class="{newicon:flage}"
          @click="clickchegk"
        />只看有内容的评价
      </p>
      <!-- 用户评价 -->
      <div
        :v-show="flage"
        class="userinfo"
        v-for="(iteam,index) in evaluainfo"
        :key="index"
      >
        <!-- 左边图片 -->
        <div class="user-left">
          <img
            :src="iteam.avatar"
            alt=""
          >
        </div>
        <!-- 右边内容 -->
        <div class="user-right">
          <div class="shop-nametime">
            <div class="shopname"> {{iteam.username}}</div>
            <div class="shoptime">{{iteam.rateTime | filterTime}}</div>
          </div>

          <p>
            <Rate
              disabled
              v-model="iteam.score"
            >
              <span style="color: #f5a623;"></span>
            </Rate>
            <span>{{iteam.deliveryTime}}分钟到达</span>
          </p>

          <p>{{iteam.text}}</p>

          <p class="food"><span
              v-for="(it,ind) in iteam.recommend"
              :key="ind"
            >{{it}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import monemt from "moment";
import { getEvaluation } from "../../../api/apis";
export default {
  data() {
    return {
      valueCustomText: 3.5,
      evaluainfo: {},
      flage: false
    };
  },
  methods: {
    //只看有内容的评价
    async clickchegk() {
      this.flage = !this.flage;
      if (this.flage == true) {
        let arr = [];
        this.evaluainfo.forEach(iteam => {
          if (!iteam.text == "") {
            arr.push(iteam);
          }
        });
        this.evaluainfo = arr;
      } else {
        let res = await getEvaluation();
        let evaluainfo = res.data.data;
        this.evaluainfo = evaluainfo;
      }
    }
  },
  async created() {
    let res = await getEvaluation();
    let evaluainfo = res.data.data;
    this.evaluainfo = evaluainfo;
  },
  filters: {
    filterTime(time) {
      return monemt(time).format("YYYY-MM-DD hh:mm:ss");
    }
  }
};
</script>

<style lang="less" scoped>
.newicon {
  color: orange;
}
.ivu-rate {
  font-size: 14px;
}
.evaluation {
  height: 100%;
  background-color: #f4f5f7;
  overflow: auto;

  /* 分数 */
  .score {
    display: flex;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    .score-left {
      border-right: 1px solid #ccc;
      text-align: center;
      padding: 0 10px;
      h2 {
        color: orange;
      }
      p {
        font-size: 12px;
      }
    }
    .score-right {
      font-size: 12px;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  /* 状态 */
  .mood {
    padding: 20px 15px;
    background-color: #fff;
    margin-top: 20px;
    .state {
      border-bottom: 1px solid #ccc;
      padding-bottom: 20px;
      span {
        display: inline-block;
        width: 60px;
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        text-align: center;
      }
      .state1 {
        background-color: #00a0dc;
        color: #fff;
      }
      .state2 {
        background-color: #ccecf7;
      }
      .state3 {
        background-color: #eaebed;
      }
    }
  }
  /* 内容 */
  .content {
    background-color: #fff;
    .content-title {
      display: flex;
      align-items: center;
      padding-left: 20px;
      padding-bottom: 15px;
      font-size: 14px;
      border-bottom: 1px solid #ccc;
      i {
        font-size: 25px;
        margin-right: 10px;
      }
    }

    .userinfo {
      display: flex;
      border-bottom: 1px solid #ccc;
      .user-left {
        flex: 0 0 50px;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-left: 10px;
          margin-top: 10px;
        }
      }
      .user-right {
        flex: 1;
        padding: 10px 10px;
        .shop-nametime {
          display: flex;
          justify-content: space-between;
        }

        .food {
          span {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>