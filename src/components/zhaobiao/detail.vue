<template>
	<div class="detail" >
		<div class="detailBox">
			<div class="detailTitle">
				<span>12米玻璃钢新型渔船项目</span>
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
								BHZC2021-G3-0001
							</div>
						</div>
						<div class="leftList">
							<div class="listName">
								预算金额（万元）
							</div>
							<div class="listContent">
								52
							</div>
						</div>
						<div class="leftList">
							<div class="listName">
								投标开始时间：
							</div>
							<div class="listContent">
								2021-07-15 14:00:00
							</div>
						</div>
						<div class="leftList">
							<div class="listName">
								创建时间：
							</div>
							<div class="listContent">
								2021-07-15 14:00:00
							</div>
						</div>
						<div class="leftList">
							<div class="listName">
								备注说明：
							</div>
							<div class="listContent">
								<p>1、标书投放时间：
									<span style="color: red;">2020年6月8日</span>
								</p>
								<p>2、招标截止时间：
									<span style="color: red;">2020年6月8日</span>
								</p>
								<p>（以我司招标办收到的投标标准时间为准）,逾期按弃权处理</p>
								<p>3、联系人：
									<span>马益群</span>
								</p>
								<p>4、联系电话：
									<span>
										0580-3098000 13957205955
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
								12米
							</div>
						</div>
						<div class="rightList">
							<div class="listName">
								保证金缴纳：
							</div>
							<div class="listContent">
								是
							</div>
						</div>
						<div class="rightList">
							<div class="listName">
								投标截止时间：
							</div>
							<div class="listContent">
								2021-07-15 14:00:00
							</div>
						</div>
						<div class="rightList">
							<div class="listName">
								状态：
							</div>
							<div class="listContent" style="color: red;">
								待审批
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
					<div class="back">
						全部下载 </div>
				</div>
				<div class="detailContent">
					<div class="leftbox">
						<div class="leftList">
							<div class="listName">
								1、
							</div>
							<div class="listContent">
								<img src="../../assets/img/houzi.jpg">
							</div>
						</div>
						<div class="leftList">
							<div class="listName">
								2、
							</div>
							<div class="listContent">
								<img src="../../assets/img/houzi.jpg">
							</div>
						</div>
						<div class="leftList">
							<div class="listName">
								3、
							</div>
							<div class="listContent">
								<img src="../../assets/img/houzi.jpg">
							</div>
						</div>
					</div>
					<div class="leftbox">
						<div class="leftList">
							<div class="listName">
								4、
							</div>
							<div class="listContent">
								<img src="../../assets/img/houzi.jpg">
							</div>
						</div>
						<div class="leftList">
							<div class="listName">
								5、
							</div>
							<div class="listContent">
								<img src="../../assets/img/houzi.jpg">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="detailBox">
				<div class="detailTitle">
					<span>审核意见</span>
					<div class="line">
					</div>
				</div>
			</div>
			<div class="bottomBtn">
				<div class="btnLeft">
					通过
				</div>
				<div class="btnRight">
					驳回
				</div>
			</div>
		</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			back(){
				this.until.href('/views/index/zhaobiao.html')
			}
		}
	}
</script>

<style lang="less" >
	.detail {
		height: 696px;
		box-sizing: border-box;
		overflow-y: scroll;
		background-color: white;
		margin-left: 10px;
		padding: 29px 41px;
	
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
</style>
