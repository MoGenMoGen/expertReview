<template>
	<div class="top-nav">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane  :label="item.name" :name="item.name" v-for="(item,index) in navList" :key="index" :closable="item.canClose"></el-tab-pane>
		</el-tabs>
		<el-dropdown>
		  <el-button style="background-color: #2778BE;color: #fff;">
		    更多<i class="el-icon-arrow-down el-icon--right"></i>
		  </el-button>
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item>搜索</el-dropdown-item>
		    <el-dropdown-item>关闭其他</el-dropdown-item>
		    <el-dropdown-item>关闭所有</el-dropdown-item>
		    <el-dropdown-item>清除缓存</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName:'首页'
			};
		},
		props:{
			navList: {
				type: Array,
				default: [{
					name: '首页',
					url: '/',
					canClose: false
				},{
					name: '招标',
					url: '/zhaobiao.html',
					canClose: true
				},{
					name: '在线评标',
					url: '/toubiao.html',
					canClose: true
				}]
			}
		},
		mounted() {
		},
		methods: {
			handleClick() {
				
			}
		},
		computed: {

		},
	};
</script>
<style type="text/css">
	.el-tabs__item{
		width: 110px;
		padding: 0;
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
	.el-tabs__nav-scroll {
		height: 50px;
		line-height: 50px;
	}
	.el-tabs__nav-wrap::after {
		height: 0 !important;
	}
</style>

<style lang="less" scoped>
	@import url("../assets/css/init.less");
	.top-nav {
		width: 100%;
		background-color: #fff;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px 0 30px;
		box-sizing: border-box;
		.el-tabs {
			flex: 1;
			height: 50px;
		}
		.el-dropdown {
			margin-left: 20px;
		}
	}
</style>