<template>
	<div class="right_content1">
		<!-- 评定标准项管理
    <magEvaluateStandard
      :id="id"
      v-if="showMagEvaluateStandard"
    ></magEvaluateStandard> -->

		<!-- 评定详情 -->
		<div class="mask" v-if="showDetail">
			<div class="tableBox" @click.stop="">
				<div class="top">
					<p style="font-size: 20px">详情</p>
					<img @click="closeMask" src="~assets/img/close.png"
						style="width: 25px; height: 25px;cursor: pointer;" alt="" />
				</div>
				<div style="display: flex;">
					<div class="rowLeft">
						<div class="row2">
							<div class="title">
								</span><span>招标项目：</span>
							</div>
							<div class="right">
								{{detailInfo.bidNm}}
							</div>
						</div>
						<div class="row2">
							<div class="title">
								</span><span>报价用户姓名：</span>
							</div>
							<div class="right">
								{{detailInfo.realNm}}
							</div>
						</div>
						<div class="row2">
							<div class="title">
								</span><span>报价金额：</span>
							</div>
							<div class="right">
								{{detailInfo.offerAmt}}
							</div>
						</div>
						<div class="showScore">
							报价平均得分：{{aveScore}}
						</div>
					</div>
					<div class="rowRight">
						<div class="row2">
							<div class="title">
								</span><span>报价用户账号：</span>
							</div>
							<div class="right">
								{{detailInfo.username}}
							</div>
						</div>
						<div class="row2">
							<div class="title">
								</span><span>报价机构：</span>
							</div>
							<div class="right">
								{{detailInfo.orgNm}}
							</div>
						</div>
						<div class="row2">
							<div class="title">
								</span><span>报价时间：</span>
							</div>
							<div class="right">
								{{detailInfo.offerTm}}
							</div>
						</div>
					</div>

				</div>
				<div class="elTable">
					<el-table max-height="500" :data="detailList" style="width: 100%" border :cell-style="{
			    'text-align': 'center',
			    color: '#333',
			    'font-weight': '500',
			    'font-size': '13px',
			    height: '36px',
			  }" :header-cell-style="{
			    color: '#606060',
			    'text-align': 'center',
			  }">
						<el-table-column type="selection" min-width="48"> </el-table-column>
						<el-table-column label="招标项目" show-overflow-tooltip="true" prop="bidNm" sortable min-width="75">
						</el-table-column>
						<el-table-column label="投标机构" show-overflow-tooltip="true" prop="orgNm" sortable min-width="75">
						</el-table-column>
						<el-table-column label="报价金额" show-overflow-tooltip="true" prop="offerAmt" sortable
							min-width="75">
						</el-table-column>
						<el-table-column label="报价时间" show-overflow-tooltip="true" prop="offerTm" sortable
							min-width="75">
						</el-table-column>
						<el-table-column label="专家账号" show-overflow-tooltip="true" prop="crtBy" sortable min-width="75">
						</el-table-column>
						<el-table-column label="专家姓名" show-overflow-tooltip="true" prop="username" sortable
							min-width="75">
						</el-table-column>
						<el-table-column label="满分分数" show-overflow-tooltip="true" prop="fullScore" sortable
							min-width="75">
						</el-table-column>
						<el-table-column label="总得分" show-overflow-tooltip="true" prop="score" sortable min-width="75">
						</el-table-column>
						<el-table-column label="查看评定详情" sortable min-width="75">
							<template slot-scope="scope">
								<div @click="toDetailTwo(scope.row)" style="
			        text-align: center;
			        background: #409eff;
			        color: #fff;
			        border: none;
			        width: 100%;
			        height: 36px;
			        line-height: 36px;
			        cursor: pointer;
			      ">
									查看评定详情
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="company" label="是否有效" sortable min-width="75">
							<template slot-scope="scope">
								<div style="
			        margin: 0 auto;
			        background: #f0f9eb;
			        color: #91c35b;
			        border: none;
			        width: 50px;
			        height: 30px;
			        line-height: 30px;
			      " v-show="scope.row.status == 1">
									有效
								</div>
								<div style="
			        margin: 0 auto;
			        background: pink;
			        color: red;
			        border: none;
			        width: 50px;
			        height: 30px;
			        line-height: 30px;
			      " v-show="scope.row.status == 0">
									无效
								</div>
							</template>
						</el-table-column>
					</el-table>

				</div>
				<div class="Footer">
				  <el-pagination
				    background
				    @current-change="handleCurrentChangeTwo"
				    :page-size="pageSizeTwo"
				    layout="prev, pager, next, jumper"
				    :total="totalTwo"
				  >
				  </el-pagination>
				</div>
			</div>
			
		</div>
	<div class="maskTwo" v-if="showDetailTwo">
			<div class="tableBox" @click.stop="">
				<div class="top">
					<p style="font-size: 20px">评定详情</p>
					<img @click="showDetailTwo=false" src="~assets/img/close.png"
						style="width: 25px; height: 25px;cursor: pointer;" alt="" />
				</div>
		
				<div class="elTable">
					<el-table max-height="500" :data="detailListTwo" style="width: 100%" border :cell-style="{
			    'text-align': 'center',
			    color: '#333',
			    'font-weight': '500',
			    'font-size': '13px',
			    height: '36px',
			  }" :header-cell-style="{
			    color: '#606060',
			    'text-align': 'center',
			  }">
						<el-table-column type="selection" min-width="48"> </el-table-column>
						<el-table-column label="评定指标" show-overflow-tooltip="true" prop="svsItemNm" sortable min-width="75">
						</el-table-column>
						<el-table-column label="评定权重" show-overflow-tooltip="true" prop="weight" sortable min-width="75">
						</el-table-column>
						<el-table-column label="本项满分分数" show-overflow-tooltip="true" prop="fullScore" sortable
							min-width="75">
						</el-table-column>
						<el-table-column label="小组成员评分" show-overflow-tooltip="true" prop="score" sortable
							min-width="75">
						</el-table-column>
						<el-table-column label="加权得分" show-overflow-tooltip="true" prop="weightedScore" sortable min-width="75">
						</el-table-column>
					</el-table>

				</div>
				<div class="Footer">
				  <el-pagination
				    background
				    @current-change="handleCurrentChangeThree"
				    :page-size="pageSizeThree"
				    layout="prev, pager, next, jumper"
				    :total="totalThree"
				  >
				  </el-pagination>
				</div>
			</div>
			
		</div>
		<div class="table_box">
			<el-table max-height="500" :data="tableData" style="width: 100%" border :cell-style="{
          'text-align': 'center',
          color: '#333',
          'font-weight': '500',
          'font-size': '13px',
          height: '36px',
        }" :header-cell-style="{
          color: '#606060',
          'text-align': 'center',
        }">
				<el-table-column type="selection" min-width="48"> </el-table-column>
				<el-table-column label="招标项目" show-overflow-tooltip="true" prop="bidNm" sortable min-width="75">
				</el-table-column>
				<el-table-column label="投标机构" show-overflow-tooltip="true" prop="orgNm" sortable min-width="75">
				</el-table-column>
				<el-table-column label="报价金额" show-overflow-tooltip="true" prop="offerAmt" sortable min-width="75">
				</el-table-column>
				<el-table-column label="报价时间" show-overflow-tooltip="true" prop="offerTm" sortable min-width="75">
				</el-table-column>
				<el-table-column label="专家账号" show-overflow-tooltip="true" prop="username" sortable min-width="75">
				</el-table-column>
				<el-table-column label="专家姓名" show-overflow-tooltip="true" prop="realNm" sortable min-width="75">
				</el-table-column>
				<el-table-column label="报价平均分" show-overflow-tooltip="true" prop="aveScore" sortable min-width="75">
				</el-table-column>
				<el-table-column label="中标时间" show-overflow-tooltip="true" prop="winBidTm" sortable min-width="75">
				</el-table-column>

				<el-table-column label="查看评定详情" sortable min-width="75">
					<template slot-scope="scope">
						<div @click="toDetail(scope.row.id, scope.row)" style="
                text-align: center;
                background: #409eff;
                color: #fff;
                border: none;
                width: 100%;
                height: 36px;
                line-height: 36px;
                cursor: pointer;
              ">
							查看评定详情
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="company" label="是否有效" sortable min-width="75">
					<template slot-scope="scope">
						<div style="
                margin: 0 auto;
                background: #f0f9eb;
                color: #91c35b;
                border: none;
                width: 50px;
                height: 30px;
                line-height: 30px;
              " v-show="scope.row.status == 1">
							有效
						</div>
						<div style="
                margin: 0 auto;
                background: pink;
                color: red;
                border: none;
                width: 50px;
                height: 30px;
                line-height: 30px;
              " v-show="scope.row.status == 0">
							无效
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="company" label="中标状态" sortable min-width="75">
					<template slot-scope="scope">
						<div style="
		        margin: 0 auto;
		        background: #f0f9eb;
		        color: #91c35b;
		        border: none;
		        width: 50px;
		        height: 30px;
		        line-height: 30px;
		      " v-show="scope.row.bidStatus == 1">
							已中标
						</div>
						<div style="
		        margin: 0 auto;
		        background: pink;
		        color: red;
		        border: none;
		        width: 50px;
		        height: 30px;
		        line-height: 30px;
		      " v-show="scope.row.bidStatus == 0">
							未中标
						</div>
						<div style="
			    margin: 0 auto;
			    background: #409eff;
			    color: #ffffff;
			    border: none;
			    width: 50px;
			    height: 30px;
			    line-height: 30px;
			  " v-show="scope.row.bidStatus == 2">
							投标中
						</div>
					</template>
				</el-table-column>


			</el-table>
			<!-- 分页 -->
			<div class="Footer">
				<el-pagination background @current-change="handleCurrentChange" :page-size="pageSize"
					layout="prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>

	</div>
