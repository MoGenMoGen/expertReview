<template>
    <div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:bwidth + 'px'}">
			<leftMenu tabIndex='1-2'></leftMenu>
			<div class="right">
				<div class="header">
					<div class="headerItem">
						首页
					</div>
					<div class="btn">
						更多
						<img src="">
					</div>
				</div>
				<examine></examine>
				</div>
		</div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import myFooter from '@/components/footer';
	import myHeader from '@/components/myHeader';
	import leftMenu from '@/components/leftMenu';
	import examine   from '@/components/zhaobiao/examine';
    export default {
        data(){
            return{
                loading:false,
                bWidth:0,
                width:0,
                list:[],
                pageNo:1,
                pageSize:10,
                total:0,
            }
        },
        computed: {

        },
        components: {
			myFooter,myHeader,leftMenu,examine
        },
        async  mounted(){
            // if(!this.until.seGet('userInfo')){
            //     this.until.href('./login.html')
            // }
			console.log(this.navList)
            this.getWidth()
            // this.getList()
            // this.userInfo = JSON.parse(this.until.seGet('userInfo'))
            window.onresize = () => {
                this.getWidth()
            }
        },
        methods:{
            getWidth(){
                let {bWidth,width} = this.until.getWidth()
                this.bWidth = bWidth
                this.width = width
            },
            toLogOut(){
                this.api.logout()
            },
            //页面跳转
            toPage(url){
                this.until.href(url)
            }
        }
    }
</script>
<style lang="less" scoped>
    #home{
        .tableHeader{
            background: @themeColor;
            color: #FFF;
            border: 0;
            text-align: center;
        }
        .rowList{
            padding: 20px 0;
        }
    }
</style>
<style lang="less" scoped>
    @import url("../../../assets/css/init.less");
    #home{
        background-color: #F3F3F3;
        .blue{
            color: @themeColor;
        }
        .red{
            color: @redColor;
        }
        .projectNm{
            cursor: pointer;
        }
    }
	.container {
		padding-top: 20px;
		padding-bottom: 100px;
		background: url(../../../assets/img/footer.png);
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: bottom center;
		margin: 0 auto;
		display: flex;
		.right {
			height: 800px;
			background-color: white;
			margin-left: 10px;
			width: calc(~"100% - 210px");
		
			// width: 100%;
			.header {
				// width:calc(~"100% - 210px");
				width: 100%;
				display: flex;
				align-items: center;
				height: 50px;
				background: #FFFFFF;
				box-shadow: 0px 2px 2px 0px rgba(234, 234, 234, 0.45);
				padding-left: 10px;
				box-sizing: border-box;
				position: relative;
		
				.headerItem {
					height: 100%;
					width: 97px;
					text-align: center;
					line-height: 48px;
					font-size: 14px;
					font-weight: 400;
					color: #909090;
				}
		
				.btn {
					width: 62px;
					height: 29px;
					background: #2778BE;
					border-radius: 2px;
					position: absolute;
					right: 10px;
					top: 50%;
					transform: translateY(-50%);
					font-size: 12px;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					line-height: 29px;
				}
			}
		
			.content {
				margin-top: 10px;
				background-color: #ffffff;
				width: 100%;
		
				.topSeachBox {
					// width: 100%;
					padding: 20px;
					box-sizing: border-box;
					display: flex;
		
					// justify-content: space-around;
					.el-input {
						width: 200px;
						margin-left: 30px;
					}
		
					.el-select {
						width: 200px;
						margin-left: 30px;
					}
		
					.el-button {
						width: 100px;
						margin-left: 20px;
					}
				}
		
				.bodyTable {
					padding: 20px;
					box-sizing: border-box;
		
					.el-table {
						width: 100%;
						background-color: #F8F8F8;
						text-align: center;
		
					}
				}
		
				.Footer {
					width: 100%;
					text-align: center;
				}
			}
		}
	}
    .gray{
        color: #999999;
    }
</style>
