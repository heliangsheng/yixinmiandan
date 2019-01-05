<template>
  <div class="content">
		<h3 class="title">注册</h3>
		<div class="form">
			<div class="top">
				<input class="telNumber" type="tel" placeholder="请输入手机号" />
				<span class="getCode" v-if="!countShowFlag" @click="getCodeClick">获取验证码</span>
				<span class="getCode countNum" v-if="countShowFlag">{{countNum}}</span>
			</div>
			<div class="bottom">
				<input type="number" class="codeNumber" placeholder="请输入短信验证码" />
			</div>
			<div class="button">
				<button class="confirm" @click="confirm">注册</button>
			</div>
		</div>
	</div>
</template>

<script>
import SystemService from '@/server/server.js'
import { Toast } from 'mint-ui'
export default {
  name: 'index',
  data () {
    return {
      telNumber: '',
			codeNumber: '',
			countNum: 60,
			countShowFlag: false,
			interval: null
    }
  },
  methods: {
    getCodeClick() {
			let that = this
			that.countShowFlag = true
			Toast({
				message: '发送成功',
				position: 'top',
				duration: 5000
			})
			that.interval = setInterval(() => {
				if (that.countNum !== 0) {
					that.countNum--
				} else {
					clearInterval(that.interval)
				}
			}, 1000)
			/* SystemService.getCode().then(res => {
				Toast({
					message: '发送成功',
					position: 'bottom',
					duration: 5000
				})
				that.interval = setInterval(() => {
					if (that.countNum !== 0) {
						that.countNum--
					} else {
						clearInterval(that.interval)
					}
				}, 1000)
			}).catch(err => {
				Toast({
					message: '发送失败',
					position: 'bottom',
					duration: 5000
				})
			}) */
    },
    confirm() {
      console.log('confirm')
    }
  }
}
</script>

<style scoped>
.content{
	width: 100%;
	height: 100%;
	font-size: 14px;
	background-color: #fefefe;
}
.content .title{
	font-size: 24px;
	height: 60px;
	line-height: 60px;
	text-align: center;
	color: #fff;
	background-color: #ec6376;
}
.content .form{
	padding: 30px;
}
.content .form .top{
	position: relative;
}
.telNumber, .codeNumber{
	display: inline-block;
	width: 99%;
	border: 0;
	font-size: 14px;
	height: 32px;
	line-height: 32px;
	border-bottom: 1px solid #ccc;
	text-indent: 1em;
}
.content .form .top .getCode{
	position: absolute;
	height: 32px;
	font-size: 14px;
	cursor: pointer;
	line-height: 32px;
	padding: 0 10px;
	text-align: center;
	background-color: #ec6376;
	border-radius: 3px;
	right: 5px;
	color: #fff;
  top: 0;
	cursor: pointer;
}
.content .form .top .countNum{
	width: 45px;
}
.content .form .bottom{
	margin-top: 25px;
}
.content .form .button{
	margin-top: 20px;
}
.content .form .button button{
	display: inline-block;
	width: 100%;
	height: 32px;
	color: #fff;
	text-align: center;
	line-height: 32px;
	border-radius: 3px;
	background-color: #ec6376;
}
</style>
