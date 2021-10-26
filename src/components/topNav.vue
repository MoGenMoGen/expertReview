<template>
	<div class="top-nav">
		<el-tabs v-model="activeName" @tab-click="handleClick" @tab-remove='handleRemove'>
			<el-tab-pane :label="item.name" :name="item.name" v-for="(item,index) in list" :key="index"
				:closable="item.canClose"></el-tab-pane>
		</el-tabs>
		<el-dropdown @command="handleCommand">
			<el-button style="background-color: #2778BE;color: #fff;">
				更多<i class="el-icon-arrow-down el-icon--right"></i>
			</el-button>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="search">搜索</el-dropdown-item>
				<el-dropdown-item command="other">关闭其他</el-dropdown-item>
				<el-dropdown-item command="all">关闭所有</el-dropdown-item>
				<el-dropdown-item command="stroage">清除缓存</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			activeName: {
				type: String,
				default: ''
			},
			list: {
				type: Array,
				default: function() {
					return [{
						name: '首页',
						url: './index.html',
						canClose: false
					}]
				}
			}
		},
		mounted() {},
		methods: {
			handleClick(e) {
				this.until.href(this.list[e.index].url)
			},
			handleRemove(e) {
				console.log(e)
				let list = JSON.parse(this.until.seGet('navList'))
				let thisIndex = 1
				thisIndex = list.findIndex(item => item.name == e)
				this.activeName = list[thisIndex - 1].name
				this.until.href(list[thisIndex - 1].url)
				list.splice(thisIndex, 1)
				this.list = list
				this.until.seSave('navList', JSON.stringify(list))
			},
			handleCommand(e) {
				if (e == 'other') {
					let list = JSON.parse(this.until.seGet('navList'))
					let objList = list.filter(item => item.name == this.activeName)
					if(objList[0].name!='首页') {
						objList.unshift({
							name: '首页',
							url: './index.html',
							canClose: false
						})
					}
					this.list = objList
					this.until.seSave('navList', JSON.stringify(objList))
				} else if (e == 'all') {
					let list = [{
						name: '首页',
						url: './index.html',
						canClose: false
					}]
					this.list = list
					this.activeName = '首页'
					this.until.href('./index.html')
					this.until.seSave('navList', JSON.stringify(list))
				} else if (e == 'stroage') {
					this.$confirm('是否需要清除缓存?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						localStorage.clear()
						this.$message({
							type: 'success',
							message: '清除成功!'
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消清除'
						});
					});
				}
			}
		},
		computed: {

		},
	};
</script>
<style type="text/css">
	.el-tabs__item {
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

	.el-tabs__header {
		margin-bottom: 0;
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
