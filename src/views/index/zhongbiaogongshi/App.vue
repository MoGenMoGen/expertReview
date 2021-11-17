<template>
	<div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:bWidth + 'px'}">
			<leftMenu tabIndex='5-2'></leftMenu>
			<div class="right">
				<topNav :activeName='activeName' :list="thisNavList"></topNav>
				<div class="content">
					<div class="topSeachBox">
						<div>
							<el-input placeholder="项目编号" v-model="cd" clearable></el-input>
							<el-input placeholder="项目名称" v-model="nm" clearable></el-input>
							<!-- <el-input placeholder="采购单位" style="flex: 2;" v-model="input" clearable></el-input> -->
							<!-- <el-input placeholder="联系人" v-model="input" clearable></el-input>
							<el-input placeholder="联系电话" v-model="input" clearable></el-input> -->
							<el-select v-model="procurementMethodCd" style="flex: 2;margin-right: 10px;" clearable placeholder="采购方式">
								<el-option v-for="item in options" :key="item.cd" :label="item.nm"
									:value="item.cd">
								</el-option>
							</el-select>
							<el-date-picker v-model="bidOpenTm" type="datetimerange" style="flex: 2;margin-right: 10px;margin-bottom: 10px;" range-separator="" start-placeholder="投标开始时间段">
							</el-date-picker>
							<el-date-picker v-model="bidEndTm" type="datetimerange" style="flex: 2;margin-right: 10px;margin-bottom: 10px;" range-separator="" start-placeholder="投标截止时间段">
							</el-date-picker>
							<!-- <el-date-picker v-model="value3" type="datetime" style="flex: 2;" placeholder="实际投标时间">
							</el-date-picker> -->
							<el-button plain @click="searchList" v-if="auth1">查询</el-button>
						</div>
					</div>
					<div class="content-list">
						<div class="bodyTable">
							<el-table :data="tableData" max-height="577" style="width: 100%" :cell-style="{
								    'text-align': 'center',
								    color: '#333',
								    'font-weight': '500',
								  }" :header-cell-style="{
								    color: '#606060',
								    background: '#f8f8f8',
									'text-align': 'center',
								  }">
								<el-table-column type="index" label="序号" min-width="50">
									<template slot-scope="scope">
										<span>{{(pageNo - 1) * pageSize + scope.$index + 1}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="name" label="项目信息" min-width="250">
									<template slot-scope="scope">
										<p>项目编号：{{scope.row.cd}}</p>
										<p>项目名称：{{scope.row.nm}}</p>
									</template>
								</el-table-column>
								<el-table-column prop="winner" label="采购单位" min-width="150"></el-table-column>
								<el-table-column prop="procurementMethodNm" label="采购方式" min-width="150"></el-table-column>
								<el-table-column prop="bidOpenTm" label="开标时间" min-width="100"></el-table-column>
								<el-table-column prop="budget" label="预算金额(元)" min-width="100"></el-table-column>
								<el-table-column prop="applyNum" label="投标项" min-width="100"></el-table-column>
								<el-table-column label="操作" min-width="100">
									<template slot-scope="scope">
										<el-button @click="handleClickShenhe(scope.row,2)" type="text" size="small" 
										v-if="scope.row.announcementOfResults>0&&scope.row.announcementOfResultsStatus==2&&auth2" >查看公示
										</el-button>
										<br>
										<el-button type="text" size="small" @click="handleClickShenhe(scope.row,0)" v-if="scope.row.announcementOfResults==0&&scope.row.announcementOfResultsStatus==0&&auth3"
											style="background: #FFF;color: #2778BE; border-radius: 2px;width: 50px;border: 1px solid #2778BE;box-sizing: border-box;margin-bottom: 10px;">
											发布</el-button>
										<el-button type="text" size="small" @click="handleClickShenhe(scope.row,3)" v-if="scope.row.announcementOfResults>0&&auth5"
											style="background: #FFF;color: #2778BE; border-radius: 2px;width: 50px;border: 1px solid #2778BE;box-sizing: border-box;margin-bottom: 10px;">
											修改</el-button>
										<br>
										<el-button type="text" size="small" @click="handleClickShenhe(scope.row,1)" v-if="scope.row.announcementOfResults>0&&scope.row.announcementOfResultsStatus!=2&&auth3"
											style="background: #2778BE;color: #ffffff; border-radius: 2px;width: 50px;margin-left: 0;">
											审核</el-button>
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
		<gongshishenhe :row='row' :type='type' v-if="showShenhe"></gongshishenhe>
	</div>
</template>

<script>
	import myFooter from '@/components/footer';
	import myHeader from '@/components/myHeader';
	import leftMenu from '@/components/leftMenu';
	import gongshishenhe from '@/components/dingbiao/gongshishenhe';
	import topNav from '@/components/topNav';
	export default {
		data() {
			return {
				auth1:'',//查询权限
				auth2:'',//详情权限
				auth3:'',//审核权限
				auth4:'',//新增权限
				auth5:'',//修改权限
				row: {},
				type: 0,
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
				tableData: [],
				showShenhe: false,
				options: [], //采购方式
				procurementMethodCd: '',
				cd: '',
				nm: '',
				bidOpenTm: '',
				bidEndTm: ''
			}
		},
		computed: {

		},
		components: {
			myFooter,
			myHeader,
			leftMenu,
			topNav,
			gongshishenhe
		},
		mounted() {
			this.auth1= JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:pageWithBidWinningPublicity')>-1)
			this.auth2= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidAffiche:info')>-1)
			this.auth3= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidAffiche:examine')>-1)
			this.auth4= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidAffiche:add')>-1)
			this.auth5= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidAffiche:upd')>-1)
			
			let obj = {
				name: '中标公示',
				url: './zhongbiaogongshi.html',
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
				this.pageNo= val
				this.getList()
			},
			handleClickShenhe(row,type) {
				this.showShenhe = true
				this.row = row
				this.type = type
			},
			getList() {
				let qry=this.query.new()
				this.query.toO(qry,'crtTm','desc')
				this.query.toP(qry,this.pageNo,this.pageSize)
				if(this.cd) {
					this.query.toW(qry,'cd',this.cd,'LK')
				}
				if(this.nm) {
					this.query.toW(qry,'nm',this.nm,'LK')
				}
				if(this.procurementMethodCd) {
					this.query.toW(qry,'procurementMethodCd',this.procurementMethodCd,'EQ')
				}
				if(this.bidOpenTm) {
					this.query.toW(qry,'bidOpenTm',this.until.formatTime(this.bidOpenTm[0])+','+this.until.formatTime(this.bidOpenTm[1]),'BT')
				}
				if(this.bidEndTm) {
					this.query.toW(qry,'bidEndTm',this.until.formatTime(this.bidEndTm[0])+','+this.until.formatTime(this.bidEndTm[1]),'BT')
				}
				this.api.getBidTargetList2(this.query.toEncode(qry)).then(res => {
					console.log(res)
					this.tableData = res.data.list
					this.total = res.page.total
				})
			},
			searchList() {
				this.getList()
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
