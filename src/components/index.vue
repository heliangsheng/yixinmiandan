<template>
  <div class="content">
    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item id="1">
        <span class="tabbar"><span class="iconfont icon-chongzhi"></span>充值</span>
      </mt-tab-item>
      <mt-tab-item id="2">
        <span class="tabaward">奖</span>
      </mt-tab-item>
      <mt-tab-item id="3">
        <span class="tabbar"><span class="iconfont icon-gerenzhongxin"></span>个人中心</span>
      </mt-tab-item>
    </mt-tabbar>
    <mt-tab-container v-model="selected" class="container">
      <mt-tab-container-item id="1">
        <div class="charge containerBox">
          <mt-field label="充值金额:" placeholder="请输入充值金额" type="number" v-model="chargeMoney"></mt-field>
          <div class="chargeConfirm">
            <mt-button type="danger" style="width:80%" @click.native="charge">充值</mt-button>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="award">
          
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="self">
          333
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      chargeMoney: '',
      selected: '2'
    }
  },
  methods: {
    charge() {
      console.log('charge')
    }
  }
}
</script>

<style>
  #app .mint-tab-item {
    padding: 0;
  }
  .content {
    position:relative;
    width:100%;
    height:100%;
  }
  .container{
    height:calc(100% - 48px);
    background-color: #fff;
  }
  .containerBox{
    height:100%;
    background-color:#ffff;
    background-position: left top;
    background-size: cover;
    padding-top:100px;
  }
  .charge {
    background-image: url('/static/img/chargebg.jpg');
  }
  .award {
    background-image: url('/static/img/awardbg.jpg');
  }
  .self{
    background-image: url('/static/img/selfbg.jpg');
  }
  .charge .mint-cell{
    padding: 0 30px;
    background: transparent;
    color: #fff;
  }
  .charge .mint-cell .mint-cell-title{
    text-align: center;
  }
  .charge .mint-cell .mint-field-core {
    text-indent: 6px;
    border-radius: 3px;
  }
  .chargeConfirm {
    text-align: center;
    padding-top: 50px;
  }
  #app .mint-tabbar > .mint-tab-item.is-selected {
    background-color: #fff;
  }
  #app .mint-tabbar > .mint-tab-item.is-selected .tabbar{
    color: #000;
  }
  #app .mint-tabbar > .mint-tab-item.is-selected .tabaward{
    color: #fff;
  }
  .container .mint-tab-container-wrap{
    height:100%;
  }
  .tabbar{
    display: inline-block;
    color: #999;
    font-size: 16px;
    font-weight: 700;
    width: 100%;
    height: 48px;
    line-height: 48px;
  }
  .tabaward {
    display: inline-block;
    color: #ccc;
    background-color: rgb(255, 51, 51);
    font-size: 18px;
    font-weight: 700;
    width: 48px;
    height: 48px;
    line-height: 46px;
    border-radius: 50%;
  }
</style>

