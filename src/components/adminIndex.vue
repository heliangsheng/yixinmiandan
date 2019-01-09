<template>
  <div class="content">
    <mt-tabbar v-model="selected" :fixed="true">
      <span class="tabbar" style="width:33%;" @click="showDropdownFlag = !showDropdownFlag"><span class="iconfont icon-yonghuguanli"></span>用户中心</span>
      <mt-tab-item id="2" @click.native="hideDropdown">
        <span class="tabaward">奖</span>
      </mt-tab-item>
      <mt-tab-item id="3" @click.native="hideDropdown">
        <span class="tabbar"><span class="iconfont icon-gerenzhongxin"></span>个人中心</span>
      </mt-tab-item>
    </mt-tabbar>
    <mt-tab-container v-model="selected" class="container" @click.native="hideDropdown">
      <mt-tab-container-item id="1">
        <div class="charge containerBox">
          <mt-field label="充值金额:" placeholder="请输入充值金额" type="number" v-model="chargeMoney"></mt-field>
          <div class="chargeConfirm">
            <mt-button type="danger" style="width:80%" @click.native="charge">充值</mt-button>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="award containerBox">
          <div class="awardTop">
            <h3 class="awardTitle">伊馨免单了</h3>
            <span class="awardName">当前奖池金额:</span>
            <span class="awardMoney">10000</span>
          </div>
          <div class="awardBottom">
            <mt-navbar v-model="awardSelected">
              <mt-tab-item id="1"><span class="awardTabTitle">当前奖金池</span></mt-tab-item>
              <mt-tab-item id="2"><span class="awardTabTitle">奖金领取情况</span></mt-tab-item>
            </mt-navbar>

            <!-- tab-container -->
            <mt-tab-container v-model="awardSelected">
              <mt-tab-container-item id="1">
                <div class="page-infinite-wrapper" ref="wrapper" style="height: 100%;overflow:scroll">
                  <ul class="page-infinite-list" v-infinite-scroll="award1LoadMore" infinite-scroll-disabled="award1Loading" infinite-scroll-distance="10">
                    <li v-for="n in list" :key="n" class="page-infinite-listitem">{{ n }}</li>
                  </ul>
                  <p v-show="award1Loading" class="page-infinite-loading">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    <span>加载中...</span>
                  </p>
                </div>
              </mt-tab-container-item>
              <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :key="n" :title="'content ' + n" />
              </mt-tab-container-item>
            </mt-tab-container>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="self containerBox">
          <div class="topInfo">
            <span class="topImg">
              <span class="selfImg">
                <img src="/static/img/user.png" /> 
              </span>
            </span>
            <span class="selfName">张三</span>
            <span class="selfAddress">广东省深圳市</span>
            <span class="selfRank">
              <span class="selfInfoName">当前排名:</span>
              <span class="rankDetail">12</span>
            </span>
          </div>
          <div class="selfBottom">
            <ul>
              <li @click="switchChargeRecord">充值记录</li>
            </ul>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
<!--  用户列表 -->  
    <mt-popup
      class="recordPopup"
      v-model="showUserListFlag"
      position="right">
      <div class="topBack">
        <button @click="showUserListFlag = false">&lt; 返回</button>
        <h3>用户列表</h3>
      </div>
      <div class="recordList">
        <div class="mint-searchbar">
          <div class="mint-searchbar-inner">
            <i class="mintui mintui-search"></i> 
            <input type="search" v-model="userInfoSearch" placeholder="搜索" class="mint-searchbar-core">
          </div>
        </div>
        <ul class="recordUl">
          <li class="listHeader">
            <span class="userName">用户名</span>
            <span class="userOpt">操作</span>
          </li>
          <li v-if="recordData.length > 0"  v-for="(item, index) in recordData" :key="index">
            <span class="userName">{{item.name}}</span>
            <span class="userOpt">
              <mt-button type="primary">充值</mt-button>
              <mt-button type="primary">修改</mt-button>
            </span>
          </li>
          <li v-if="recordData.length === 0">
            <span class="noRecord">暂无充值记录</span>
          </li>
        </ul>
      </div>
    </mt-popup>
<!--  充值记录 -->
    <mt-popup
      class="recordPopup"
      v-model="showChargeRecordFlag"
      position="right">
      <div class="topBack">
        <button @click="switchChargeRecord">&lt; 返回</button>
        <h3>充值记录</h3>
      </div>
      <div class="recordList">
        <div class="filterButton">
          <mt-button type="primary" @click.native="searchType(1)">所有</mt-button>
          <mt-button type="primary" @click.native="searchType(2)">未审核</mt-button>
          <mt-button type="primary" @click.native="searchType(3)">审核通过</mt-button>
          <mt-button type="primary" @click.native="searchType(4)">审核不通过</mt-button>
        </div>
        <ul class="recordUl">
          <li class="listHeader">
            <span class="data">日期</span>
            <span class="money">金额</span>
            <span class="result">审核结果</span>
          </li>
          <li v-if="recordData.length > 0"  v-for="(item, index) in recordData" :key="index">
            <span class="data">{{item.data}}</span>
            <span class="money">{{item.money}}</span>
            <span class="result">{{item.result}}</span>
          </li>
          <li v-if="recordData.length === 0">
            <span class="noRecord">暂无充值记录</span>
          </li>
        </ul>
      </div>
    </mt-popup>
