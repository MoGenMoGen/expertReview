<template>
	<div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:bWidth + 'px'}">
			<leftMenu tabIndex='1-1'></leftMenu>
			<div class="right">
				<div class="header">
					<div class="headerItem">
						首页
					</div>
					<div class="btn">
						更多
						<img src="">
					</div>
				</div>
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
						<el-select v-model="value1" clearable placeholder="项目状态">
							<el-option v-for="item in optionsTwo" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
						<el-button plain>查询</el-button>
						<el-button type="primary" style="background-color:  #2778BE;">新增</el-button>
					</div>
					<div class="bodyTable">
						<el-table :data="tableData" style="width: 100%" :cell-style="{
							    'text-align': 'center',
							    color: '#333',
							    'font-weight': '500',
							  }" :header-cell-style="{
							    color: '#606060',
							    background: '#f8f8f8',
							    'text-align': 'center',
							  }">
							<el-table-column prop="date" label="序号" min-width="50">
							</el-table-column>
							<el-table-column prop="name" label="项目编号"  min-width="150">
							</el-table-column>
							<el-table-column prop="address" label="项目名称"  min-width="150">
							</el-table-column>
							<el-table-column prop="address" label="联系人"  min-width="100">
							</el-table-column>
							<el-table-column prop="address" label="采购方式"  min-width="100">
							</el-table-column>
							<el-table-column prop="address" label="预算金额(万元)"  min-width="100">
							</el-table-column>
							<el-table-column prop="address" label="创建时间"min-width="150">
							</el-table-column>
							<el-table-column prop="address" label="状态"min-width="100">
							</el-table-column>
							<el-table-column  label="操作" min-width="50" >
							 <template slot-scope="scope">
							        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
							        <br>
									<el-button type="text" size="small" style="color: #E4393C;">修改</el-button>
									<br>
									<el-button type="text" size="small" style="color: #909090;">删除</el-button>
							      </template>
							</el-table-column>
						</el-table>
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
	export default {
		data() {
			return {
				loading: false,
				bWidth: 0,
				width: 0,
				list: [],
				pageNo: 1,
				pageSize: 10,
				total: 0,
				tabIndex: '',
				value: "",
				value2: "",
				input: "",
				value1: "",
				tableData: [{
					date: '1',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船'
				}, {
					date: '2',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船'
				}, {
					date: '3',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船'
				}, {
					date: '4',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船'
				}],
				options: [{
						value: "选项3",
						label: "蚵仔煎",
					},
					{
						value: "选项4",
						label: "龙须面",
					},
					{
						value: "选项5",
						label: "北京烤鸭",
					},
				],
				optionsTwo: [{
						value: "选项3",
						label: "蚵仔煎",
					},
					{
						value: "选项4",
						label: "龙须面",
					},
					{
						value: "选项5",
						label: "北京烤鸭",
					},
				],
			}
		},
		computed: {

		},
		components: {
			myFooter,
			myHeader,
			leftMenu
		},
		mounted() {
			// if(!this.until.seGet('userInfo')){
			//     this.until.href('./login.html')
			// }
			console.log(this.navList)
			this.getWidth()
			// this.getList()
			// this.userInfo = JSON.parse(this.until.seGet('userInfo'))
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
			}
		}
	}
</script>
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
			margin-left: 10px;
			width: calc(~"100% - 210px");

			// width: 100%;
			.header {
				// width:calc(~"100% - 210px");
				width: 100%;
				display: flex;
				align-items: center;
				height: 50px;
				background: #FFFFFF;
				box-shadow: 0px 2px 2px 0px rgba(234, 234, 234, 0.45);
				padding-left: 10px;
				box-sizing: border-box;
				position: relative;

				.headerItem {
					height: 100%;
					width: 97px;
					text-align: center;
					line-height: 48px;
					font-size: 14px;
					font-weight: 400;
					color: #909090;
				}

				.btn {
					width: 62px;
					height: 29px;
					background: #2778BE;
					border-radius: 2px;
					position: absolute;
					right: 10px;
					top: 50%;
					transform: translateY(-50%);
					font-size: 12px;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					line-height: 29px;
				}
			}

			.content {
				margin-top: 10px;
				background-color: #ffffff;
				width: 100%;

				.topSeachBox {
					// width: 100%;
					padding: 20px;
					box-sizing: border-box;
					display: flex;

					// justify-content: space-around;
					.el-input {
						width: 200px;
						margin-left: 30px;
					}

					.el-select {
						width: 200px;
						margin-left: 30px;
					}

					.el-button {
						width: 100px;
						margin-left: 20px;
					}
				}

				.bodyTable {
					padding: 20px;
					box-sizing: border-box;

					.el-table {
						width: 100%;
						background-color: #F8F8F8;
						text-align: center;
						
					}
				}
			}
		}
	}

	.gray {
		color: #999999;
	}
</style>
