<template>
    <div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:width + 'px'}">
			<leftMenu></leftMenu>
		</div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import myFooter from '@/components/footer';
	import myHeader from '@/components/myHeader';
	import leftMenu from '@/components/leftMenu';
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
			myFooter,myHeader,leftMenu
        },
        mounted(){
			let obj = {
				name: '招标',
				url: '/zhaobiao.html'
			}
			if(this.until.checkNav(obj,this.navList)) {
				
			} else {
				this.navList.push(obj)
			}
			console.log(this.navList)
            this.getWidth()
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
	}
    .gray{
        color: #999999;
    }
</style>