<!-- 注册用户 -->
    <mt-popup
      class="recordPopup"
      v-model="showUserInfoFlag"
      position="right">
      <div class="topBack">
        <button @click="showUserInfoFlag = false">&lt; 返回</button>
        <h3>{{userTitle}}</h3>
      </div>
      <div class="recordList">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
        <mt-field label="推荐人" placeholder="请输入推荐人手机号" type="tel" v-model="tel"></mt-field>
        <mt-field label="地址" placeholder="请输入地址" v-model="address"></mt-field>
        <mt-field label="首充金额" placeholder="请输入首充金额" type="number" v-model="firstCharge"></mt-field>
        <a class="mint-cell mint-field">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">是否管理员</span>
            </div>
            <div class="mint-cell-value">
              <mt-switch v-model="isAdmin" @change="changeIsAdmin">{{isAdminText}}</mt-switch>
            </div>
          </div>
        </a>
      </div>
      <div class="saveUserInfo" style="padding:30px;">
        <mt-button type="primary" style="width:100%;" @click.native="saveUserInfo">保存</mt-button>
      </div>

    </mt-popup>
    <!-- 下拉菜单 -->
    <div v-if="showDropdownFlag" class="menuDrop">
        <ul>
            <li><button @click="showChargeRecordFlag = true">充值记录</button></li>
            <li><button @click="showUserInfoFlag = true">注册用户</button></li>
            <li><button @click="showUserListFlag = true">用户列表</button></li>
        </ul>
    </div>
  </div>
</template>

<script>
import SystemService from '@/server/server.js'
export default {
  name: 'index',
  data () {
    return {
      chargeMoney: '',
      selected: '2',
      showDropdownFlag: false,      // 显示下拉菜单
      showChargeRecordFlag: false,  // 显示充值记录
      showUserListFlag: false,   // 显示用户列表
      showUserInfoFlag: false,     // 注册用户页面
      userInfoSearch: '',         // 用户列表搜索,
      userTitle: '注册用户',       // 注册用户或修改用户信息的title
      username: '',
      phone: '',
      tel: '',
      address: '',
      firstCharge: '',
      isAdmin: false,
      isAdminText: '否',
      awardSelected: '1',
      award1Loading: false,
      list: [1,2,3,4,5,6,7,8,9,10],
      recordData: [
        {
          data: '2018-01-12 15:34',
          money: '2000.00',
          result: '审核不通过'
        },
        {
          data: '2018-01-12 15:34',
          money: '1000.00',
          result: '审核通过'
        },
        {
          data: '2018-01-12 15:34',
          money: '2000.00',
          result: '审核不通过'
        },
        {
          data: '2018-01-12 15:34',
          money: '2000.00',
          result: '审核不通过'
        }
      ]
    }
  },
  methods: {
    showDropdown() {
      this.showDropdownFlag = true
    },
    hideDropdown() {
      this.showDropdownFlag = false
    },
    // 切换是否是管理员
    changeIsAdmin(val) {
      if (!val) {
        this.isAdminText = '是'
      } else {
        this.isAdminText = '否'
      }
    },
    charge() {
      let params = {
        money: this.chargeMoney
      }
      SystemService.chargeMoney(params).then(res => {
        this.$toast({
          message: '充值成功',
          position: 'top'
        })
      }).catch(err => {
        this.$toast({
          message: err || '充值失败',
          position: 'top'
        })
      })
    },
    // 切换显示充值记录
    switchChargeRecord() {
      this.showChargeRecordFlag = !this.showChargeRecordFlag
    },
    // 根据类型搜索
    searchType(type) {
      let param = {
        'type': type ? type : '1'
      }
      SystemService.searchRecord(param).then(res => {
        this.recordData = res.data
      }).catch(err => {
        this.$toast({
          message: err || '查询失败',
          position: 'top'
        })
      })
    },
    // 保存用户信息
    saveUserInfo() {
      console.log('user')
    },
    award1LoadMore() {
      this.loading = true
      setTimeout(() => {
        let last = this.list[this.list.length - 1]
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i)
        }
        this.loading = false
      }, 2500);
    }
  }
}
</script>

