<template>
	<!--评标上传视频 -->
	<div id="mask" @click="closeMask">
		<div class="table_box" @click.stop="">
			<div class="top">
				<p style="font-size: 20px; color: #636e72">资质信息</p>
				<img @click="closeMask" src="~assets/img/close.png"
					style="width: 25px; height: 25px; cursor: pointer" />
			</div>
			<div class="container">
				<p style="font-size: 20px;color: #303030;">{{orgEnterInfo.company}}</p>
				<p style="font-size: 16px;color: #666;">建造优势：{{orgEnterInfo.business}}</p>
			</div>
			<div class="btn">
				<el-button style="background: #2778be;color: #fff;margin-right: 20px;padding: 10px 25px;border-radius: 4px;" @click="closeMask" type="text" size="small">确定</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from "moment";
	export default {
		data() {
			return {
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
			max-height: 667px;
			overflow-y: scroll;
			background: #fff;
			padding: 30px;
			box-sizing: border-box;
			.top {
			  display: flex;
			  width: 100%;
			  justify-content: space-between;
			  margin-bottom: 10px;
			}
			.container {
				display: flex;
				flex-direction: column;
				padding: 0 50px;
				box-sizing: border-box;
				p {
					margin-bottom: 10px;
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
