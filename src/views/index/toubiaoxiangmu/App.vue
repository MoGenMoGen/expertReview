<template>
	<div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:bWidth + 'px'}">
			<leftMenu tabIndex='2-2'></leftMenu>
			<div class="right">
				<topNav :activeName='activeName' :list="thisNavList"></topNav>
				<div class="content" v-if="!showDetail">
					<div class="topSeachBox">
						<div>
							<el-input placeholder="项目编号" v-model="cd" clearable></el-input>
							<el-input placeholder="项目名称" v-model="nm" clearable></el-input>
							<!-- <el-input placeholder="采购单位" v-model="input" clearable></el-input>
							<el-input placeholder="联系人" v-model="input" clearable></el-input>
							<el-input placeholder="联系电话" v-model="input" clearable></el-input> -->
							<el-select v-model="procurementMethodCd" style="margin-right: 10px;" clearable placeholder="采购方式">
								<el-option v-for="item in options" :key="item.cd" :label="item.nm"
									:value="item.cd">
								</el-option>
							</el-select>
							<!-- <el-select v-model="value" style="flex: 2;" clearable placeholder="项目状态">
								<el-option v-for="item in options" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select> -->
							<el-date-picker v-model="publishTm" type="daterange" style="flex: 2;margin-right: 10px;margin-bottom: 10px;" range-separator="" start-placeholder="发布日期段">
							</el-date-picker>
							<el-date-picker v-model="bidEndTm" type="datetimerange" style="flex: 2;margin-right: 10px;margin-bottom: 10px;" range-separator="" start-placeholder="截标时间段">
							</el-date-picker>
							<!-- <el-date-picker v-model="value3" type="datetime" style="flex: 2;" placeholder="实际投标时间">
							</el-date-picker> -->
							<el-button plain type="primary" @click="searchList" v-if="auth1">查询</el-button>
						</div>
					</div>
					<div class="son_tablist">
						<div class="left">
							<div class="son_tab_title projectNm" v-for="(item, index) in sonTabList" :key="index"
								@click="changeIndex(index)" :style="{
					        background: sonTabIndex == index ? '#2778be' : '',
					        color: sonTabIndex == index ? '#fff' : '#666666',
					      }">
								{{ item }}
							</div>
						</div>
					</div>
					<div class="content-list">
						<div class="bodyTable">
							<el-table :data="tableData" max-height="517" style="width: 100%" :cell-style="{
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
										<el-table :data="props.row.applyItems" style="width: 100%;" v-show="props.row.applyItems.length>0" :cell-style="{
								    'text-align': 'center',
								    color: '#333',
								    'font-weight': '500',
								  }" :header-cell-style="{
								    color: '#606060',
								    background: '#f8f8f8',
									'text-align': 'center',
								  }">
											<el-table-column prop="orgNm" label="采购单位" min-width="150"></el-table-column>
											<el-table-column label="招标文件" min-width="150">
												<template slot-scope="scope">
													<p>{{scope.row.offer>0?'已上传':'未上传'}}</p>
												</template>
											</el-table-column>
											<el-table-column label="保证金" min-width="150">
												<template slot-scope="scope">
													<p>{{scope.row.deposit>0?'已缴纳':'未缴纳'}}</p>
												</template>
											</el-table-column>
											<el-table-column prop="crtTm" label="投标时间" min-width="150"></el-table-column>
											<el-table-column label="状态" min-width="100">
												<template slot-scope="scope">
													<p v-if="sonTabIndex==0">投标中</p>
													<p v-if="sonTabIndex==1">已结束</p>
												</template>
											</el-table-column>
										</el-table>
									</template>
								</el-table-column>
								<el-table-column type="index" label="序号" min-width="50">
									<template slot-scope="scope">
										<span>{{(pageNo - 1) * pageSize + scope.$index + 1}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="cd" label="项目编号" min-width="150"></el-table-column>
								<el-table-column prop="nm" label="项目名称" min-width="150"></el-table-column>
								<el-table-column prop="publishTm" label="发布日期" min-width="150"></el-table-column>
								<el-table-column prop="completeTm" label="报名截止日期" min-width="150"></el-table-column>
								<el-table-column prop="bidEndTm" label="截标时间" min-width="150"></el-table-column>
								<el-table-column prop="bidOpenTm" label="开标时间" min-width="150"></el-table-column>
								<el-table-column label="保证金" min-width="150">
									<template slot-scope="scope">
										<p v-if="scope.row.needDeposit==1">需要缴纳</p>
										<p v-if="scope.row.needDeposit==0">不需缴纳</p>
									</template>
								</el-table-column>
								<el-table-column label="操作" min-width="100">
									<template slot-scope="scope">
										<el-button @click="handleClick(scope.row.id)" type="text" size="small" v-if="auth2">查看</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
					<div class="Footer">
						<el-pagination background @current-change="handleCurrentChange" :current-page.sync="pageNo"
							:page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
						</el-pagination>
					</div>
				</div>
				<div class="detail" v-if="showDetail">
					<tenderDetail :id="id"></tenderDetail>
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
	import tenderDetail from '@/components/toubiao/tenderDetail';
	export default {
		data() {
			return {
				auth1:'',//查询权限
				auth2:'',//详情权限
				auth3:'',//投标文件投标信息列表权限
				id: '',
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
				sonTabList: ["进行中", "已截标"],
				sonTabIndex: 0,
				tableData: [],
				cd: '',
				nm: '',
				options: [],
				procurementMethodCd: '',
				bidEndTm: '',
				publishTm: '',
				showDetail: false
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
			topNav,
			tenderDetail
		},
		mounted() {
			this.auth1 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:pageWithApplyOdder')>-1)
			this.auth2 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:info')>-1)
			let obj = {
				name: '投标项目',
				url: './toubiaoxiangmu.html',
				canClose: true
			}
			let data = this.until.checkNav(obj, JSON.parse(this.until.seGet('navList')))
			this.activeName = obj.name
			this.thisNavList = data
			this.getWidth()
			window.onresize = () => {
				this.getWidth()
			}
			this.getList()
			this.api.getCatListByPcd({cd:'PROCUREMENT_METHOD'}).then(res => {
				this.options = res.list
			})
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
				this.pageNo=val
				this.getList()
			},
			getList() {
				let qry=this.query.new()
				this.query.toO(qry,'crtTm','desc')
				this.query.toP(qry,this.pageNo,this.pageSize)
				if(this.sonTabIndex == 0) {
					this.query.toW(qry,'bidEndTm',this.until.formatTime(new Date()),'gt')
				} else if(this.sonTabIndex == 1) {
					this.query.toW(qry,'bidEndTm',this.until.formatTime(new Date()),'lt')
				}
				if(this.cd) {
					this.query.toW(qry,'cd',this.cd,'LK')
				}
				if(this.nm) {
					this.query.toW(qry,'nm',this.nm,'LK')
				}
				if(this.procurementMethodCd) {
					this.query.toW(qry,'procurementMethodCd',this.procurementMethodCd,'EQ')
				}
				if(this.publishTm) {
					this.query.toW(qry,'publishTm',this.until.formatTime(this.publishTm[0])+','+this.until.formatTime(this.publishTm[1]),'BT')
				}
				if(this.bidEndTm) {
					this.query.toW(qry,'bidEndTm',this.until.formatTime(this.bidEndTm[0])+','+this.until.formatTime(this.bidEndTm[1]),'BT')
				}
				this.api.getBidTenderList(this.query.toEncode(qry)).then(res => {
					this.tableData = res.data.list
					this.total = res.page.total
				})
			},
			changeIndex(index) {
				this.sonTabIndex = index
				this.getList()
			},
			searchList() {
				this.getList()
			},
			handleClick(id) {
				this.id = id
				this.showDetail = true
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
			.detail {
				height: 740px;
				box-sizing: border-box;
				overflow-y: scroll;
				background-color: white;
				margin-top: 10px;
				padding: 29px 41px;
			}
		}
	}

	.gray {
		color: #999999;
	}
</style>