<style>
  #app .mint-tab-item {
    padding: 0;
  }
  .menuDrop{
      position: fixed;
      background-color: #fff;
      width: 33%;
      left: 0;
      bottom: 48px;
      border: 1px solid #ccc;
      border-bottom: none;
  }
  .menuDrop ul li{
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .menuDrop ul li button{
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    background-color: transparent;
  }
  .recordPopup{
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .recordPopup .topBack{
    height: 50px;
    background-color: #fff;
    position: relative;
  }
  .recordPopup .topBack button{
    background-color: transparent;
    border-radius: 5px;
    width: 80px;
    font-size: 18px;
    line-height: 50px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .recordPopup .topBack h3{
    font-size: 18px;
    line-height: 50px;
    font-weight: 700;
    text-align: center;
  }
  .recordList .filterButton{
    display: flex;
    padding: 10px;
    background-color: #eee;
    flex-direction: row;
    justify-content: space-between;
  }
  .recordList ul.recordUl{
    padding: 0 10px;
  }
  .recordList .recordUl li {
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .recordList .recordUl li span{
    float: left;
    min-height: 40px;
  }
  .recordList .recordUl li .data{
    width: 35%;
  }
  .recordList .recordUl li .money{
    width: 30%;
  }
  .recordList .recordUl li .result{
    width: 35%;
  }
  .recordList .recordUl li .userName{
    width: 50%;
    text-align: center;
  }
  .recordList .recordUl li .userOpt{
    width: 50%;
    text-align: center;
  }
  .userOpt .mint-button--normal {
    display: inline-block;
    padding: 2px 10px;
    height: 28px;
  }
  .recordList .recordUl li .noRecord {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  .recordList .recordUl li:after{
    display: block;
    content: '';
    clear: both;
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
  #app .mint-cell-wrapper{
    background: none;
  }
  .charge {
    background-image: url('/static/img/chargebg.jpg');
  }
  .award {
    padding: 0;
    background-image: url('/static/img/awardbg.jpg');
  }
  .self .topInfo{
    height: 160px;
    background-position: left top;
    background-size: 100% auto;
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
  .award .awardTop {
    height: 180px;
    padding-top: 20px;
    text-align: center;
  }
  .award .awardTop span{
    display: block;
    padding: 5px 0;
    text-align: center;
    font-size: 20px;
    line-height: 20px;
    color: #fff;
  }
  .award .awardTop .awardTitle{
    padding-left: 15px;
    font-size: 28px;
    color: #fff;
    line-height: 60px;
    letter-spacing: 8px;
    text-align: center;
    height: 60px;
  }
  .award .awardTop span.awardName{
    margin-top: 10px;
  }
  .award .awardTop span.awardMoney{
    font-weight: 700;
    margin-top: 10px;
  }
  .award .awardBottom{
    height: calc(100% - 180px);
    background-color: #fff;
    text-align: center;
  }
  .award .awardBottom .mint-tab-container{
    height: calc(100% - 32px);
  }
  .award .awardBottom .mint-tab-container
  .self.containerBox {
    padding-top: 0;
  }
  .self .topInfo .topImg{
    display: inline-block;
  }
  .self .topInfo span.topImg {
    width: 25%;
    height: 100%;
    min-width: 100px;
    position: relative;
    text-align: center;
  }
  .self .topInfo span.topImg .selfImg {
    padding: 10px;
    border-radius: 50%;
    background-color: #ccc;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .topImg .selfImg img{
    display: block;
    padding: 0;
    margin: 0;
    width: 48px;
    height: 48px;
  }
  .self .selfName{
    font-size: 16px;
    line-height: 20px;
    color: #fff;
    position: absolute;
    top: 50px;
  }
  .self .selfAddress {
    font-size: 16px;
    line-height: 20px;
    color: #fff;
    position: absolute;
    top: 80px;
  }
  .self .selfRank {
    width: 80px;
    color: #fff;
    position: absolute;
    right: 10px;
    top: 40px;
  }
  .self .selfRank span{
    display: inline-block;
    width: 100%;
    font-size: 18px;
    line-height: 30px;
    text-align: center;
  }
  .self .selfRank span.rankDetail {
    color: #f33;
  }
  .self .selfBottom {
    width: 100%;
    height: calc(100% - 150px);
    background-color: #efefef;
  }
  .self .selfBottom li{
    padding: 15px;
    font-size: 16px;
    line-height: 28px;
    border-bottom: 1px solid #bcbcbc;
  }
  .self .selfBottom li:after{
    display: block;
    content: '>';
    font-size: 18px;
    float: right;
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
  .awardTabTitle{
    font-size: 16px;
    line-height: 32px;
  }
  .page-infinite-loading{
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .page-infinite-loading > span {
    display: inline-block;
    vertical-align: middle;
  }
</style>

