<template>
	<!-- 定标公示审核 -->
	<div id="mask" @click="closeMask">
		<div class="table_box" @click.stop="">
			<div class="top">
				<p style="font-size: 20px" v-if="type==0">发布公示</p>
				<p style="font-size: 20px" v-if="type==1">发布审核</p>
				<img @click="closeMask" src="~assets/img/close.png"
					style="width: 25px; height: 25px;cursor: pointer;" />
			</div>
			<div class="row2">
				<div class="row2-item">项目编号：BHZC2021-G3-0001</div>
				<div class="row2-item">项目名称：12米玻璃钢新型渔船</div>
				<div class="row2-item">采购单位：澳新船厂有限公司</div>
				<div class="row2-item">发布时间：2021-07-29 08:00:00</div>
				<div class="row2-item">公示内容：<div v-html="1111"></div>
				</div>
				<div class="row2-item">审核意见：<div>
						<myEditor ref="myEditor"></myEditor>
					</div>
				</div>
			</div>
			<div class="btn">
				<el-button style="background: #2778be; color: #fff; margin-right: 20px; padding: 10px 25px; border-radius: 4px;" @click="handleNewRule" type="text" size="small">确定</el-button>
				<el-button style="background: #fff; color: #333; border: 1px solid #dddddd; padding: 10px 25px; border-radius: 4px;" @click="closeMask" type="text" size="small">取消</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import myEditor from '@/components/myEditor';
	export default {
		data() {
			return {
				info: {
					
				},
			};
		},
		props: {
			id: {
				default: "",
				type: String
			},
			type: {
				// 0发布,1审核
				default: 0,
				type: Number,
			},
		},
		methods: {
			closeMask() {
				this.$parent.showShenhe = false;
			},
			handleNewRule() {
				console.log(this.$refs.myEditor.msg)
			}
		},
		async mounted() {
			
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
