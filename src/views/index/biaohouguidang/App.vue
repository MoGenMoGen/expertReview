<template>
	<div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:bWidth + 'px'}">
			<leftMenu tabIndex='6-2'></leftMenu>
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
							<el-option v-for="item in options" :key="item.nm" :label="item.nm"
								:value="item.cd">
							</el-option>
						</el-select>
						<el-date-picker v-model="bidDecideTm" type="datetime" placeholder="中标时间">
						</el-date-picker>
						<el-select v-model="value1" clearable placeholder="文件归档状态" @change="select2">
							<el-option v-for="item in optionsTwo" :key="item.nm" :label="item.nm"
								:value="item.cd">
							</el-option>
						</el-select>
						<el-button plain @click='search'>查询</el-button>
						<!-- <el-button plain type="primary" @click='toTotalfile'>归档</el-button> -->
					</div>
					<div class="bodyTable">
						<el-table  ref="multipleTable":data="tableData" style="width: 100%" tooltip-effect="dark" :cell-style="{
							    'text-align': 'center',
							    color: '#333',
							    'font-weight': '500',
							  }" :header-cell-style="{
							    color: '#606060',
							    background: '#f8f8f8',
							    'text-align': 'center',
							  }"  @selection-change="handleSelectionChange">
							 <el-table-column type="selection" min-width="50">
							  </el-table-column>
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
							<el-table-column prop="bidDecideTm" label="中标时间" min-width="100">
							</el-table-column>
							<el-table-column prop="attachment2" label="招标文件数量" min-width="150">
								
							</el-table-column>
							<el-table-column prop="file" label="状态" min-width="100">
								<template slot-scope="scope">
									<span v-if="scope.row.file=='0'||!scope.row.file" style="color: #E4393C;">
										未归档
									</span>
									<span v-if="scope.row.file=='1'" style="color: #2778BE;">
										已归档
									</span>
					
								</template>
							</el-table-column>
							<el-table-column label="操作" min-width="100">
								<template slot-scope="scope">
									<!-- <el-button @click="tolook(scope.row)" type="text" size="small" style="color: #2778BE;">查看</el-button> -->
									<p style="color:#2778BE ; cursor: pointer;" @click="toDetail(scope.row)" v-if="auth2">查看</p>
									<div style="color:#ffffff ; padding: 4px 8px; background-color:#2778BE ;box-sizing: border-box; cursor: pointer;"@click="cancelFile(scope.row)" v-if="auth4">取消归档</div>
									<!-- <div style="color:#ffffff ; padding: 4px 8px;background-color:#2778BE ;box-sizing: border-box; cursor: pointer;"@click="toFile(scope.row)" v-if="(scope.row.file==1||!scope.row.file)&&auth4">归档</div> -->
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
				<div class="detail"  v-if="showDetail==true" >
					<div class="detailBox">
						<div class="detailTitle">
							<span>{{info.nm}}</span>
							<div class="line">
							</div>
							<div class="back" @click="back">
								< 返回 </div>
							</div>
							<div class="detailContent">
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
											预算金额(元)
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
									<div class="leftList">
										<div class="listName">
											备注说明：
										</div>
										<div class="listContent">
											<p>1、标书投放时间：
												<span style="color: red;">{{info.bidOpenTm}}</span>
											</p>
											<p>2、招标截止时间：
												<span style="color: red;">{{info.bidEndTm}}</span>
											</p>
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
								<div class="rightBox">
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
								<div class="back"@click="downLoad">
									<i class="el-icon-download" style="margin-right: 10px;font-size: 20px;" ></i>
									全部下载 </div>
							</div>
							<div class="detailContent">
							<div class="fileList" v-for="(item,index) in list" :key='index' >
								<span>
									{{index+1}}、
								</span>
								<div >
									<img :src="item.img"  style="width: 100px; height: 100px; cursor: pointer;" @click="toLink(item.url)" >
									<p style="cursor: pointer;" @click="toLink(item.url)">{{item.fileNm}}</p>
								</div>
								
							</div>
							
							</div>
						</div>
						<div class="detailBox">
							<div class="detailTitle">
								<span>视频</span>
								<div class="line">
								</div>
							</div>
							<div class="detailContent">
								<div class="fileList" v-for="(item,index) in videoList" :key='index' >
									<span>
										{{index+1}}、
									</span>
									<div >
										<video :src="item.vedioUrl" controls style="width: 200px;height: 200px;">
										</video>
									</div>
									
								</div>
							</div>
						</div>
						<div class="detailBox" style="margin-top: 20px;">
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
										<div>审核状态：<span :style="{color:(item.apply.audit==2?'#2778BE':'#E4393C')}">{{item.apply.audit==2?'通过':'未通过'}}</span><img :class="{'collapse-rotate':selectIndex==index}" src="../../../assets/img/arrowDownG.png"></div>
									</div>
									<div class="collapse-bottom" v-show="selectIndex==index" >
										<div style="display: flex;">
										<div class="leftBox">
											<div v-if="item.apply.depositStatus==1" style="color:#606060;">保证金：无需缴纳</div>
											<div v-if="item.apply.depositStatus==2" style="color:#E4393C;">保证金：应缴未缴</div>
											<div v-if="item.apply.depositStatus==3" style="color:#2778BE;">保证金：已缴纳</div>
											<div v-if="item.apply.depositStatus==4" style="color:#2778BE;">保证金：已退款</div>
											<div v-if="item.deposot&&item.deposot.crtTm">缴费时间：{{item.deposot.crtTm}}</div>
											<div v-if="item.deposot&&item.deposot.refundTm">退保时间：{{item.deposot.refundTm}}</div>
											<div class="imgList" v-if="item.deposot">
												<div class="listTitle">
													保证金上传凭证：
												</div>
												<div class="listContent">
													<el-image  :src="item2"  :preview-src-list=" item.deposot.depositImgUrl" v-for="(item2,index2) in item.deposot.depositImgUrl" :key="index2"> </el-image>
												</div>
											</div>
										</div>
										<div class="rightBox" >
											<div  style="display: flex;">
											<div class="title" style="color: #2778BE;">
												专家评标信息:
											</div>
											<div class="rightContent" style="margin: 0 0 0  15px  " >
												<div class="contentList"  v-for="(item1,index1) in item.SvsResult"  >
													<div class="name">
														<span>专家姓名：{{item1.shipBidSvsResultVo.username}}</span>
														<span style="margin-left: 15px;">专家评分：{{item1.shipBidSvsResultVo.score}}</span>
													</div>
												
												</div>
											</div>
											</div>
											<div class="imgList" v-if="item.deposot">
												<div class="listTitle">
													保证金退回凭证：
												</div>
												<div class="listContent">
													<el-image  :src="item2"  :preview-src-list=" item.deposot.refundImgUrl" v-for="(item2,index2) in item.deposot.refundImgUrl" :key="index2"> </el-image>
												</div>
											</div>
										</div>
											</div>
									
										
										<div style="color:#606060;">投标报价金额：</div>
									</div>
								</div>
							</div>
						</div>
					</div>
			</div>
		</div>
		<my-footer></my-footer>
	</div>
