<template>
	<div>
		<div class="detailBox">
			<div class="detailTitle">
				<span>{{info.nm}}项目</span>
				<div class="line"></div>
				<div class="back" @click="back">< 返回 </div>
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
							预算金额（元）：
						</div>
						<div class="listContent">
							{{info.budget}}
						</div>
					</div>
					<div class="leftList">
						<div class="listName">
							投标开始时间：
						</div>
						<div class="listContent">
							{{info.bidOpenTm}}
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
							{{info.needDeposit==0?'不需要':info.depositAmount}}
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
			<div class="detailBox">
				<div class="detailTitle">
					<span>招标文件</span>
					<div class="line"></div>
					<div @click="allDownload" class="back" style="display: flex;align-items: center;"><i
							class="el-icon-download" style="margin-right: 10px;font-size: 20px;"></i>全部下载 </div>
				</div>
				<div class="detailContent">
					<div class="fileList" v-for="(item,index) in list" :key='index' v-if="list.length>0">
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
			<div class="detailBox">
				<div class="detailTitle">
					<span>报名审核</span>
					<div class="line"></div>
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
						<el-table-column prop="options" label="审核意见" min-width="200" v-if="sonTabIndex==1">
						</el-table-column>
						<el-table-column label="操作" min-width="100">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="handleClickShenhe(scope.row)"
									v-if="scope.row.audit==1&&auth1"
									style="background: #2778BE;color: #ffffff; border-radius: 2px;width: 50px;">审核
								</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
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
						<el-input v-model="options" type="textarea" :rows="5" resize='none' placeholder="企业审核意见">
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
</template>

<script>
	import excel from '@/assets/img/excel.png'
	import ppt from '@/assets/img/ppt.png'
	import word from '@/assets/img/word.png'
	import pdf from '@/assets/img/pdf.jpg'
	import orgEnter from '@/components/toubiao/orgEnterInfo';
	export default {
		data() {
			return {
				auth1: '', //审核权限
				companyId: '',
				info: {},
				list: [],
				auditType: ['等待审核', '审核通过', '审核驳回'],
				attachment: [],
				excel,
				ppt,
				word,
				pdf,
				tableData: [],
				options: '',
				companyNm: '',
				showPop: false,
				orgEnterShow: false,
				orgEnterId: ''
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
			handleClickShenhe(row) {
				this.options = ''
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
					"options": this.options
				}
				this.api.postBidApplyAudit(data).then(res => {
					if (res.code == 0) {
						this.$message.success(res.msg)
						this.showPop = false;
						this.$parent.getList()
						this.getList()
					}
				})
			},
			reject() {
				let data = {
					"id": this.companyId,
					"audit": 3,
					"options": this.options
				}
				this.api.postBidApplyAudit(data).then(res => {
					if (res.code == 0) {
						this.$message.success(res.msg)
						this.showPop = false;
						this.$parent.getList()
						this.getList()
					}
				})
			},
			getList() {
				let qry = this.query.new()
				this.query.toO(qry, 'crtTm', 'desc')
				this.query.toW(qry, 'bidId', this.id, 'EQ')
				if (this.sonTabIndex == 0) {
					this.query.toW(qry, 'audit', 1, 'EQ')
				}
				// if (this.sonTabIndex == 1) {
				// 	this.query.toW(qry, 'audit', 1, 'NE')
				// }
				this.api.getBidApplyList(this.query.toEncode(qry)).then(res => {
					this.tableData = res.data.list
				})
			},
			toLink(url) {
				window.open(url)
			},
			allDownload() {
				let urls = this.attachment.join(',')
				window.open(`https://fb.ship88.cn/general/oss/aliDownload?urls=${urls}&zipName=''`)
			},
			showInfo(id) {
				this.orgEnterShow = true
				this.orgEnterId = id
			}
		},
		async mounted() {
			this.auth1 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bidApply:audit') > -1)
			this.api.getBidInfo(this.id).then(res => {
				this.info = res.data
				if (res.data.attachment) {
					this.attachment = res.data.attachment.split(',')
				} else {
					this.attachment = []
				}
				this.getInfo(this.attachment)
			})
			this.getList()
		},
		components: {
			orgEnter
		}
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
		}
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
