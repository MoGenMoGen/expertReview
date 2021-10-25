<template>
	<div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:bWidth + 'px'}">
			<leftMenu tabIndex='2-1'></leftMenu>
			<div class="right">
				<topNav :activeName='activeName' :list="thisNavList"></topNav>
				<div class="content">
					<div class="topSeachBox">
						<div>
							<el-input placeholder="项目编号" v-model="input" clearable></el-input>
							<el-input placeholder="项目名称" v-model="input" clearable></el-input>
							<el-input placeholder="采购单位" v-model="input" clearable></el-input>
							<el-input placeholder="联系人" v-model="input" clearable></el-input>
							<el-input placeholder="联系电话" v-model="input" clearable></el-input>
							<el-select v-model="value" style="margin-right: 10px;" clearable placeholder="采购方式">
								<el-option v-for="item in options" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<el-select v-model="value" style="flex: 2;" clearable placeholder="项目状态">
								<el-option v-for="item in options" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</div>
						<div>
							<el-date-picker v-model="value2" type="datetime" style="flex: 2;" placeholder="投标开始时间">
							</el-date-picker>
							<el-date-picker v-model="value3" type="datetime" style="flex: 2;" placeholder="投标截止时间">
							</el-date-picker>
							<el-date-picker v-model="value3" type="datetime" style="flex: 2;" placeholder="实际投标时间">
							</el-date-picker>
							<el-button plain type="primary">查询</el-button>
						</div>
					</div>
					<div class="son_tablist">
						<div class="left">
							<div class="son_tab_title projectNm" v-for="(item, index) in sonTabList" :key="index"
								@click="sonTabIndex = index" :style="{
					        background: sonTabIndex == index ? '#2778be' : '',
					        color: sonTabIndex == index ? '#fff' : '#666666',
					      }">
								{{ item }}
							</div>
						</div>
					</div>
					<div class="content-list">
						<div class="bodyTable">
							<el-table :data="tableData" max-height="467" style="width: 100%" :cell-style="{
								    'text-align': 'center',
								    color: '#333',
								    'font-weight': '500',
								  }" :header-cell-style="{
								    color: '#606060',
								    background: '#f8f8f8',
									'text-align': 'center',
								  }">
								<el-table-column type="expand">
									<template slot-scope="props">
										<el-table :data="tableData" style="width: 100%;" :cell-style="{
								    'text-align': 'center',
								    color: '#333',
								    'font-weight': '500',
								  }" :header-cell-style="{
								    color: '#606060',
								    background: '#f8f8f8',
									'text-align': 'center',
								  }">
											<el-table-column prop="unit" label="采购单位" min-width="150"></el-table-column>
											<el-table-column prop="unit" label="联系人" min-width="150"></el-table-column>
											<el-table-column prop="unit" label="联系电话" min-width="150"></el-table-column>
											<el-table-column prop="unit" label="申请时间" min-width="150"></el-table-column>
											<el-table-column label="操作" min-width="100">
												<template slot-scope="scope">
													<el-button type="text" size="small"
														style="background: #2778BE;color: #ffffff; border-radius: 2px;width: 50px;">
														审核</el-button>
												</template>
											</el-table-column>
										</el-table>
									</template>
								</el-table-column>
								<el-table-column type="index" label="序号" min-width="50"></el-table-column>
								<el-table-column prop="unit" label="项目编号" min-width="150"></el-table-column>
								<el-table-column prop="unit" label="项目名称" min-width="150"></el-table-column>
								<el-table-column prop="unit" label="采购方式" min-width="150"></el-table-column>
								<el-table-column prop="unit" label="投标开始时间" min-width="150"></el-table-column>
								<el-table-column label="操作" min-width="100">
									<template slot-scope="scope">
										<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
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
				value2: '',
				value3: '',
				sonTabList: ["待审核", "已审核"],
				sonTabIndex: 0,
				tableData: [{
					name: '12米玻璃钢新型渔船',
					cd: 'BHZC2021-G3-0001',
					unit: '澳新船厂有限公司',
					buyType: '竞争性磋商',
					time: '2021-07-12 14:00:00',
					money: 52,
					num: 1
				},{
					name: '12米玻璃钢新型渔船',
					cd: 'BHZC2021-G3-0001',
					unit: '澳新船厂有限公司',
					buyType: '竞争性磋商',
					time: '2021-07-12 14:00:00',
					money: 52,
					num: 1
				}]
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
				name: '报名审核',
				url: './baomingshenhe.html',
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
			handleCurrentChange(val){
				
			}
		}
	}
</script>
<style type="text/css">
	.el-tabs__item {
		width: 100px;
		padding: 0;
		text-align: center;
	}
	.el-table__expanded-cell[class*=cell] {
		padding: 0;
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
			.content {
				margin-top: 10px;
				background-color: #ffffff;
				width: 100%;
				height: 740px;

				.topSeachBox {
					padding: 20px;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;

					div {
						display: flex;
						align-items: center;
						justify-content: center;

						.el-input {
							flex: 1;
							margin-right: 10px;
							margin-bottom: 10px;
						}

						.el-select {
							flex: 1;
							margin-bottom: 10px;
						}

						.el-button {
							flex: 1;
							margin-bottom: 10px;
						}

						.el-date-picker {
							margin-right: 10px;
						}
					}
				}
				.son_tablist {
					width: calc(~"100% - 40px");
				  margin: 0 auto 20px;
				  display: flex;
				  align-items: center;
				  justify-content: space-between;
				  border-bottom: 1px solid #2778be;
				  .left {
				    .son_tab_title {
				      display: inline-block;
				      width: 129px;
				      height: 40px;
				      text-align: center;
				      line-height: 40px;
				    }
				  }
				}
				.content-list {
					display: flex;
					flex-direction: column;
					background-color: #FFF;
					padding: 0 20px;
					box-sizing: border-box;
					overflow-y: auto;
				}
				.Footer {
					width: 100%;
					text-align: center;
					margin-top: 20px;
				}
			}
		}
	}

	.gray {
		color: #999999;
	}
</style>
