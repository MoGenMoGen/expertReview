<template>
	<!--评标上传视频 -->
	<div id="mask" @click="closeMask">
		<div class="table_box" @click.stop="">
			<div class="top">
				<p style="font-size: 20px; color: #636e72"></p>
				<img @click="closeMask" src="~assets/img/close.png"
					style="width: 25px; height: 25px; cursor: pointer" />
			</div>
			<div class="container">
				<p class="title">
					<img :src="orgEnterInfo.logo?orgEnterInfo.logo:logo">
					<span>{{orgEnterInfo.company}}</span>
				</p>
				<div class="two-item">
					<p>公司名称：{{orgEnterInfo.company}}</p>
					<p>入驻身份：{{orgEnterInfo.identityNm}}</p>
				</div>
				<div class="two-item">
					<p>所在地区：{{orgEnterInfo.addrNm}}</p>
					<p>公司等级：{{orgEnterInfo.evaluateNm}}</p>
				</div>
				<div class="two-item">
					<p>详细地址：{{orgEnterInfo.address}}</p>
					<p>公司官网：{{orgEnterInfo.linkMan}}</p>
				</div>
				<div class="two-item">
					<p>联系电话：{{orgEnterInfo.mob}}</p>
					<p>电子邮箱：{{orgEnterInfo.email}}</p>
				</div>
				<div class="one-item">
					<p>优势业务：{{orgEnterInfo.business}}</p>
				</div>
				<div class="one-item">
					<p>简介：{{orgEnterInfo.summery}}</p>
				</div>
				<div class="two-item">
					<div class="flexStart">
						<span>营业执照：</span>
						<div v-if="orgEnterInfo.businessLicense.length>0">
							<el-carousel height="110px" indicator-position="none">
							  <el-carousel-item v-for="item in orgEnterInfo.businessLicense" :key="item">
								  <img :src="item" style="width: 100%;height: 100%;object-fit: cover;" v-viewer>
							  </el-carousel-item>
							</el-carousel>
						</div>
					</div>
					<div class="flexStart">
						<span>资质证明：</span>
						<div v-if="orgEnterInfo.qualification.length>0">
							<el-carousel height="110px" indicator-position="none">
							  <el-carousel-item v-for="item in orgEnterInfo.qualification" :key="item">
								  <img :src="item" style="width: 100%;height: 100%;object-fit: cover;" v-viewer>
							  </el-carousel-item>
							</el-carousel>
						</div>
					</div>
				</div>
				<div class="two-item">
					<div class="flexStart">
						<span>身份证正：</span>
						<div v-if="orgEnterInfo.idCard.length>0">
							<el-carousel height="110px" indicator-position="none">
							  <el-carousel-item v-for="item in orgEnterInfo.idCard" :key="item">
								  <img :src="item" style="width: 100%;height: 100%;object-fit: cover;" v-viewer>
							  </el-carousel-item>
							</el-carousel>
						</div>
					</div>
					<div class="flexStart">
						<span>身份证反：</span>
						<div v-if="orgEnterInfo.idCardReverse.length>0">
							<el-carousel height="110px" indicator-position="none">
							  <el-carousel-item v-for="item in orgEnterInfo.idCardReverse" :key="item">
								  <img :src="item" style="width: 100%;height: 100%;object-fit: cover;" v-viewer>
							  </el-carousel-item>
							</el-carousel>
						</div>
					</div>
				</div>
				<div class="one-item">
					<div class="flexStart">
						<span>详细介绍：</span>
						<p v-html="orgEnterInfo.intro"></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import logo from '@/assets/img/公司logo.png';
	import moment from "moment";
	export default {
		data() {
			return {
				logo,
				orgEnterInfo: {}
			};
		},
		props: {
			bWidth: {
				type: Number,
				default: 0,
			},
			orgEnterId: {
				default: "",
				type: Number
			},
		},
		methods: {
			closeMask() {
				this.$parent.orgEnterShow = false;
			},
		},
		components: {},
		async mounted() {
			this.api.getOrgEnterInfo(this.orgEnterId).then(res => {
				res.intro = this.until.imgStyle(res.intro)
				if(res.businessLicense) {
					res.businessLicense = res.businessLicense.split(",")
				}
				if(res.qualification) {
					res.qualification = res.qualification.split(",")
				}
				if(res.idCard) {
					res.idCard = res.idCard.split(",")
				}
				if(res.idCardReverse) {
					res.idCardReverse = res.idCardReverse.split(",")
				}
				this.orgEnterInfo = res
			})
		},
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
			width: 875px;
			max-height: 670px;
			overflow-y: scroll;
			background: #fff;
			.top {
			  display: flex;
			  width: 100%;
			  justify-content: space-between;
			  margin-bottom: 10px;
			}
			.container {
				display: flex;
				flex-direction: column;
				box-sizing: border-box;
				.title {
					width: 100%;
					padding: 30px;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					font-size: 18px;
					color: #2478BE;
					img {
						width: 55px;
						height: 55px;
						border-radius: 50%;
						margin-right: 16px;
						object-fit: contain;
					}
				}
				.two-item {
					display: flex;
					width: 100%;
					padding: 0 30px;
					box-sizing: border-box;
					margin-bottom: 20px;
					p {
						width: 50%;
						font-size: 14px;
						color: #606060;
					}
					.flexStart {
						width: 50%;
						display: flex;
						align-items: flex-start;
						span {
							font-size: 14px;
							color: #606060;
						}
						div {
							width: 230px;
							height: 110px;
							/deep/ .el-carousel__container {
								width: 100%;
								height: 100%;
								.el-carousel__item {
									width: 100%;
									height: 100%;
									img {
										width: 100%;
										height: 100%;
									}
								}
							}
						}
					}
				}
				.one-item {
					display: flex;
					width: 100%;
					padding: 0 30px;
					box-sizing: border-box;
					margin-bottom: 20px;
					p {
						width: 100%;
						font-size: 14px;
						color: #606060;
					}
					.flexStart {
						display: flex;
						span {
							width: 70px;
							font-size: 14px;
							color: #606060;
						}
						p {
							width: calc(~"100% - 70px");
						}
					}
				}
			}
		}
	}
</style>
