<template>
	<div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:bWidth + 'px'}">
			<leftMenu tabIndex='6-1'></leftMenu>
			<div class="right">
				<topNav :activeName='activeName' :list="thisNavList"></topNav>
				<div class="content">
					<div class="topSeachBox">
						<el-input placeholder="项目编号" v-model="cd" clearable>
						</el-input>
						<el-input placeholder="项目名称" v-model="nm" clearable>
						</el-input>
						<el-input placeholder="联系人" v-model="linkman" clearable>
						</el-input>
						<el-select v-model="value" clearable placeholder="采购方式" @change="select1">
							<el-option v-for="item in options" :key="item.nm" :label="item.nm"
								:value="item.cd">
							</el-option>
						</el-select>
						<el-date-picker v-model="date1" type="datetime" placeholder="创建时间">
						</el-date-picker>
						
						<el-select v-model="value1" clearable placeholder="项目状态"@change="select2">
							<el-option v-for="item in optionsTwo" :key="item.nm" :label="item.nm"
								:value="item.cd">
							</el-option>
						</el-select>
						<el-button plain type="primary" @click='searchTo'>查询</el-button>
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
							<el-table-column type="index" label="序号" min-width="50">
							</el-table-column>
							<el-table-column prop="cd" label="项目编号" min-width="150">
							</el-table-column>
							<el-table-column prop="nm" label="项目名称" min-width="150">
							</el-table-column>
							<el-table-column prop="linkman" label="联系人" min-width="100">
							</el-table-column>
							<el-table-column prop="procurementMethodNm" label="采购方式" min-width="100">
							</el-table-column>
							<el-table-column prop="budget" label="预算金额(万元)" min-width="100">
							</el-table-column>
							<el-table-column prop="crtTm" label="创建时间" min-width="150">
							</el-table-column>
							<el-table-column label="状态" min-width="100">
								<template slot-scope="scope">
				
									<span v-if="scope.row.deposits.length>0" style="color: #E4393C;">
										<p v-if="scope.row.deposits[0].paymentTm">已退还</p>
										<p v-if="!scope.row.deposits[0].paymentTm">未退还</p>
									</span>
									<span v-if="scope.row.deposits.length==0" style="color: #2778BE;">
										<p >未退还</p>
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
				cd:'',
				nm:'',
				linkman:'',
				procurementMethodCd:'',
				activeName: '',
				thisNavList: [],
				options:[],
				optionsTwo:[{
					nm:'已退还',
					cd:'1'
				},
				{
					nm:'未退还'
				}
				],
				loading: false,
				bWidth: 0,
				width: 0,
				pageNo: 1,
				pageSize: 6,
				currentPage:1,
				total: 0,
				value:'',
				value1:'',
				tableData: [
				],
				date1:'',
				date2:'',
				
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
			this.api.getCatListByPcd({
				cd: 'PROCUREMENT_METHOD'
			}).then(res => {
				this.options = res.list
			})
			this.getList()


		},
		methods: {
			getList(){
				let query=this.query.new()
				this.query.toP(query,this.pageNo,this.pageSize)
				this.query.toW(query,'cd',this.cd,'LK')
				this.query.toW(query,'nm',this.nm,'LK')
				this.query.toW(query,'linkman',this.linkman,'LK')
				this.query.toW(query,'procurementMethodCd',this.procurementMethodCd,'LK')
				this.query.toW(query,'date1',this.date1,'LK')
				this.api.getPageWithWinBidOffer(this.query.toEncode(query)).then(res=>{
					this.tableData=res.data.list
					this.total=res.page.total
				})
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
			currentPage(val){
				this.pageNo = `${val}`
				this.getList()
			},
			select1(val){
				this.procurementMethodCd=val
			},
			select2(){
				
			},
			searchTo(){
				this.getList()
			},
			handleCurrentChange(val){
				this.pageNo=`${val}`
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