</template>

<script>
	import bus from "@/bus.js";
	import jieguodetail from './jieguodetail.vue'
	export default {
		data() {
			return {
				aveScore: '',
				detailInfo: {},
				bidId: "",
				isDel: false,
				pageNo: 1,
				pageSize: 5,
				total: 0,
				pageNoTwo: 1,
				pageSizeTwo: 5,
				totalTwo:0,
				pageNoThree:1,
				pageSizeThree:5,
				totalThree:0,
				input: "",
				tableData: [],
				detailList: [],
				detailListTwo:[],
				ids: "",
				id: "",
				type: 0,
				showDetail: false,
				showDetailTwo:false,
				showEdit: false,
				SearchInfo: {
					bidNm: "", //招标项目
					orgNm: "", //投标机构
					username: "", //专家账号
					realNm: "", //专家姓名
					status: "", //是否有效
				},
				detailData: {},
			};
		},
		props: {
			detailId: {
				type: String,
				default: "0",
			}
		},
		computed: {},
		components: {},
		created() {
			// 定义事件,注意箭头函数应用

		},

		async mounted() {
			this.bidId = this.detailId
			this.getList();
		},

		methods: {
			//页面跳转
			toPage(url) {
				this.until.href(url);
			},
			toDetail(id, item) {
				this.showDetail = true;
				this.getListTwo(item)
			},
			toDetailTwo(item){
				this.showDetailTwo=true
				this.getListThree(item)
				console.log(11);
			},
			getListThree(item){
				let qry = this.query.new()
				this.query.toW(qry, 'svsResultId', item.id + '', 'EQ')
				this.query.toO(qry, 'crtTm', 'desc')
				this.query.toP(qry, this.pageNoThree, this.pageSizeThree)
				this.api.reviewResultDetail(this.query.toEncode(qry)).then(res => {
					this.detailListTwo = res.data.list,
					this.totalThree=res.page.total
				})
			},
			getListTwo(item){
				let qry = this.query.new()
				this.query.toW(qry, 'bidOfferId', item.id + '', 'EQ')
				this.query.toO(qry, 'crtTm', 'desc')
				this.query.toP(qry, this.pageNoTwo, this.pageSizeTwo)
				this.api.reviewResultList(this.query.toEncode(qry)).then(res => {
					this.detailList = res.data.list,
					this.totalTwo=res.page.total
				})
				this.api.getBidOfferDetail(item.id).then(res => {
					this.detailInfo = res
				})
				
				this.api.getreviewResult(this.query.toEncode(qry)).then(res => {
					this.aveScore = res
				})
			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.pageNo = val;
				this.getList();
			},
			handleCurrentChangeTwo(val){
				this.pageNoTwo = val;
				this.getListTwo()
			},
			handleCurrentChangeThree(val){
				this.pageNoThree = val;
				this.getListThree()
			},
			async getList() {
				let qry = this.query.new();
				this.query.toP(qry, this.pageNo, this.pageSize);
				this.query.toO(qry, "crtTm", "desc");
				this.query.toW(qry, "bidId", this.bidId, "EQ");
				// if(this.SearchInfo.bidNm) {
				//  this.query.toW(qry, "bidNm", this.SearchInfo.bidNm, "LK");
				// }

				// 选取列表
				let data = await this.api.decryptList(this.query.toEncode(qry));
				this.tableData = data.data.list;
				console.log('8899', this.tableData);
				// if (this.tableData.length > 0) {
				//   this.tableData.forEach((item) => {
				//     item.score = item.score.toFixed(2);
				//     item.fullScore = item.score.toFixed(2);
				//   });
				// }
				this.total = data.page.total;
			},
			closeMask() {
				this.showDetail = false
			}







		},
	};
