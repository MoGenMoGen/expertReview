<template>
	<div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:bWidth + 'px'}">
			<leftMenu tabIndex='6-1'></leftMenu>
			<div class="right">
				<topNav :activeName='activeName' :list="thisNavList"></topNav>
				<div class="content">
					<div class="topSeachBox">
						<el-input placeholder="项目编号" v-model="input" clearable>
						</el-input>
						<el-input placeholder="项目名称" v-model="input" clearable>
						</el-input>
						<el-input placeholder="联系人" v-model="input" clearable>
						</el-input>
						<el-select v-model="value" clearable placeholder="采购方式">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-date-picker v-model="value2" type="datetime" placeholder="创建时间">
						</el-date-picker>
						<el-date-picker v-model="value3" type="datetime" placeholder="截止时间">
						</el-date-picker>
						<el-select v-model="value1" clearable placeholder="项目状态">
							<el-option v-for="item in optionsTwo" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-button plain type="primary">查询</el-button>
					</div>
				</div>
			</div>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
	import myFooter from '@/components/footer';
	import myHeader from '@/components/myHeader';
	import leftMenu from '@/components/leftMenu';
	import detail from '@/components/zhaobiao/detail';
	import change from '@/components/zhaobiao/change';
	import topNav from '@/components/topNav';
	export default {
		data() {
			return {
				activeName: '',
				thisNavList: [],
				loading: false,
				bWidth: 0,
				width: 0,
				pageNo: 1,
				pageSize: 10,
				total: 0,
				value2:'',
				value3:'',
			}
		},
		computed: {

		},
		components: {
			myFooter,
			myHeader,
			leftMenu,
			detail,
			change,
			topNav
		},
		mounted() {
			let obj = {
				name: '标后',
				url: './biaohou.html',
				canClose: true
			}
			let data = this.until.checkNav(obj, JSON.parse(this.until.seGet('navList')))
			this.activeName = obj.name
			this.thisNavList = data
			this.getWidth()
			window.onresize = () => {
				this.getWidth()
			}


		},
		methods: {
			getWidth() {
				let {
					bWidth,
					width
				} = this.until.getWidth()
				this.bWidth = bWidth
				this.width = width
			},
			toLogOut() {
				this.api.logout()
			},
			//页面跳转
			toPage(url) {
				this.until.href(url)
			},
		}
	}
</script>
<style type="text/css">
	.el-tabs__item {
		width: 100px;
		padding: 0;
		text-align: center;
	}
</style>
<style lang="less" scoped>
	#home {
		.tableHeader {
			background: @themeColor;
			color: #FFF;
			border: 0;
			text-align: center;
		}

		.rowList {
			padding: 20px 0;
		}
	}
</style>
<style lang="less" scoped>
	@import url("../../../assets/css/init.less");

	#home {
		background-color: #F3F3F3;

		.blue {
			color: @themeColor;
		}

		.red {
			color: @redColor;
		}

		.projectNm {
			cursor: pointer;
		}
	}
	.container {
		padding-top: 20px;
		padding-bottom: 100px;
		background: url(../../../assets/img/footer.png);
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: bottom center;
		margin: 0 auto;
		display: flex;

		.right {
			height: 800px;
			margin-left: 10px;
			width: calc(~"100% - 210px");

			// width: 100%;
			.content{
				margin-top: 10px;
				background-color: #ffffff;
				width: 100%;
				height: 740px;
				.topSeachBox{
					padding: 20px;
					box-sizing: border-box;
					display: flex;
					flex-wrap: wrap;
					.el-input {
						width: 350px;
						margin-left: 30px;
						margin-bottom: 20px;
					}
					.el-select {
						width: 350px;
						margin-left: 30px;
						margin-bottom: 20px;
					}
					.el-button {
						width:350px;
						margin-left: 30px;
						margin-bottom: 20px;
					}
					
				}
			}
		
		}
	}

	.gray {
		color: #999999;
	}
</style>
