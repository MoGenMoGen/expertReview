<template>
	<div>
		<div class="detailBox">
			<div class="detailTitle">
				<span>{{info.nm}}项目</span>
				<div class="line"></div>
				<div class="back" @click="back">< 返回 </div>
			</div>
			<div class="detailContent" style="display: flex;flex-direction: row;">
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
							预算金额（元）：
						</div>
						<div class="listContent">
							{{info.budget}}
						</div>
					</div>
					<div class="leftList">
						<div class="listName">
							发布日期：
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
							备注：
						</div>
						<div class="listContent">
							{{info.rmks}}
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
						<div class="listContent">
							{{info.needDeposit==0?'是':'否'}}
						</div>
					</div>
					<div class="rightList">
						<div class="listName">
							投标截止时间：
						</div>
						<div class="listContent">
							{{info.bidEndTm}}
						</div>
					</div>
					<div class="rightList">
						<div class="listName">
							状态：
						</div>
						<div class="listContent" style="color: red;">
							{{auditType[info.audit - 1]}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="detailBox">
			<div class="detailTitle">
				<span>招标文件</span>
				<div class="line"></div>
				<div @click="allDownload" class="back" style="display: flex;align-items: center;"><i class="el-icon-download" style="margin-right: 10px;font-size: 20px;"></i>全部下载 </div>
			</div>
			<div class="detailContent">
				<div class="fileList" v-for="(item,index) in list" :key='index' v-if="list.length>0">
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
		<div class="detailBox" v-if="auth1">
			<div class="detailTitle">
				<span>项目审核</span>
				<div class="line"></div>
			</div>
			<div class="detailContent" style=" display:flex; flex-direction: column;">
				<div class="list" v-if="info.options">
					审核意见：
					<span>{{info.options}}</span>
				</div>
				<div class="list" v-if="info.auditTm">
					审核时间：
					<span>{{info.auditTm}}</span>
				</div>
				<div class="list">
					审核状态：
					<span>{{auditType[info.audit - 1]}}</span>
				</div>
			</div>
		</div>
		<div class="detailBox" v-if="auth1">
			<div class="detailTitle">
				<span>投标信息</span>
				<div class="line"></div>
			</div>
			<div class="detailContent">
				<div class="collapse-item" v-for="(item,index) in tenderList" :key="index">
					<div class="collapse-top" @click="showMore(index)">
						<div>招标采购商：<span style="color: #2778BE;">{{item.orgNm}}</span></div>
						<div>审核状态：<span :style="{color:(item.audit==2?'#2778BE':'#E4393C')}">{{auditType[item.audit-1]}}</span><img :class="{'collapse-rotate':selectIndex==index}" src="../../assets/img/arrowDownG.png"></div>
					</div>
					<div class="collapse-bottom" v-show="selectIndex==index">
						<div style="color:#E4393C" v-if="info.needDeposit==0">保证金：无需缴纳</div>
						<div v-if="info.needDeposit==1" :style="{color:(item.deposits&&item.deposits.shipBidDepositVo.audit==2?'#606060':'#E4393C')}">保证金：{{item.deposits&&item.deposits.shipBidDepositVo.audit==2?`已缴(${item.deposits.shipBidDepositVo.depositAmt}元)`:`未缴`}}</div>
						<div class="deposits-img" v-if="(item.deposits&&item.deposits.shipBidDepositVo.audit==2)||info.needDeposit==0">
							保证金凭证：<el-image v-for="(newItem,newIndex) in item.deposits.shipBidDepositVo.depositImgUrl" :key="newIndex" 
							:src="newItem" :preview-src-list="item.deposits.shipBidDepositVo.depositImgUrl"></el-image>
						</div>
						<div v-if="item.deposits">保证金上传时间：{{item.deposits.shipBidDepositVo.crtTm}}</div>
						<div v-if="item.offerDtos">投标金额：{{item.offerDtos.shipBidOfferVo.offerAmt}}元</div>
						<div v-if="item.newList.length>0">
							投标文件：
							<div style="display: flex; flex-wrap: wrap;">
								<div class="fileList" v-for="(item1,index1) in item.newList"
									v-if="item.newList" :key='index1'>
									<span>
										{{index1+1}}、
									</span>
									<div>
										<img :src="item1.img"
											style="width: 100px; height: 100px;">
										<p>{{item1.fileNm}}</p>
									</div>
								</div>
							</div>
						</div>
						<div v-if="item.offerDtos">资料上传时间：{{item.offerDtos.shipBidOfferVo.crtTm}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import excel from '@/assets/img/excel.png'
	import ppt from '@/assets/img/ppt.png'
	import word from '@/assets/img/word.png'
	import pdf from '@/assets/img/pdf.jpg'
	import defaultImg from '@/assets/img/defaultImg.png'
	export default {
		data() {
			return {
				auth1:'',// 投标文件投标信息列表权限
				companyId: '',
				info: {},
				list: [],
				auditType: ['等待审核','审核通过','审核驳回'],
				attachment: [],
				excel,
				ppt,
				word,
				pdf,
				defaultImg,
				tableData: [],
				options: '',
				companyNm: '',
				showPop: false,
				tenderList: [],
				selectIndex: 0
			};
		},
		props: {
			id: {
				default: 0,
				type: Number
			},
			sonTabIndex: {
				default: 0,
				type: Number
			}
		},
		methods: {
			back() {
				this.$parent.showDetail = false
			},
			getInfo(info) {
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
				this.list = fileList2
			},
			getList() {
				let qry=this.query.new()
				this.query.toO(qry,'crtTm','desc')
				this.query.toW(qry,'bidId',this.id,'EQ')
				this.api.getListWithOfferAndDes(this.query.toEncode(qry)).then(res => {
					this.tenderList = res.data.list
					this.tenderList.forEach(item => {
						if(item.deposits) {
							item.deposits.shipBidDepositVo.depositImgUrl = item.deposits.shipBidDepositVo.depositImgUrl.split(",")
						}
						item.newList = []
						let data = []
						if(item.offerDtos) {
							data = item.offerDtos.shipBidOfferVo.attachment.split(',')
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
										img: this.defaultImg,
										'fileNm': nm
									})
								}
							})
						}
						item.newList = fileList2
					})
				})
			},
			toLink(url) {
				window.open(url)
			},
			showMore(index) {
				this.selectIndex = index
			},
			allDownload() {
				let urls = this.attachment.join(',')
				window.open(`https://fb.ship88.cn/general/oss/aliDownload?urls=${urls}&zipName=''`)
			}
		},
		async mounted() {
			this.auth1= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidApply:listWithOfferAndDes')>-1)
			this.api.getBidInfo(this.id).then(res => {
				this.info = res.data
				if(res.data.attachment) {
					this.attachment = res.data.attachment.split(',')
				} else {
					this.attachment = []
				}
				this.getInfo(this.attachment)
			})
			this.getList()
		},
		components: {}
	};
</script>

<style scoped lang="less">
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
			display: flex;
			flex-direction: column;
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
					div {
						margin: 15px 0;
					}
					.deposits-img {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						.el-image {
							width: 100px;
							height: 100px;
							margin-right: 10px;
						}
					}
				}
				.fileList {
					width: 25%;
					margin-top: 20px;
					display: flex;
				}
			}
		}
	}
</style>
