<template>
	<!-- 定标公示审核 -->
	<div id="mask">
		<div class="table_box" @click.stop="">
			<div class="top">
				<p style="font-size: 20px" v-if="type==0">发布公示</p>
				<p style="font-size: 20px" v-if="type==1">发布审核</p>
				<p style="font-size: 20px" v-if="type==2">公示详情</p>
				<p style="font-size: 20px" v-if="type==3">修改公示</p>
				<img @click="closeMask" src="~assets/img/close.png"
					style="width: 25px; height: 25px;cursor: pointer;" />
			</div>
			<div class="row2">
				<div class="row2-item">项目编号：{{row.cd}}</div>
				<div class="row2-item">项目名称：{{row.nm}}</div>
				<div class="row2-item">采购单位：{{row.winner}}</div>
				<div class="row2-item" v-if="type==0||type==3" style="align-items: center;"><span style="color: #E4393C;">*</span>公告标题：
					<el-input placeholder="请输入公告标题" v-model="submitInfo.title"></el-input>
				</div>
				<div class="row2-item" v-if="type==1||type==2">公告标题：{{info.title}}</div>
				<div class="row2-item" v-if="type==0||type==3" style="align-items: center;"><span style="color: #E4393C;">*</span>发布时间：
					<el-date-picker v-model="submitInfo.releTm" type="datetime" placeholder="选择日期时间"></el-date-picker>
				</div>
				<div class="row2-item" v-if="type==1||type==2">发布时间：{{info.releTm}}</div>
				<div class="row2-item" v-if="type==0||type==3"><span style="color: #E4393C;">*</span>公示内容：
					<myEditor ref="myEditor"></myEditor>
				</div>
				<div class="row2-item" v-if="type==1||type==2">公示内容：
					<div v-html="info.cont"></div>
				</div>
				<div class="row2-item" v-if="type==1">审核意见：
					<div>
						<el-input type="textarea" :rows="2" placeholder="请输入审核意见" v-model="textarea" resize='none'></el-input>
					</div>
				</div>
				<div class="row2-item" v-if="type==2">审核状态：{{info.audit==2?'审核通过':info.audit==3?'审核驳回':''}}
				</div>
				<div class="row2-item" v-if="type==2">审核意见：{{info.options}}
				</div>
			</div>
			<div class="btn">
				<el-button v-if="type==0"
					style="background: #fff; color: #333; border: 1px solid #dddddd; padding: 10px 25px; border-radius: 4px;"
					@click="closeMask" type="text" size="small">取消</el-button>
				<el-button v-if="type==0"
					style="background: #2778be; color: #fff; margin-right: 20px; padding: 10px 25px; border-radius: 4px;"
					@click="submit" type="text" size="small">确定</el-button>
				<el-button v-if="type==1"
					style="background: #fff; color: #333; border: 1px solid #dddddd; padding: 10px 25px; border-radius: 4px;"
					@click="reject" type="text" size="small">驳回</el-button>
				<el-button v-if="type==1"
					style="background: #2778be; color: #fff; margin-right: 20px; padding: 10px 25px; border-radius: 4px;"
					@click="verify" type="text" size="small">通过</el-button>
				<el-button v-if="type==2"
					style="background: #fff; color: #333; border: 1px solid #dddddd; padding: 10px 25px; border-radius: 4px;"
					@click="closeMask" type="text" size="small">取消</el-button>
				<el-button v-if="type==2"
					style="background: #2778be; color: #fff; margin-right: 20px; padding: 10px 25px; border-radius: 4px;"
					@click="closeMask" type="text" size="small">确定</el-button>
				<el-button v-if="type==3"
					style="background: #fff; color: #333; border: 1px solid #dddddd; padding: 10px 25px; border-radius: 4px;"
					@click="closeMask" type="text" size="small">取消</el-button>
				<el-button v-if="type==3"
					style="background: #2778be; color: #fff; margin-right: 20px; padding: 10px 25px; border-radius: 4px;"
					@click="update" type="text" size="small">确定</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import myEditor from '@/components/myEditor';
	export default {
		data() {
			return {
				value: '',
				textarea: '',
				submitInfo: {
					afficheTypeCd: '',
					afficheTypeNm: '',
					title: '',
					bidId: '',
					releTm: '',
					cont: ''
				},
				info: {}
			};
		},
		props: {
			type: {
				// 0发布,1审核,2公示详情
				default: 0,
				type: Number,
			},
			row: {
				default:function() {
					return {};
				},
				type: Object
			}
		},
		methods: {
			closeMask() {
				this.$parent.showShenhe = false;
			},
			submit() {
				if(this.submitInfo.title=="") {
					this.$message.error('请输入公告标题');
					return
				}
				if(this.submitInfo.releTm=="") {
					this.$message.error('请选择发布时间');
					return
				}
				if(this.$refs.myEditor.msg=='') {
					this.$message.error('请输入公告内容');
					return
				}
				this.submitInfo.releTm = this.until.formatTime(this.submitInfo.releTm)
				this.submitInfo.cont = this.$refs.myEditor.msg
				this.api.postBidAffiche(this.submitInfo).then(res => {
					if(res.code==0) {
						this.$message.success(res.msg)
						this.$parent.showShenhe = false;
						this.$parent.getList()
					}
				})
			},
			update() {
				if(this.submitInfo.title=="") {
					this.$message.error('请输入公告标题');
					return
				}
				if(this.submitInfo.releTm=="") {
					this.$message.error('请选择发布时间');
					return
				}
				if(this.$refs.myEditor.msg=='') {
					this.$message.error('请输入公告内容');
					return
				}
				let submitInfo = {
					id: this.info.id,
					releTm: this.until.formatTime(this.submitInfo.releTm),
					cont: this.$refs.myEditor.msg,
					title: this.submitInfo.title
				}
				this.api.postBidAfficheUpd(submitInfo).then(res => {
					if(res.code==0) {
						this.$message.success(res.msg)
						this.$parent.showShenhe = false;
						this.$parent.getList()
					}
				})
			},
			verify() {
				let data = {
					id: this.info.id,
					audit: 2,
					options: this.textarea
				}
				this.api.postBidAfficheExamine(data).then(res => {
					if(res.code==0) {
						this.$message.success(res.msg)
						this.$parent.showShenhe = false;
						this.$parent.getList()
					}
				})
			},
			reject() {
				let data = {
					id: this.info.id,
					audit: 3,
					options: this.textarea
				}
				this.api.postBidAfficheExamine(data).then(res => {
					if(res.code==0) {
						this.$message.success(res.msg)
						this.$parent.showShenhe = false;
						this.$parent.getList()
					}
				})
			}
		},
		async mounted() {
			this.submitInfo.bidId = this.row.id
			this.api.getCatListByPcd({cd:'ANNOUNCEMENT_TYPE'}).then(res=>{
				res.list.forEach(item => {
					if(item.nm=='结果公告') {
						this.submitInfo.afficheTypeCd = item.id
						this.submitInfo.afficheTypeNm = item.nm
					}
				})
			})
			if(this.type==1||this.type==2||this.type==3) {
				this.api.getBidAfficheByBidId({bidId:this.row.id}).then(res => {
					this.info = res.data
					this.submitInfo.releTm = this.info.releTm
					this.submitInfo.title = this.info.title
					this.$refs.myEditor.msg=this.info.cont
				})
			}
		},
		components: {
			myEditor
		}
	};
</script>

<style lang="less" scoped>
	#mask {
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
			background: #fff;
			padding: 20px;
			width: 75%;
			max-height: 80%;
			overflow-y: auto;

			.top {
				display: flex;
				width: 100%;
				justify-content: space-between;
			}

			.row2 {
				width: 90%;
				margin: 30px auto 20px;
				display: flex;
				flex-direction: column;

				.row2-item {
					display: flex;
					margin-bottom: 10px;

					div {
						flex: 1;
					}
				}
			}

			.btn {
				width: 300px;
				margin: 40px auto 0;
				display: flex;
				justify-content: center;
			}
		}
	}
</style>
