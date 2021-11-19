<template>
	<div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:bWidth + 'px'}">
			<leftMenu tabIndex='6-1'></leftMenu>
			<div class="right">
				<topNav :activeName='activeName' :list="thisNavList"></topNav>
				<div class="content" v-if="showDetail==false&&auth1">
					<div class="topSeachBox">
						<el-input placeholder="项目编号" v-model="cd" clearable>
						</el-input>
						<el-input placeholder="项目名称" v-model="nm" clearable>
						</el-input>
						<el-input placeholder="联系人" v-model="linkman" clearable>
						</el-input>
						<el-select v-model="value" clearable placeholder="采购方式" @change="select1">
							<el-option v-for="item in options" :key="item.nm" :label="item.nm" :value="item.cd">
							</el-option>
						</el-select>
						<el-date-picker v-model="date1" type="datetime" placeholder="创建时间">
						</el-date-picker>

						<el-select v-model="value1" clearable placeholder="项目状态" @change="select2">
							<el-option v-for="item in optionsTwo" :key="item.nm" :label="item.nm" :value="item.cd">
							</el-option>
						</el-select>
						<el-button plain type="primary" @click='searchTo'>查询</el-button>
					</div>
					<div class="middleBox">
						<div class="middleLeft">
							保证金未退金额：{{noRefund}}元
						</div>
						<div class="middleRight">
							保证金已退金额：{{refunded}}元
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
							<el-table-column prop="budget" label="预算金额(元)" min-width="100">
							</el-table-column>
							<el-table-column prop="crtTm" label="创建时间" min-width="150">
							</el-table-column>
							<el-table-column label="状态" min-width="100">
								<template slot-scope="scope">
									<span v-if="scope.row.depositReturnStatus==1" style="color: #E4393C;">未退还</span>
									<span v-if="scope.row.depositReturnStatus==2" style="color: #E4393C;">部分退还</span>
									<span v-if="scope.row.depositReturnStatus==3" style="color: rgb(39, 120, 190);">全部退还</span>
								</template>
							</el-table-column>
							<el-table-column label="操作" min-width="50">
								<template slot-scope="scope">
									<div @click="tolook(scope.row)" 	
										style="color: rgb(39, 120, 190);font-size: 15px;cursor: pointer;" v-if="auth2">查看</div>
										<div @click="toGuidang(scope.row)" class="" style="font-size: 15px;color:#ffffff;cursor: pointer;padding: 5px 10px;background-color:rgb(39, 120, 190);">
											归档
										</div>
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
				<div class="detail" v-if="showDetail==true">
					<div class="detailBox">
						<div class="detailTitle">
							<span>{{info.nm}}</span>
							<div class="line">
							</div>
							<div class="back" @click="back">
								< 返回 </div>
							</div>
							<div class="detailContent" style="display: flex;">
								<div class="leftbox">
									<div class="leftList">
										<div class="listName">
											项目编号：
										</div>
										<div class="listContent">
											{{info.cd}}
										</div>
									</div>
									<div class="leftList">
										<div class="listName">
											预算金额（元）
										</div>
										<div class="listContent">
											{{info.budget}}
										</div>
									</div>
									<div class="leftList">
										<div class="listName">
											发布时间：
										</div>
										<div class="listContent">
											{{info.publishTm}}
										</div>
									</div>
									<div class="leftList">
										<div class="listName">
											创建时间：
										</div>
										<div class="listContent">
											{{info.crtTm}}
										</div>
									</div>
									<div class="leftList" style="display: flex; align-items: flex-start;">
										<div class="listName">
											说明：
										</div>
										<div class="listContent">
											<p>1、标书投放时间：
												<span style="color: red;">{{info.bidOpenTm}}</span>
											</p>
											<p>2、招标截止时间：
												<span style="color: red;">{{info.bidEndTm}}</span>
											</p>
											<p>（以我司招标办收到的投标标准时间为准）,逾期按弃权处理</p>
											<p>3、联系人：
												<span>{{info.linkman}}</span>
											</p>
											<p>4、联系电话：
												<span>
													{{info.mob}}
												</span>
											</p>
										</div>
									</div>
								</div>
								<div class="rightbox">
									<div class="rightList">
										<div class="listName">
											项目名称：
										</div>
										<div class="listContent">
											{{info.nm}}
										</div>
									</div>
									<div class="rightList">
										<div class="listName">
											保证金缴纳：
										</div>
										<div class="listContent" v-if="info.needDeposit==0">
											不需要
										</div>
										<div class="listContent" v-else>
											需要
										</div>
									</div>
									<div class="rightList">
										<div class="listName">
											投标截止时间：
										</div>
										<div class="listContent">
											{{info.completeTm}}
										</div>
									</div>
									<div class="rightList">
										<div class="listName">
											状态：
										</div>
										<div class="listContent" style="color: red;" v-if="info.audit==1">
											待审核
										</div>
										<div class="listContent" style="color: #2778BE ;" v-if="info.audit==2">
											审核通过
										</div>
										<div class="listContent" style="color: red ;" v-if="info.audit==3">
											审核驳回
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="detailBox">
							<div class="detailTitle">
								<span>招标文件</span>
								<div class="line">
								</div>
								<div class="back" @click="downLoad">
									<i class="el-icon-download" style="margin-right: 10px;font-size: 20px;"></i>
									全部下载
								</div>
							</div>
							<div class="detailContent">
								<div class="fileList" v-for="(item,index) in list" :key='index'>
									<span>
										{{index+1}}、
									</span>
									<div>
										<img :src="item.img" style="width: 100px; height: 100px; cursor: pointer;"
											@click="toLink(item.url)">
										<p style="cursor: pointer;" @click="toLink(item.url)">{{item.fileNm}}</p>
									</div>
								</div>
							</div>
						</div>
					
						<div class="detailBox">
							<div class="detailTitle">
								<div class="line">
								</div>
							</div>
							<div class="detailContent" style=" display:flex; flex-direction: column;">
								<div class="list">
									审核意见：
									<span>{{info.options}}</span>
								</div>
								<div class="list">
									审核时间：{{info.auditTm}}

								</div>
								<div class="list">
									审核状态：
									<span class="listContent" style="color: red;" v-if="info.audit==1">
										待审核
									</span>
									<span class="listContent" style="color: #2778BE ;" v-if="info.audit==2">
										审核通过
									</span>
									<span class="listContent" style="color: red ;" v-if="info.audit==3">
										审核驳回
									</span>
								</div>
							</div>
						</div>
						<div class="detailBox" v-if="auth3">
							<div class="detailTitle">
								<span>投标信息</span>
								<div class="line"></div>
							</div>
							<div class="detailContent">
								<div class="collapse-item" v-for="(item,index) in infoList" :key="index">
									<div class="collapse-top" @click="showMore(index)">
										<div>招标采购商：<span style="color: #2778BE;" v-if="item.apply">{{item.apply.orgNm}}</span></div>
										<div>审核状态：<span
												:style="{color:(item.apply.audit==2?'#2778BE':'#E4393C')}">{{item.apply.audit==2?'通过':'未通过'}}</span><img
												:class="{'collapse-rotate':selectIndex==index}"
												src="../../../assets/img/arrowDownG.png"></div>
									</div>
									<div class="collapse-bottom" v-show="selectIndex==index">

										<div :style="{color:(item.apply.deposits?'#606060':'#E4393C')}" v-if="item.deposot">
											保证金：{{item.deposot.refundTm?'已退':'未退'}}</div>
										<!-- <div class="refundBack" @click="toRefundBack(item.deposot.id)"  v-if="item.deposot">
											保证金退还
										</div> -->
										<div v-if="item.deposot&&item.deposot.crtTm">缴费时间：{{item.deposot.crtTm}}</div>
										<div v-if="item.deposot&&item.deposot.refundTm">退保时间：{{item.deposot.refundTm}}</div>
										<div class="" style="display: flex; flex-wrap: wrap;">


											<div class="fileList" v-for="(item1,index1) in item.newList"
												v-if="item.newList" :key='index1'>
												<span>
													{{index1+1}}、
												</span>
												<div>
													<img :src="item1.img"
														style="width: 100px; height: 100px; cursor: pointer;"
														@click="toLink(item1.url)">
													<p style="cursor: pointer;" @click="toLink(item1.url)">
														{{item1.fileNm}}</p>
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="mask" v-if="showRefund==true" @click="closeMask">
				<div class="table_box" @click.stop="">
					<div class="top">
						<p style="font-size: 20px">保证金退还</p>
						<img @click="closeMask" src="~assets/img/close.png"
							style="width: 25px; height: 25px;cursor: pointer;" alt="" />
					</div>
					<div class="row2">
						<div class="title">
							<span style="color: red; margin-right: 5px; display: inline-block">*
							</span><span>凭证上传</span>
						</div>
						<div class="right">
							<el-upload action="/general/oss/upload" :auto-upload="true" list-type="picture-card"
								:on-preview="handlePictureCardPreview" :on-remove="handleRemove"
								:on-success="handSucess">
								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
								<img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
						</div>
					</div>
					<div class="row2">
						<div class="title">
							<span style="color: red; margin-right: 5px; display: inline-block"></span><span>备注</span>
						</div>
						<div class="right">
							<textarea rows="" cols="" v-model="rmks"></textarea>
						</div>
					</div>
					<div class="twoBtn">
						<div class="leftBtn" @click="cancel">
							取消
						</div>
						<div class="rightBtn" @click="submit">
							确定
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
	import excel from '@/assets/img/excel.png'
	import ppt from '@/assets/img/ppt.png'
	import word from '@/assets/img/word.png'
	import pdf from '@/assets/img/pdf.jpg'
	export default {
		data() {
			return {
				auth1:'',//分页权限
				auth2:'',//详情分页
				auth3:'',//详情下方列表
				rmks: '',
				form: {},
				dialogImageUrl: '',
				dialogVisible: false,
				excel,
				ppt,
				word,
				pdf,
				showDetail: false,
				cd: '',
				nm: '',
				linkman: '',
				procurementMethodCd: '',
				activeName: '',
				thisNavList: [],
				options: [],
				optionsTwo: [{
						nm: '已退还',
						cd: '1'
					},
					{
						nm: '未退还'
					}
				],
				loading: false,
				showRefund: false,
				bWidth: 0,
				width: 0,
				pageNo: 1,
				pageSize: 6,
				currentPage: 1,
				total: 0,
				value: '',
				value1: '',
				tableData: [],
				date1: '',
				date2: '',
				noRefund: '',
				refunded: '',
				attachment: [],
				info: {},
				infoList: [],
				list: [],
				selectIndex: 0,
				imgList: [],
				detailId:'',
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
			this.auth1= JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:pageWithWinBidOffer')>-1)
			this.auth2= JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:info')>-1)
			this.auth3= JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:infoWithWinBid')>-1)
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
			let query2 = this.query.new()
			this.query.toP(query2, 1, 20)
			this.api.getPageWithWinBidOfferSum(this.query.toEncode(query2)).then(res => {
				this.noRefund = res.noRefund
				this.refunded = res.refunded
			})
			this.getList()


		},
		methods: {
			getList() {
				let query = this.query.new()
				this.query.toP(query, this.pageNo, this.pageSize)
				this.query.toW(query, 'cd', this.cd, 'LK')
				this.query.toW(query, 'nm', this.nm, 'LK')
				this.query.toW(query, 'linkman', this.linkman, 'LK')
				this.query.toW(query, 'procurementMethodCd', this.procurementMethodCd, 'LK')
				this.query.toW(query, 'date1', this.date1, 'LK')
				this.api.getPageWithWinBidOffer(this.query.toEncode(query)).then(res => {
					this.tableData = res.data.list
					this.total = res.page.total
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

			select1(val) {
				this.procurementMethodCd = val
			},
			select2() {

			},
			searchTo() {
				this.getList()
			},
			handleCurrentChange(val) {
				this.pageNo = `${val}`
				this.getList()
			},
			tolook(val) {
				this.showDetail = true
				this.api.getBidInfo(val.id).then(res => {
					this.info = res.data
					if (res.data.attachment) {
						this.getInfo(res.data.attachment.split(','))
						this.attachment = res.data.attachment
					}

				})
				this.api.getInfoWithWinBid(val.id).then(res => {
					this.infoList = res
					for (let i = 0; i < this.infoList.length; i++) {
						this.infoList[i].newList = []
						if( this.infoList[i].deposot)
						{
							let data = this.infoList[i].deposot.depositImgUrl.split(',')
						
						let data1 = []
						let fileList2 = []
						if (data.length > 0) {
							data.forEach(v => {
								let type = v.split('.')[v.split('.').length - 1]
								let nmList = v.split('.com/') //分割出url后的内容
								let nm = ""
								nmList.forEach((j, z) => { //防止文件名中有 .com/ 所以循环加入
									if (z != 0) {
										nm += j
									}
								})
								nmList = nm.split('_') //分割随机字符后的内容
								nm = ""
								nmList.forEach((j, z) => { //防止文件名中有 _ 所以循环
									if (z != 0) {
										nm += j
									}
								})
								nm = nm.split('.' + type)[0]
								if (type == 'pdf') {
									fileList2.push({
										url: v,
										img: this.pdf,
										'fileNm': nm
									})
								} else if (type == 'doc' || type == 'docx') {
									fileList2.push({
										url: v,
										img: this.word,
										'fileNm': nm
									})
								} else if (type == 'ppt' || type == 'pptx') {
									fileList2.push({
										url: v,
										img: this.ppt,
										'fileNm': nm
									})
								} else if (type == 'xls' || type == 'xlsx') {
									fileList2.push({
										url: v,
										img: this.excel,
										'fileNm': nm
									})
								} else {
									fileList2.push({
										url: v,
										img: v,
										'fileNm': nm
									})
								}

							})
						}
						if(fileList2[0].url){
							this.infoList[i].newList = fileList2
						}
						}
						
					}
					console.log('78789987', this.infoList);
				})


			},
			back() {
				this.showDetail = false
			},
			toGuidang(val){
				if(val.depositReturnStatus!=3){
					this.$message({
						type: "error",
						message: "保证金未全部退还，归档失败",
					});
					return false
				}
				let obj={
					id:val.id,
					file:1
				}
				this.api.shipBidUpdFile(obj).then(res=>{
					this.getList()
				})
			},
			async getInfo(info) {
				this.list = []
				let data = info
				let data1 = []
				let fileList2 = []
				if (data.length > 0) {
					data.forEach(v => {
						let type = v.split('.')[v.split('.').length - 1]
						let nmList = v.split('.com/') //分割出url后的内容
						let nm = ""
						nmList.forEach((j, z) => { //防止文件名中有 .com/ 所以循环加入
							if (z != 0) {
								nm += j
							}
						})
						nmList = nm.split('_') //分割随机字符后的内容
						nm = ""
						nmList.forEach((j, z) => { //防止文件名中有 _ 所以循环
							if (z != 0) {
								nm += j
							}
						})
						nm = nm.split('.' + type)[0]
						if (type == 'pdf') {
							fileList2.push({
								url: v,
								img: this.pdf,
								'fileNm': nm
							})
						} else if (type == 'doc' || type == 'docx') {
							fileList2.push({
								url: v,
								img: this.word,
								'fileNm': nm
							})
						} else if (type == 'ppt' || type == 'pptx') {
							fileList2.push({
								url: v,
								img: this.ppt,
								'fileNm': nm
							})
						} else if (type == 'xls' || type == 'xlsx') {
							fileList2.push({
								url: v,
								img: this.excel,
								'fileNm': nm
							})
						} else {
							fileList2.push({
								url: v,
								img: v,
								'fileNm': nm
							})
						}

					})
				}
				if (fileList2[0].url) {
					this.list = fileList2
				}
				console.log('1111', this.list);

			},
			downLoad() {
				window.open(`https://fb.ship88.cn/general/oss/aliDownload?urls=${this.attachment}&zipName=''`)
			},
			toLink(url) {
				window.open(url)
			},
			showMore(index) {
				this.selectIndex = index
			},
			toRefundBack(id) {
				this.showRefund = true
				this.detailId=id
			},
			closeMask() {
				this.showRefund = false
				this.rmks=""
				this.imgList=""
			},
			handleRemove(file, fileList) {
				console.log('44', this.imgList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handSucess(response, file, fileList) {
				if (fileList.length > 0) {
					this.imgList = fileList
				}
				console.log('44', this.imgList);
			},
			cancel(){
				this.closeMask()
			},
			submit(){
				let img=[]
				if(this.imgList){
					for(let i=0;i<this.imgList.length;i++){
						img.push(this.imgList[i].response.data)
					}
				}
				img=img.join(",")
				console.log(img);
				let obj={
					id:this.detailId,
					refundImgUrl:img,
					rmks:this.rmks,
				}
				this.api.postReturnOfDownPayment(obj).then(res=>{
					this.closeMask()
				})
				
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
				margin-top: 10px;
				.topSeachBox {
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
						width: 20%;
						margin-left: 30px;
						margin-bottom: 20px;
					}

				}

				.middleBox {
					display: flex;
					background-color: #ffffff;
					width: 30%;
					justify-content: space-between;
					margin-left: 20px;

					.middleLeft {
						font-size: 14px;
						font-weight: 400;
						color: #E4393C;
					}

					.middleRight {
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

				.Footer {
					width: 100%;
					text-align: center;
					margin-bottom: 10px;
				}
			}

			.detail {
				height: 740px;
				box-sizing: border-box;
				overflow-y: scroll;
				background-color: white;
				// margin-left: 10px;
				padding: 29px 41px;
				margin-top: 10px;

				.detailBox {
					.detailTitle {
						display: flex;
						align-items: center;

						span {
							font-size: 16px;
							font-weight: 400;
							color: #333333;
						}

						.line {
							display: flex;
							flex: 1;
							height: 1px;
							background: #000000;
							opacity: 0.1;
							margin-left: 22px;
						}

						.back {
							font-size: 14px;
							font-weight: 400;
							color: #909090;
							margin-left: 16px;
							cursor: pointer;
						}
					}

					.detailContent {
						padding: 30px;
						box-sizing: border-box;

						.list {
							margin-top: 30px;
							font-size: 14px;
							font-weight: 400;
							color: #606060;
						}

						.leftbox {
							width: 50%;

							.leftList {
								display: flex;
								margin-bottom: 30px;
								align-items: center;

								.listName {
									font-size: 14px;
									font-weight: 400;
									color: #606060;
								}

								.listContent {
									font-size: 14px;
									font-weight: 400;
									color: #606060;

									img {
										width: 50px;
										height: 50px;
										margin-left: 25px;
									}

									p {
										font-size: 14px;
										font-weight: 400;
										color: #606060;
										margin-bottom: 20px;

									}
								}
							}
						}

						.rightbox {
							width: 50%;

							.rightList {
								display: flex;
								margin-bottom: 30px;

								.listName {
									font-size: 14px;
									font-weight: 400;
									color: #606060;
								}

								.listContent {
									font-size: 14px;
									font-weight: 400;
									color: #606060;

								}
							}
						}

						.collapse-item {
							width: 100%;

							.collapse-top {
								width: 100%;
								height: 52px;
								display: flex;
								align-items: center;
								justify-content: space-between;
								background-color: #F8F8F8;
								padding-left: 50px;
								padding-right: 30px;
								box-sizing: border-box;
								font-size: 14px;
								color: #606060;

								img {
									margin-left: 80px;
								}

								.collapse-rotate {
									transform: rotate(180deg);
								}
							}

							.collapse-bottom {
								position: relative;
								width: 100%;
								padding-left: 50px;
								padding-right: 30px;
								box-sizing: border-box;
								font-size: 14px;
								color: #606060;

								.refundBack {
									position: absolute;
									top: 0;
									right: 50px;
									padding: 10px;
									background-color: #2778BE;
									color: #ffffff;
									font-size: 14px;
									box-sizing: border-box;
									border-radius: 10px;
									cursor: pointer;
								}

								.fileList {
									width: 25%;
									margin-top: 20px;
									display: flex;
								}

								div {
									margin: 15px 0;
								}
							}
						}

					}
				}

				.bottomBtn {
					display: flex;
					margin-top: 50px;
					padding-left: 30px;

					.btnLeft {
						width: 86px;
						height: 35px;
						background: #2778BE;
						border-radius: 4px;
						font-size: 16px;
						font-weight: 400;
						color: #FFFFFF;
						text-align: center;
						line-height: 35px;
						cursor: pointer;
					}

					.btnLeft:hover {
						opacity: 0.5;
					}

					.btnRight {
						width: 86px;
						height: 35px;
						background: #FFFFFF;
						border: 1px solid #DDDDDD;
						border-radius: 4px;
						font-size: 16px;
						font-weight: 400;
						color: #999999;
						line-height: 35px;
						text-align: center;
						margin-left: 30px;
						cursor: pointer;
					}

					.btnRight:hover {
						opacity: 0.5;
					}
				}
			}

			.detail::-webkit-scrollbar {
				display: none;
			}
		}
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		z-index: 50;
		display: flex;
		justify-content: center;
		align-items: center;

		.table_box {
			.twoBtn {
				display: flex;
				margin: 50px auto;
				justify-content: center;

				.leftBtn {
					width: 70px;
					height: 35px;
					border-radius: 5px;
					color: #000000;
					background-color: #ffffff;
					text-align: center;
					line-height: 35px;
					border: 1px solid #cccccc;
					font-size: 14px;
					cursor: pointer;
				}

				.rightBtn {
					width: 70px;
					height: 35px;
					border-radius: 5px;
					text-align: center;
					line-height: 35px;
					background-color: #2778BE;
					font-size: 14px;
					color: #ffffff;
					margin-left: 50px;
					cursor: pointer;
				}
			}

			background: #fff;
			padding: 20px;
			width: 850px;
			max-height: 80%;
			overflow-y: scroll;

			.top {
				display: flex;
				width: 100%;
				justify-content: space-between;
			}

			.row2 {
				width: 700px;
				margin: 30px auto 20px;
				display: flex;
				align-items: center;

				// justify-content: space-between;
				.title {
					width: 100px;
					display: flex;
					align-items: center;
					justify-content: end;
					margin-right: 10px;
				}

				.right {
					textarea {
						width: 517px;
						height: 255px;
						resize: none;
						padding: 5px;
						box-sizing: border-box;
					}

					.el-input,
					.el-textarea {
						height: 32px;
						width: 370px;
						margin-left: 12px;
					}

					.el-input-number {
						height: 32px;
						width: 160px;
						margin-left: 12px;
					}
				}
			}
		}
	}

	.gray {
		color: #999999;
	}
</style>
