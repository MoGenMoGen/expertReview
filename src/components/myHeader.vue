<template>
	<div class="top" :style="{width:bWidth + 'px'}">
		<div class="header1" :style="{width:bWidth + 'px'}">
			<div class="title main" :style="{width:width + 'px'}">
				<img :src="logo" alt="" @click="toPage('./index.html')" />
				<p>招投标系统</p><!-- {{userInfo.nickname}} -->
				<p><span @click="toPage('../home/personInfo.html')">管理员</span>|<span @click="toLogOut">退出</span></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// bWidth: 0,
				// width: 0,
				logo: 'https://sinovat.oss-cn-shanghai.aliyuncs.com/9cc91287abfa4ab7a6c5b917123a4e12_96f8a1087df345a99de5708bc15ae537_logo.png',
			};
		},
		props: {
			width: {
				type: Number,
				default: 0
			},
			bWidth: {
				type: Number,
				default: 0,
			},
		},
		created() {},
		mounted() {

		},
		methods: {
			getWidth() {
				let {
					bWidth,
					width
				} = this.until.getWidth()
				this.bWidth = bWidth
				this.width = width
			},
			toLogOut() {
				this.api.logout()
			},
		},
		computed: {

		},
	};
</script>

<style lang="less" scoped>
	.header1 {
		box-shadow: 0px 6px 10px 0px rgba(13, 4, 8, 0.1);
		background-color: #fff;

		.title {
			width: 100%;
			display: flex;
			display: -webkit-flex;
			align-items: center;

			img {
				cursor: pointer;
				width: 450px;
			}

			>p:nth-of-type(1) {
				color: #404040;
				font-size: 30px;
				font-weight: normal;
				line-height: 101px;
				padding-left: 25px;
				flex: 1;
			}

			p:nth-of-type(2) {
				font-size: 14px;
				cursor: pointer;
				color: #999999;

				span {
					margin: 0 20px;
					display: inline-block;
					cursor: pointer;

					&:first-of-type {
						color: #404040;
					}
				}
			}
		}
	}
</style>
