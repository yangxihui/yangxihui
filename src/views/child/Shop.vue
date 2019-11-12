<template>
  <div class="shopCar">
    <div class="shopcar-title">
      <div>1好口袋</div>
      <div @click="delshop">清空购物车</div>
    </div>

    <div
      class="shopcar-conn"
      v-for="(item,index) in goodlist"
      :key="index"
    >
      <div class="shop-car-img">
        <img
          :src="item.icon"
          alt=""
        >
        <p class="shop-carname"> {{item.name}}</p>
      </div>

      <div class="shop-carbutton">
        <button @click="changeNum(-1,item.name,item.father)">-</button>
        <label>{{item.num}}</label>
        <button @click="changeNum(1,item.name,item.father)">+</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeNum(num, name,father) {
      console.log(this.goodlist);
      
      this.$store.commit({
        type: "changeNum",
        num,
        name,
        father
      });
    },
    delshop(){
      this.$store.commit({
        type:'del'
      })
    }
  },
  computed: {
    goodlist() {
      return this.$store.getters.getShopcarList;
    }
  }
};
</script>

<style lang="less" scoped>
.shopCar {
  display: flex;
  flex-direction: column;
   max-height: 200px;
    overflow: auto;
  .shopcar-title {
    display: flex;
    padding: 10px 15px;
    justify-content: space-between;
    border-bottom: 1px solid #fff;
  }
  .shopcar-conn {
   
    display: flex;
    justify-content: space-between;
    padding: 15px 15px;
    align-items: center;
    .shop-car-img {
      display: flex;
      img {
        width: 50px;
        height: 50px;
      }
      p {
        line-height: 50px;
        padding-left: 20px;
      }
    }
    .shop-carbutton {
      button {
        border-radius: 50%;
        width: 20px;
        height: 20px;
        border: none;
        background-color: #fff;
      }
      label {
        padding: 0 10px;
      }
    }
  }
}
</style>