</template>

<script>
	import excel from '@/assets/img/excel.png'
	import ppt from '@/assets/img/ppt.png'
	import word from '@/assets/img/word.png'
	import pdf from '@/assets/img/pdf.jpg'
	import myFooter from '@/components/footer';
	import myHeader from '@/components/myHeader';
	import leftMenu from '@/components/leftMenu';
	import detail from '@/components/zhaobiao/detail';
	import change from '@/components/zhaobiao/change';
	import topNav from '@/components/topNav';
	export default {
		data() {
			return {
				auth1:'',//分页权限
				auth2:'',//详情权限
				auth3:'',//详情下方信息权限
				auth4:'',//归档权限
				videoList:[],
				excel,
				ppt,
				word,
				pdf,
				fileList:[],
				cd:'',
				selectIndex:0,
				attachment:[],
				nm:'',
				linkman:'',
				bidDecideTm:'',
				currentPage:1,
				procurementMethodNm:'',
				procurementMethodCd:'',
				file:'',
				options:[],
				optionsTwo:[{
					nm:'未留档',
					cd:'1'
				},
				{
					nm:'已留档',
					cd:'2'
				}
				],
				activeName: '',
				thisNavList: [],
				loading: false,
				bWidth: 0,
				width: 0,
				pageNo: 1,
				pageSize: 5,
				total: 0,
				value:'',
				value1:'',
				info:{},
				showDetail:false,
				tableData: [
				],
				list:[],
				infoList:[],
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
			this.auth1= JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:pageWithWinBid')>-1)
			this.auth2= JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:info')>-1)
			this.auth3= JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:infoWithWinBid')>-1)
			this.auth4= JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:file')>-1)
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
			downLoad(){
				console.log(111, this.attachment);
			window.open(`https://fb.ship88.cn/general/oss/aliDownload?urls=${this.attachment}&zipName=''`)
			},
			showMore(index){
				this.selectIndex=index
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
				console.log('11',fileList2)
				if(fileList2[0].url){
					this.list = fileList2
				}
				
			},
			getList(){
				let query=this.query.new()
				this.query.toP(query, this.pageNo, this.pageSize)
				this.query.toW(query,'cd',this.cd,'LK')
				this.query.toW(query,'nm',this.nm,'LK')
				this.query.toW(query,'linkman',this.linkman,'LK')
				this.query.toW(query,'procurementMethodCd',this.procurementMethodCd,'LK')
				this.query.toW(query,'bidDecideTm',this.bidDecideTm,'LK')
				this.query.toW(query,'file',this.file,'LK')
				this.api.getPageWithWinBid(this.query.toEncode(query)).then(res=>{
					console.log(res);
					this.tableData=res.data.list
					this.total=res.page.total
					for(let i=0;i<this.tableData.length;i++){
						if(this.tableData[i].attachment){
							this.tableData[i].attachment2=this.tableData[i].attachment.split(',').length
						}
						else{
							this.tableData[i].attachment2=0
						}
					}
				})
			},
			handleSelectionChange(val){
				this.fileList=val
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
			toDetail(val){
				this.showDetail=true
				let qry=this.query.new()
				this.query.toW(qry,'bidId',val.id,"EQ")
				this.query.toO(qry,'sort','asc')
				this.api.bidVideoList(this.query.toEncode(qry)).then(res=>{
					this.videoList=res.data.list
					
				
				})
				this.api.getBidInfo(val.id).then(res=>{
					this.info=res.data
					if(res.data.attachment){
						this.getInfo(res.data.attachment.split(','))
						this.attachment=res.data.attachment
					}
					
				})
				this.api.getInfoWithWinBid(val.id).then(res=>{
					this.infoList=res
					this.infoList.forEach(item=>{
						if(item.deposot){
							item.deposot.depositImgUrl=item.deposot.depositImgUrl.split(",")
							item.deposot.refundImgUrl=item.deposot.refundImgUrl.split(",")
						}
					})
					for(let i=0;i<this.infoList.length;i++){
						this.infoList[i].newList = []
						let data
						if(this.infoList[i].apply.attachment==''){
							data = []
						} else {
							data = this.infoList[i].apply.attachment.split(',')
						}
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
						console.log(fileList2)
						this.infoList[i].newList  = fileList2
					}
				})
			},
			select1(val){
				this.procurementMethodCd=val
			},
			select2(val){
				this.file=val
			},
			search(){
				this.getList()
			},
			// toFile(val){
			// 	this.info=val
			// 	this.info.file=2
			// 	this.api.postBidUpd(this.info).then(res=>{
			// 		this.getList()
			// 	})
			// },
			toLink(url){
			 window.open(url)	
			},
			cancelFile(val){
				let obj={
					id:val.id,
					file:0
				}
				this.api.shipBidUpdFile(obj).then(res=>{
					this.getList()
				})
			}, 
			// toTotalfile(){
			// 	for(let i=0;i<this.fileList.length;i++){
			// 		this.fileList[i].file=2
			// 		this.api.postBidUpd(this.fileList[i]).then(res=>{
			// 			this.getList()
			// 	})
			// 	}
				
			// },
			handleCurrentChange(val){
				this.pageNo = `${val}`
				this.getList()
			},
			back(){
				this.showDetail=false
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
				margin-top: 10px;
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
						width:9.1%;
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
						.list{
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
						.fileList {
							width: 25%;
							margin-top: 20px;
							display: flex;
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
								width: 100%;
								padding-left: 50px;
								padding-right: 30px;
								box-sizing: border-box;
								font-size: 14px;
								color: #606060;
								.leftBox{
									width: 50%;
									div {
										margin: 15px 0;
									}
								}
								.rightBox{
									width: 50%;
									div {
										margin: 15px 0;
									}
								}
								.imgList{
									margin-top: 10px;
									.listContent{
										display: flex;
										flex: warp;
										.el-image{
											width: 150px;
											height: 150px;
											margin-left: 15px;
										}
									}
								}
								
							}
						}
						
					}
				}
			
				.bottomBtn {
					display: flex;
					margin-top:50px ;
					padding-left: 30px;
					.btnLeft{
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
					.btnLeft:hover{
						opacity: 0.5;
					}
					.btnRight{
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
					.btnRight:hover{
						opacity: 0.5;
					}
				}
			}
			.detail::-webkit-scrollbar {
				display: none;
			}
		}
	}

	.gray {
		color: #999999;
	}
</style>
