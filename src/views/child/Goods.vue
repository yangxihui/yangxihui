<template>
  <div class="goods">
    <!-- 左边 -->
    <div
      class="good-left"
      id="box-left"
    >
      <ul class="content">

        <ul class="shoplist">
          <li
            :class="{active : current==index}"
            :key="index"
            v-for="(iteam,index) in goodlist"
            @click="clicktitle(index)"
          >{{iteam.name}}</li>

        </ul>
      </ul>
    </div>
    <!-- 右边 -->
    <div
      class="good-right"
      id="box-right"
    >
      <ul class="content">
        <div
          :key="index"
          :id="index"
          v-for="(iteam,index) in goodlist"
        >

          <h3 class="title">{{iteam.name}}</h3>
          <div
            class="shopconn"
            v-for="(it,v) in iteam.foods"
            :key="v"
          >
            <div class="shopconntent-left">
              <img
                :src="it.image"
                alt=""
              >
            </div>
            <div class="shopconntent-right">
              <h2>{{it.name}}</h2>
              <p>{{it.description}}</p>
              <p><span>月售{{it.sellCount}}份</span> <span>好评率{{it.rating}}%</span></p>
              <div class="computed">
                <div>
                  <span class="newprice">￥{{it.price}}</span> <del>￥{{it.oldPrice}}</del>

                </div>
                <div class="num-box">
                  <span class="reduce" v-show="it.num>0" @click="changeNum(-1,it.name,iteam.name)">-</span> 
                  <span class="num" v-show="it.num>0">{{it.num}}</span>
                   <span class="add" @click="changeNum(1,it.name,iteam.name)">+</span>

                </div>
              </div>
            </div>

          </div>
        </div>
      </ul>

    </div>
  </div>
</template>

<script>
import BSCroll from "better-scroll";

export default {
  data() {
    return {
      
      current: 0
    };
  },
   created() {
    //  this.$store.dispatch('getGood')
      this.$store.dispatch("getGood");
      
  },
  methods: {
    clicktitle(index) {
      this.current = index;
      this.rightbox.scrollToElement(document.getElementById(index), 300);
    },

    //改变数量
    changeNum(num,name,father){
       this.$store.commit({
         type:'changeNum',
         num,
         name,
         father
       })     
    }
  },
  mounted() {
    this.leftbox = new BSCroll("#box-left", { click: true });
    this.rightbox = new BSCroll("#box-right", { click: true, probeType: 3 });
    this.rightbox.on("scroll", ({ y }) => {
      let _y = Math.abs(y);

      for (let obj of this.getHeight) {
        if (_y >= obj.min && _y < obj.max) {
          this.current = obj.index;
          break;
        }
      }
    });
  },
  computed: {
    getHeight() {
      let totol = 0;
      let arr = [];
      this.goodlist.forEach((item, index) => {
        let divheight = document.getElementById(index).offsetHeight;

        arr.push({ min: totol, max: totol + divheight, index: index });
        totol += divheight;
      });
      return arr;
    },
    goodlist(){
     return this.$store.state.goodlist
    }
  }
};
</script>

<style lang="less" >
.goods {
  height: 100%;
  display: flex;
  flex: 1;
  .good-left {
    flex: 0 0 90px;
    height: 100%;
    background-color: #f5f5f5;
    overflow: auto;
    .shoplist {
      li {
        padding: 18px 10px;
      }
      li.active {
        background-color: #fff;
      }
    }
  }
  .good-right {
    flex: 1;
    overflow: auto;
    .title {
      background-color: #f4f5f7;
      line-height: 30px;
      font-weight: normal;
      font-size: 14px;
      text-indent: 20px;
    }
    .shopconn {
      display: flex;
      padding: 15px;
      border-bottom: 2px solid #f2f2f2;

      .shopconntent-left {
        img {
          width: 80px;
          height: 80px;
          margin-right: 10px;
        }
      }
      .shopconntent-right {
        h2 {
          font-size: 16px;
        }

        .computed {
          display: flex;
          justify-content: space-between;
          width: 100%;
          span {
            margin-left: 5px;
          }
          .num-box {
            display: flex;
            .add {
              display: inline-block;
              width: 20px;
              height: 20px;
              background-color: #00a0dc;
              color: #fff;
              border-radius: 50%;
              text-align: center;
            }
            .reduce {
              display: inline-block;
              color: #00a0dc;
              line-height: 20px;
              border: 1px solid #00a0dc;
              width: 20px;
              height: 20px;
              background-color: #fff;
              border-radius: 50%;
              text-align: center;
              margin-right: 0;
            }
          }
          .newprice {
            font-size: 16px;
            color: red;
          }
        }
      }
    }
  }
}
</style>