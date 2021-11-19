<template>
<div class="containerTwo">
	<div class="detailBox" >
		<div class="detailContent">
			<div class="collapse-item" v-for="(item,index) in infoList" :key="index">
				<div class="collapse-top" @click="showMore(index)">
					<div>招标采购商：<span style="color: #2778BE;" v-if="item.apply">{{item.apply.orgNm}}</span></div>
					<div>审核状态：<span :style="{color:(item.apply.audit==2?'#2778BE':'#E4393C')}">{{item.apply.audit==2?'通过':'未通过'}}</span><img :class="{'collapse-rotate':selectIndex==index}" src="../../assets/img/arrowDownG.png"></div>
				</div>
				<div class="collapse-bottom" v-show="selectIndex==index" >
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
						<div class="imgList" v-if="item.deposot.refundImgUrl">
							<div class="listTitle">
								保证金退回凭证：
							</div>
							<div class="listContent">
								<el-image  :src="item2"  :preview-src-list=" item.deposot.refundImgUrl"  v-for="(item2,index2) in item.deposot.refundImgUrl" :key="index2"> </el-image>
							</div>
						</div>
					<div style="color:#2778BE;">投标报价金额：<span>{{item.offer.shipBidOfferVo.offerAmt}}</span></div>
					<div class="fileTitle"  v-if="item.offer.shipBidOfferVo.attachDecode">
						投标文件
					</div>
					<div style="display: flex;flex-wrap: wrap;" v-if="item.offer.shipBidOfferVo.attachDecode">
						 <div class="fileImg" v-for="(item1,index1) in item.newList" :key="index1" style="margin: 0 20px;" >
						     <span>
						     	{{index1+1}}、
						     </span>
						     <div>
						     	<img :src="item1.img"  style="width: 100px; height: 100px; cursor: pointer;" @click="toLink(item1.url)"  >
						     	<p style="cursor: pointer;"  @click="toLink(item1.url)">{{item1.fileNm}}</p>
						     </div>
						     
						 </div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="detailContent">
						<el-table :data="tableData" style="width: 100%" :cell-style="{
					'text-align': 'center',
					color: '#333',
					'font-weight': '500',
	}" :header-cell-style="{
					color: '#606060',
					background: '#f8f8f8',
					'text-align': 'center',
	}">
							<el-table-column label="招标采购商" min-width="200">
								<template slot-scope="scope">
									<p style="color: #2778BE;cursor: pointer;" @click="showInfo(scope.row.orgId)">
										{{scope.row.orgNm}}
									</p>
								</template>
							</el-table-column>
							<el-table-column prop="crtTm" label="申请时间" min-width="200"></el-table-column>
							<el-table-column label="审核状态" min-width="200">
								<template slot-scope="scope">
									<p v-if="scope.row.audit==1" style="color: #2778BE;">待审核</p>
									<p v-if="scope.row.audit==2" style="color: #2778BE;">审核通过</p>
									<p v-if="scope.row.audit==3" style="color: #E4393C;">审核不通过</p>
								</template>
							</el-table-column>
							<el-table-column prop="options" label="审核意见" min-width="200" >
							</el-table-column>
						
						</el-table>
						<div class="Footer">
						  <el-pagination
						    background
						    @current-change="handleCurrentChange"
						    :page-size="pageSize"
						    layout="prev, pager, next, jumper"
						    :total="total"
						  >
						  </el-pagination>
						</div>
					</div>
						<orgEnter v-if="orgEnterShow" :orgEnterId="orgEnterId"></orgEnter>
</div>
		


</template>

<script>
	import excel from '@/assets/img/excel.png'
	import ppt from '@/assets/img/ppt.png'
	import word from '@/assets/img/word.png'
	import pdf from '@/assets/img/pdf.jpg'
	import orgEnter from '@/components/toubiao/orgEnterInfo';
	export default{
		data(){
			return{
				excel,
				ppt,
				word,
				pdf,
				tableData:[],
				id:'',
				infoList:[],
				selectIndex:0,
				orgEnterShow:false,
				orgEnterId:'',
				pageNo:1,
				pageSize:5,
				total:'',
			}
		},
		props:{
			detailId: {
				type: String,
				default: "0",
			}
		},
		methods:{
			showMore(index){
				this.selectIndex=index
			},
			getList() {
				let qry = this.query.new()
				this.query.toO(qry, 'crtTm', 'desc')
				this.query.toW(qry, 'bidId', this.id, 'EQ')
				this.query.toP(qry, this.pageNo, this.pageSize)
				this.api.getBidApplyList(this.query.toEncode(qry)).then(res => {
					this.tableData = res.data.list
					this.total=res.page.total
				})
			},
			toLink(url){
				window.open(url)
			},
			showInfo(id){
				this.orgEnterShow = true
				this.orgEnterId = id
			},
			handleCurrentChange(val){
				this.pageNo = val;
				this.getList();
			}
		},
		components:{
			orgEnter
		},
		mounted() {
		     this.id=this.detailId
			 this.api.getInfoWithWinBid(this.id).then(res=>{
			 	this.infoList=res
			 	this.infoList.forEach(item=>{
			 		if(item.deposot){
						if(item.deposot.depositImgUrl){
							item.deposot.depositImgUrl=item.deposot.depositImgUrl.split(",")
						}
						if(item.deposot.refundImgUrl){
							item.deposot.refundImgUrl=item.deposot.refundImgUrl.split(",")
						}
			 		}
			 	})
				// for(let i=0;i<this.infoList.length;i++){
				// 	if(this.infoList[i].deposot){
				// 		this.infoList[i].deposot.depositImgUrl=this.infoList[i].deposot.depositImgUrl.split(",")
				// 		this.infoList[i].deposot.refundImgUrl=this.infoList[i].deposot.refundImgUrl.split(",")
				// 	}
				// }
				console.log(7777,this.infoList);
			 	for(let i=0;i<this.infoList.length;i++){
			 		this.infoList[i].newList = []
			 		let data
			 		if(this.infoList[i].offer.shipBidOfferVo.attachDecode==''){
			 			data = []
			 		} else {
			 			data = this.infoList[i].offer.shipBidOfferVo.attachDecode.split(',')
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
			 this.getList()
		}
		
	}
</script>

<style lang="less" scoped>
	.containerTwo{
		height: 680px !important;
		overflow-y: scroll;
		background-color: white;
		padding: 29px 41px;
		box-sizing: border-box;
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
					div{
						margin: 15px 0;
					}
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
			.Footer {
				display: flex;
				justify-content: center;
				margin: 44px 0 20px;
			}
		}
	}
	
</style>
