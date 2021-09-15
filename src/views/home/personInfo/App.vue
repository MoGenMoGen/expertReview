<template>
    <!--修改密码-->
    <div id="home" :style="{width:bWidth + 'px'}">
        <div class="home">
            <div class="header1" :style="{width:bWidth + 'px'}">
                <div class="title main"  :style="{width:width + 'px'}">
                    <img :src="logo" alt="" @click="toPage('./index.html')"/>
                    <p>个人信息</p>
                    <p @click="toPage('./index.html')"> < 返回首页</p>
                </div>
            </div>
            <div class="header">
                <img src="../../../assets/img/左.png" alt=""/>
                <p>个人信息</p>
                <img src="../../../assets/img/右.png" alt=""/>
            </div>
            <div class="personInfo main" :style="{width:width + 'px'}">
                <p>真实姓名： {{info.realNm}}</p>
                <p>手机号码： {{info.mob}}</p>
                <p>职位名称： {{info.groupNm}}</p>
                <p>公司名称： {{info.company}}</p>
                <p>联系地址： {{info.addrNm+info.address}}</p>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import myFooter from '@/components/footer'
    export default {
        data(){
            return{
                bWidth:0,
                width:0,
                logo:'https://sinovat.oss-cn-shanghai.aliyuncs.com/9cc91287abfa4ab7a6c5b917123a4e12_96f8a1087df345a99de5708bc15ae537_logo.png',
                info:{},

            }
        },
        computed: {

        },
        components: {
            myFooter
        },
        async  mounted(){
            this.getWidth()
            window.onresize = () => {
                this.getWidth()
            }
            this.info = await this.api.personInfo(JSON.parse(this.until.seGet('userInfo')).subId)
        },
        methods:{
            getWidth(){
                let {bWidth,width} = this.until.getWidth()
                this.bWidth = bWidth
                this.width = width
            },
            //页面跳转
            toPage(url){
                this.until.href(url)
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url("../../../assets/css/init.less");
    #home{
        background-color: #FFFFFF;
        height: 100%;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        .home{
            width: 100%;
            flex: 1;
            background-image: url("../../../assets/img/footer.png");
            background-position: bottom center;
            background-repeat: no-repeat;
            padding-bottom: 100px;
            background-size: 100%;
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
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
                    color: @themeColor;
                    font-size: 14px;
                    cursor: pointer;
                }
            }
        }
        .personInfo{
            flex: 1;
            overflow: auto;
            padding-top: 20px;
            p{
                padding-left: 50px;
                line-height: 38px;
            }
        }
    }
    .header{
        display: inline-flex;
        height: 120px;
        align-items: center;
        justify-content: center;
        width: 100%;
        >p{
            font-size: 24px;
            color: #333333;
            margin: 0 30px;
            /*font-weight: bold;*/
        }
        img{
            width: 148px;
        }
    }

</style>