</script>
<style lang="less" scoped>
	#home {
		.tableHeader {
			background: @themeColor;
			color: #fff;
			border: 0;
			text-align: center;
		}

		.rowList {
			padding: 20px 0;
		}
	}
</style>
<style lang="less" scoped>
	.right_content1 {
		margin-top: 10px;
		box-sizing: border-box;
		//   padding: 20px;
		// height: 740px;
		background: #fff;
			padding: 20px;
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

			.tableBox {
				background: #fff;
				padding: 20px;
				width: 1300px;
				max-height: 80%;
				overflow-y: scroll;

				.elTable {
					margin-top: 20px;
				}

				.top {
					display: flex;
					width: 100%;
					justify-content: space-between;
				}

				.rowLeft {
					width: 50%;

					.row2 {
						width: 100%;
						margin: 30px 0 20px;
						display: flex;
						align-items: center;

						// justify-content: space-between;
						.title {
							width: 148px;
							display: flex;
							align-items: center;
							justify-content: end;
							margin-right: 10px;
						}

						.right {

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

					.showScore {
						width: 150px;
						height: 40px;
						background-color: #67c23a;
						color: #ffffff;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 14px;
						border-radius: 20px;
					}
				}

				.rowRight {
					width: 50%;

					.row2 {
						width: 100%;
						margin: 30px 0 20px;
						display: flex;
						align-items: center;

						// justify-content: space-between;
						.title {
							width: 148px;
							display: flex;
							align-items: center;
							justify-content: end;
							margin-right: 10px;
						}

						.right {

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
		}
		.maskTwo{
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background: rgba(0, 0, 0, 0.5);
			z-index: 100;
			display: flex;
			justify-content: center;
			align-items: center;

			.tableBox {
				background: #fff;
				padding: 20px;
				width: 1300px;
				max-height: 80%;
				overflow-y: scroll;

				.elTable {
					margin-top: 20px;
				}

				.top {
					display: flex;
					width: 100%;
					justify-content: space-between;
				}

				.rowLeft {
					width: 50%;

					.row2 {
						width: 100%;
						margin: 30px 0 20px;
						display: flex;
						align-items: center;

						// justify-content: space-between;
						.title {
							width: 148px;
							display: flex;
							align-items: center;
							justify-content: end;
							margin-right: 10px;
						}

						.right {

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

					.showScore {
						width: 150px;
						height: 40px;
						background-color: #67c23a;
						color: #ffffff;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 14px;
						border-radius: 20px;
					}
				}

				.rowRight {
					width: 50%;

					.row2 {
						width: 100%;
						margin: 30px 0 20px;
						display: flex;
						align-items: center;

						// justify-content: space-between;
						.title {
							width: 148px;
							display: flex;
							align-items: center;
							justify-content: end;
							margin-right: 10px;
						}

						.right {

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
		}
		.condition_box {
			height: 40px;
			display: flex;
			align-items: center;
			margin-bottom: 40px;
			.el-input {
				width: 202px;
			}

			.btn {
				height: 40px;
				line-height: 40px;
				padding: 0 20px;
				border-radius: 5px;
			}

			.margin_right {
				margin-right: 15px;
			}
		}

		.table_box::-webkit-scrollbar {
			display: none;
			/* Chrome Safari */
		}

		.table_box {
			width: 100%;
			// max-height: 524px;
			// overflow-y: auto;
			// overflow-x: hidden;
			scrollbar-width: none;
			/* firefox */
			-ms-overflow-style: none;
			/* IE 10+ */
		}

		.Footer {
			display: flex;
			justify-content: center;
			margin: 44px 0 20px;
		}
	}
</style>
