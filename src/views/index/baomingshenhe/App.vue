<template>
	<div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:bWidth + 'px'}">
			<leftMenu tabIndex='2-1'></leftMenu>
			<div class="right">
				<topNav :activeName='activeName' :list="thisNavList"></topNav>
				<div class="content" v-if="!showDetail">
					<div class="topSeachBox">
						<div>
							<el-input placeholder="项目编号" v-model="cd" clearable></el-input>
							<el-input placeholder="项目名称" v-model="nm" clearable></el-input>
							<!-- <el-input placeholder="采购单位" v-model="input" clearable></el-input> -->
							<!-- <el-input placeholder="联系人" v-model="input" clearable></el-input>
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
							<el-date-picker v-model="bidOpenTm" type="datetimerange" style="flex: 2;margin-right: 10px;margin-bottom: 10px;" range-separator="" start-placeholder="投标开始时间段">
							</el-date-picker>
							<el-date-picker v-model="bidEndTm" type="datetimerange" style="flex: 2;margin-right: 10px;margin-bottom: 10px;" range-separator="" start-placeholder="投标截止时间段">
							</el-date-picker>
							<!-- <el-date-picker v-model="value3" type="datetime" style="flex: 2;" placeholder="实际投标时间">
							</el-date-picker> -->
							<el-button plain @click="searchList()">查询</el-button>
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
											<el-table-column label="采购单位" min-width="150">
												<template slot-scope="scope">
													<p style="color: #2778BE;cursor: pointer;" @click="showInfo(scope.row.orgId)">
														{{scope.row.orgNm}}
													</p>
												</template>
											</el-table-column>
											<el-table-column prop="realNm" label="采购人" min-width="150"></el-table-column>
											<el-table-column prop="options" label="审核意见" min-width="150">
												<template slot-scope="scope">
													<el-tooltip class="item" effect="dark" :content="scope.row.options" placement="top">
													  <p>{{scope.row.options?scope.row.options.substring(0,10)+'...':''}}</p>
													</el-tooltip>
												</template>
											</el-table-column>
											<el-table-column prop="crtTm" label="申请时间" min-width="150"></el-table-column>
											<el-table-column label="操作" min-width="100">
												<template slot-scope="scope">
													<el-button type="text" size="small" v-if="scope.row.audit==1&&auth2" @click="handleClickShenhe(scope.row)"
														style="background: #2778BE;color: #ffffff; border-radius: 2px;width: 50px;">
														审核</el-button>
													<p style="color: #2778BE;" v-if="scope.row.audit==2">审核通过</p>
													<p style="color: #E4393C;" v-if="scope.row.audit==3">审核驳回</p>
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
								<el-table-column prop="procurementMethodNm" label="采购方式" min-width="150"></el-table-column>
								<el-table-column prop="publishTm" label="投标开始时间" min-width="150"></el-table-column>
								<el-table-column label="待审核数" min-width="100" v-if="sonTabIndex==0">
									<template slot-scope='scope'>
										{{scope.row.applyItems.length}}
									</template>
								</el-table-column>
								<el-table-column label="报名数" min-width="100" v-if="sonTabIndex==1">
									<template slot-scope='scope'>
										{{scope.row.applyItems.length}}
									</template>
								</el-table-column>
								<el-table-column label="待审核数" min-width="100" v-if="sonTabIndex==1">
									<template slot-scope='scope'>
										{{scope.row.notAuditNum}}
									</template>
								</el-table-column>
								<el-table-column label="操作" min-width="100">
									<template slot-scope="scope">
										<el-button @click="handleClick(scope.row.id)" type="text" size="small" v-if="auth1">查看</el-button>
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
					<detail :id="id" :sonTabIndex="sonTabIndex"></detail>
				</div>
				<div class="mask" @click="closeMask" v-if="showPop">
					<div class="table_box" @click.stop="">
						<div class="top">
							<p style="font-size: 20px">企业审核</p>
							<img @click="closeMask" src="~assets/img/close.png"
								style="width: 25px; height: 25px;cursor: pointer;" />
						</div>
						<div class="row2">
							<span>{{companyNm}}</span>
							<el-input v-model="idea" type="textarea" :rows="5" resize='none' placeholder="企业审核意见">
							</el-input>
						</div>
						<div class="btn">
							<el-button
								style="background: #2778be; color: #fff; margin-right: 20px; padding: 10px 25px; border-radius: 4px;"
								@click="pass" type="text" size="small">通过</el-button>
							<el-button
								style="background: #fff; color: #333; border: 1px solid #dddddd; padding: 10px 25px; border-radius: 4px;"
								@click="reject" type="text" size="small">驳回</el-button>
						</div>
					</div>
				</div>
				<orgEnter v-if="orgEnterShow" :orgEnterId="orgEnterId"></orgEnter>
			</div>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
	import myFooter from '@/components/footer';
	import myHeader from '@/components/myHeader';
	import leftMenu from '@/components/leftMenu';
	import topNav from '@/components/topNav';
	import detail from '@/components/toubiao/detail';
	import orgEnter from '@/components/toubiao/orgEnterInfo';
	export default {
		data() {
			return {
				auth1:'',//详情权限
				auth2: '', //审核权限
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
				sonTabList: ["待审核", "全部"],
				sonTabIndex: 0,
				tableData: [],
				cd: '',
				nm: '',
				options: [],
				procurementMethodCd: '',
				bidOpenTm: '',
				bidEndTm: '',
				showDetail: false,
				companyId: '',
				companyNm: '',
				showPop: false,
				idea: '',
				orgEnterShow: false,
				orgEnterId: ''
			}
		},
		computed: {

		},
		components: {
			myFooter,
			myHeader,
			leftMenu,
			detail,
			topNav,
			orgEnter
		},
		mounted() {
			this.auth1 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid2:info')>-1)
			this.auth2 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bidApply:audit') > -1)
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
				let data = 0
				if(this.sonTabIndex == 0) {
					data = 1
				} else if(this.sonTabIndex == 1) {
					data = 2
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
				if(this.bidOpenTm) {
					this.query.toW(qry,'bidOpenTm',this.until.formatTime(this.bidOpenTm[0])+','+this.until.formatTime(this.bidOpenTm[1]),'BT')
				}
				if(this.bidEndTm) {
					this.query.toW(qry,'bidEndTm',this.until.formatTime(this.bidEndTm[0])+','+this.until.formatTime(this.bidEndTm[1]),'BT')
				}
				this.api.getBidAuditList(this.query.toEncode(qry),data).then(res => {
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
			},
			handleClickShenhe(row) {
				this.idea = ''
				this.companyId = row.id
				this.companyNm = row.orgNm
				this.showPop = true
			},
			closeMask() {
				this.showPop = false
			},
			pass() {
				let data = {
					"id": this.companyId,
					"audit": 2,
					"options": this.idea
				}
				this.api.postBidApplyAudit(data).then(res => {
					if (res.code == 0) {
						this.$message.success(res.msg)
						this.showPop = false;
						this.getList()
					}
				})
			},
			reject() {
				let data = {
					"id": this.companyId,
					"audit": 3,
					"options": this.idea
				}
				this.api.postBidApplyAudit(data).then(res => {
					if (res.code == 0) {
						this.$message.success(res.msg)
						this.showPop = false;
						this.getList()
					}
				})
			},
			showInfo(id) {
				this.orgEnterShow = true
				this.orgEnterId = id
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
							width: 100px;
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
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 50;
		display: flex;
		justify-content: center;
		align-items: center;
	
		.table_box {
			background: #fff;
			padding: 20px;
			width: 450px;
			max-height: 80%;
			overflow-y: scroll;
	
			.top {
				display: flex;
				width: 100%;
				justify-content: space-between;
			}
	
			.row2 {
				width: 400px;
				padding: 30px;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
	
				span {
					font-size: 16px;
					color: #2778BE;
					margin-bottom: 20px;
				}
			}
	
			.btn {
				width: 300px;
				margin: 10px auto 0;
				display: flex;
				justify-content: center;
			}
		}
	
		.org-img {
			// width: 75%;
			// height: 60%;
		}
	
		.close-img {
			width: 40px;
			height: 40px;
			position: absolute;
			top: 10px;
			right: 10px;
			cursor: pointer;
		}
	}
</style>
