<template>
	<div class="detail">
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
								预算金额（元）:
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
								<p>1、开标时间：
									<span style="color: red;">{{info.bidOpenTm}}</span>
								</p>
								<p>2、截标时间：
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
								报名截止时间：
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
								待审批
							</div>
							<div class="listContent" style="color: #2778BE ;" v-if="info.audit==2">
								审批通过
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
					<div class="back" @click="download"><i class="el-icon-download" style="margin-right: 10px;font-size: 20px;"></i>
						全部下载 </div>
				</div>
				<div class="detailContent">
					<div class="fileList" v-for="(item,index) in list" :key='index' v-if="list.length>0" >
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
			<div class="detailBox" v-if="info.audit==1&&auth">
				<div class="detailTitle">
					<span>审核意见</span>
					<div class="line">
					</div>
				</div>
				<textarea rows="" cols="" v-model="options"></textarea>
			</div>
			<div class="bottomBtn" v-if="info.audit==1">
				<div class="btnLeft" @click="getPast">
					通过
				</div>
				<div class="btnRight"@click="reject">
					驳回
				</div>
			</div>
		</div>
</template>

<script>
	import excel from '@/assets/img/excel.png'
	import ppt from '@/assets/img/ppt.png'
	import word from '@/assets/img/word.png'
	import pdf from '@/assets/img/pdf.jpg'
	export default {
		data() {
			return {
				auth:'',
				options:'',
				info: {

				},
				attachment: [],
				list: [],
				excel,
				ppt,
				word,
				pdf,
			}
		},
		props: {
			detailId: {
				type: String,
				default: "0",
			}
		},
		mounted() {
			this.auth = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:examine')>-1)
			console.log('7799',this.detailId);
			this.api.getBidInfo(this.detailId).then(res => {
				this.info = res.data
				if(res.data.attachment)
				{
					this.attachment = res.data.attachment.split(',')
					this.getInfo(this.attachment)
				}
			
			})
		},
		methods: {
			download(){
				console.log(this.info.attachment);
			   window.open(`https://fb.ship88.cn/general/oss/aliDownload?urls=${this.info.attachment}&zipName=`)
			},
			getPast(){
				this.api.postBidExamine({
					id:this.detailId,
					audit:2,
					options:this.options
				}).then(res=>{
					this.until.href('/views/index/zhaobiao.html')
				})
			},
			reject(){
				this.api.postBidExamine({
					id:this.detailId,
					audit:3,
					options:this.options
				}).then(res=>{
					this.until.href('/views/index/zhaobiao.html')
				})
			},
			back() {
				this.until.href('/views/index/zhaobiao.html')
			},
			toLink(url) {
			  console.log(url)
			  window.open(url)
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
				console.log(fileList2)
				this.list = fileList2
				console.log('151', this.list)
				
			},
		}
	}
</script>

<style lang="less">
	.detail {
		height: 690px;
		box-sizing: border-box;
		overflow-y: scroll;
		background-color: white;
		// margin-left: 10px;
		padding: 29px 41px;

		.detailBox {
			textarea {
				margin: 30px 50px;
				width: 70%;
				height: 200px;
				resize: none;
				padding: 20px;
			}

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
				flex-wrap: wrap;

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
					width: 50%;
					margin-top: 20px;
					display: flex;
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
</style>
