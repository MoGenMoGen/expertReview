<template>
	<div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:bWidth + 'px'}">
			<leftMenu tabIndex='5-1'></leftMenu>
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
							<!-- <el-date-picker v-model="value3" type="datetime" style="flex: 2;" placeholder="实际投标时间"></el-date-picker> -->
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
								<el-table-column label="项目信息" min-width="250">
									<template slot-scope="scope">
										<p>项目编号：{{scope.row.cd}}</p>
										<p>项目名称：{{scope.row.nm}}</p>
									</template>
								</el-table-column>
								<!-- <el-table-column prop="unit" label="采购单位" min-width="150"></el-table-column> -->
								<el-table-column prop="procurementMethodNm" label="采购方式" min-width="150"></el-table-column>
								<el-table-column prop="bidOpenTm" label="开标时间" min-width="100"></el-table-column>
								<el-table-column prop="budget" label="预算金额(元)" min-width="100">
									<template slot-scope="scope">
										{{scope.row.budget?fmoney(scope.row.budget):''}}
									</template>
								</el-table-column>
								<el-table-column prop="applyNum" label="有效标数" min-width="100"></el-table-column>
								<el-table-column label="操作" min-width="100">
									<template slot-scope="scope">
										<el-button @click="handleClick(scope.row)" type="text" size="small" v-if="auth2">查看结果</el-button>
										<!-- <br>
										<el-button type="text" size="small" style="background: #2778BE;color: #ffffff; border-radius: 2px;width: 50px;" >确认</el-button> -->
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
			</div>
		</div>
		<my-footer></my-footer>
		<result :id='id' :row="row" v-if="showResult"></result>
	</div>
</template>

<script>
	import myFooter from '@/components/footer';
	import myHeader from '@/components/myHeader';
	import leftMenu from '@/components/leftMenu';
	import detail from '@/components/zhaobiao/detail';
	import change from '@/components/zhaobiao/change';
	import topNav from '@/components/topNav';
	import result from '@/components/dingbiao/result';
	export default {
		data() {
			return {
				auth1:'',//查询权限
				auth2:'',//结果查看权限
				id: '',
				row: {},
				showResult: false,
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
				tableData: [],
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
			detail,
			change,
			topNav,
			result
		},
		mounted() {
			this.auth1= JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:pageWithApplicationsNum')>-1)
			this.auth2= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidOffer:page')>-1)
			let obj = {
				name: '定标项目',
				url: './dingbiao.html',
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
			fmoney(s, n) {
			    n = n > 0 && n <= 20 ? n : 2;
			    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
			    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
			    var t = "";
			    for (let i = 0; i < l.length; i++) {
			        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
			    }
			    return t.split("").reverse().join("") + "." + r;
			},
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
				this.pageNo = val
				this.getList()
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
				this.api.getBidTargetList(this.query.toEncode(qry)).then(res => {
					this.tableData = res.data.list
					this.total = res.page.total
				})
			},
			searchList() {
				this.getList()
			},
			handleClick(row) {
				this.row = row
				this.id = row.id
				this.showResult = true
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
			.content{
				margin-top: 10px;
				background-color: #ffffff;
				width: 100%;
				height: 740px;
				.topSeachBox{
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
				.content-list {
					display: flex;
					flex-direction: column;
					background-color: #FFF;
					padding: 0 20px;
					box-sizing: border-box;
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
