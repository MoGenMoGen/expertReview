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
					<div class="middleBox">
						<div class="middleLeft">
							保证金未退金额：4万元
						</div>
						<div class="middleRight">
							保证金已退金额：2万元
						</div>
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
							<el-table-column prop="name" label="项目编号" min-width="150">
							</el-table-column>
							<el-table-column prop="address" label="项目名称" min-width="150">
							</el-table-column>
							<el-table-column prop="address" label="联系人" min-width="100">
							</el-table-column>
							<el-table-column prop="address" label="采购方式" min-width="100">
							</el-table-column>
							<el-table-column prop="address" label="预算金额(万元)" min-width="100">
							</el-table-column>
							<el-table-column prop="address" label="创建时间" min-width="150">
							</el-table-column>
							<el-table-column prop="zhuangtai" label="状态" min-width="100">
								<template slot-scope="scope">
									<span v-if="scope.row.zhuangtai=='未退还'" style="color: #E4393C;">
										未退还
									</span>
									<span v-if="scope.row.zhuangtai=='已退还'" style="color: #2778BE;">
										已退还
									</span>
					
								</template>
							</el-table-column>
							<el-table-column label="操作" min-width="50">
								<template slot-scope="scope">
									<el-button @click="tolook(scope.row)" type="text" size="small" style="color: #2778BE;">查看</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="Footer">
						<el-pagination background @current-change="handleCurrentChange" :current-page.sync="currentPage"
							:page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
						</el-pagination>
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
				tableData: [{
					date: '1',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '未退还'
				}, {
					date: '2',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '未退还'
				}, {
					date: '3',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '已退还'
				}, {
					date: '4',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '未退还'
				},
				{
					date: '5',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '未退还'
				},
				{
					date: '6',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '未退还'
				},
				{
					date: '7',
					name: 'BHZC2021-G3-0001',
					address: '12米玻璃钢新型渔船',
					zhuangtai: '未退还'
				},
				]
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
						width: 20%;
						margin-left: 30px;
						margin-bottom: 20px;
					}
					.el-select {
						width: 20%;
						margin-left: 30px;
						margin-bottom: 20px;
					}
					.el-button {
						width:20%;
						margin-left: 30px;
						margin-bottom: 20px;
					}
					
				}
				.middleBox{
					display: flex;
					background-color: #ffffff;
					width:30%;
					justify-content: space-between;
					margin-left: 20px;
					.middleLeft{
						font-size: 14px;
						font-weight: 400;
						color: #E4393C;
					}
					.middleRight{
						font-size: 14px;
						font-weight: 400;
						color: #2778BE;
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
				.Footer{
					width: 100%;
					text-align: center;
				}
			}
		
		}
	}

	.gray {
		color: #999999;
	}
</style>
