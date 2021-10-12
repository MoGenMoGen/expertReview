<template>
    <div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<my-header></my-header>
		<leftMenu></leftMenu>
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
        .home{
            width: 100%;
            background-image: url("../../../assets/img/footer.png");
            background-position: bottom center;
            background-repeat: no-repeat;
            padding-bottom: 100px;
            background-size: 100%;

        }
        .header1{
            box-shadow: 0px 6px 10px 0px rgba(13, 4, 8, 0.1);
            .title{
                width: 100%;
                display: flex;
                display: -webkit-flex;
                align-items: center;
                img{
                    cursor: pointer;
                    width: 450px;
                }
                >p:nth-of-type(1){
                    color: #404040;
                    font-size: 30px;
                    font-weight: normal;
                    line-height: 101px;
                    padding-left: 25px;
                    flex: 1;
                }
                p:nth-of-type(2){
                    font-size: 14px;
                    cursor: pointer;
                    color: #999999;
                    span{
                        margin: 0 20px;
                        display: inline-block;
                        cursor: pointer;

                        &:first-of-type{
                            color: #404040;
                        }
                    }
                }
            }
        }
        .personInfo{
            >p{
                padding-top: 20px;
                padding-bottom: 38px;
            }
            .search{
                display: flex;
                display: -webkit-flex;
                align-items: center;
				justify-content: space-between;
                height: 105px;
                >div{
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
					justify-content: space-between;
                    >p{
                        flex: 0 0 75px;
                    }
                    /deep/.el-input,.el-date-editor {
                        margin-right: 40px;
                    }
                }
                >button{
                    width: 135px;
                    height: 38px;
                    text-align: center;
                    line-height: 38px;
                    color: #ffffff;
                    border-radius: 5px;
                    background: @themeColor;
                    border: none;
                    cursor: pointer;
                }
            }
        }

    }


    .companyList{
        li{
            display: flex;
            display: -webkit-flex;
            padding: 5px 0;
            img{
                width: 12px;
                height: auto;
                margin-right: 3px;
            }
            p{
                flex: 1;
                color: @themeColor;
                text-decoration: underline;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            span{
                color: #333333;
            }
        }
    }
    .operate{
        width: 100%;
        p{
            width: 100%;
            display: flex;
            display: -webkit-flex;
            padding: 5px 0;
            span{
                display: -webkit-flex;
                flex: 1;
                align-items: center;
                padding-left: 10%;
                cursor: pointer;
                img{
                    width: 13px;
                    margin-right: 6px;
                }
            }
        }
        color: #333333;
    }
    .gray{
        color: #999999;
    }
</style>
