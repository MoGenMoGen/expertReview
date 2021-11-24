<template>
	<!-- 定标公示审核 -->
	<div id="mask">
		<div class="table_box" @click.stop="">
			<div class="top">
				<p style="font-size: 20px">项目投标结果</p>
				<img @click="closeMask" src="~assets/img/close.png"
					style="width: 25px; height: 25px;cursor: pointer;" />
			</div>
			<div class="row2">
				<div class="row2-top">
					<div class="row2-top-line"></div>项目投标结果
				</div>
				<div class="row2-info">
					<div class="row2-item">项目编号：{{row.cd}}</div>
					<div class="row2-item">项目名称：{{row.nm}}</div>
					<!-- <div class="row2-item">投标项：2</div> -->
					<!-- <div class="row2-item">标项名称：省司法厅（本级）人民调解杂志编印</div> -->
				</div>
			</div>
			<div class="row2">
				<div class="row2-top">
					<div class="row2-top-line"></div>评审结果
				</div>
				<div class="row2-bottom">
					<el-table :data="tableData" max-height="300" style="width: 100%" :cell-style="{
						    'text-align': 'center',
						    color: '#333',
						    'font-weight': '500',
						  }" :header-cell-style="{
						    color: '#606060',
						    background: '#f8f8f8',
							'text-align': 'center',
						  }">
						<el-table-column type="index" label="序号" min-width="50"></el-table-column>
						<el-table-column prop="orgNm" label="供应商名称" min-width="150"></el-table-column>
						<el-table-column prop="offerAmt" label="最终报价（元）" min-width="100"></el-table-column>
						<el-table-column prop="aveScore" label="平均得分" min-width="100"></el-table-column>
						<el-table-column label="中标状态" min-width="100">
							<template slot-scope="scope">
								<p v-if="scope.row.bidStatus==0">未中标</p>
								<p v-if="scope.row.bidStatus==1" style="color: #E4393C;">已中标</p>
								<p v-if="scope.row.bidStatus==2" style="color: #2778BE;">开标中</p>
							</template>
						</el-table-column>
						<el-table-column label="操作" min-width="100">
							<template slot-scope="scope">
								<el-button @click="handleClick(scope.row)" type="text" size="small"
								style="background: #FFF;color: #2778BE; border-radius: 2px;width: 50px;border: 1px solid #2778BE;box-sizing: border-box;margin-bottom: 10px;">中标</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<!-- <div class="btn">
				<el-button
					style="background: #fff; color: #333; border: 1px solid #dddddd; padding: 10px 25px; border-radius: 4px;"
					@click="closeMask" type="text" size="small">取消</el-button>
				<el-button
					style="background: #2778be; color: #fff; margin-right: 20px; padding: 10px 25px; border-radius: 4px;"
					@click="closeMask" type="text" size="small">确定</el-button>
			</div> -->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
			};
		},
		props: {
			id: {
				default: 0,
				type: Number
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
				this.$parent.showResult = false;
			},
			handleClick(row) {
				this.$confirm('是否确认中标?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  // row.bidStatus=1
				  this.api.postBidOfferUpd(row).then(res => {
					  console.log(res)
					  if(res.code==0) {
						  this.$message.success(res.msg)
						  this.getList()
					  }
				  })
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消'
				  });          
				});
			},
			getList() {
				let qry=this.query.new()
				this.query.toW(qry,'bidId',this.id+'','EQ')
				this.api.getBidOfferAll(this.query.toEncode(qry)).then(res => {
					res.data.list.forEach(item => {
						item.aveScore = item.aveScore.toFixed(2)
					})
					this.tableData = res.data.list
				})
			}
		},
		async mounted() {
			this.getList()
		},
		components: {
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
			width: 850px;
			max-height: 80%;
			overflow-y: auto;

			.top {
				display: flex;
				width: 100%;
				justify-content: space-between;
			}

			.row2 {
				width: 700px;
				margin: 30px auto 20px;
				display: flex;
				flex-direction: column;
				.row2-top {
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 16px;
					color: #333333;
					margin-bottom: 10px;
					.row2-top-line {
						width: 4px;
						height: 17px;
						background-color: #2778BE;
						margin-right: 10px;
					}
				}
				.row2-info {
					display: flex;
					flex-wrap: wrap;
					.row2-item {
						display: flex;
						margin-bottom: 10px;
						width: 50%;
						div {
							flex: 1;
						}
					}
				}
				.row2-bottom {
					width: 100%;
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
