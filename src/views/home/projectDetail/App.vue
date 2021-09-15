<template>
    <!--修改密码-->
    <div id="home" :style="{width:bWidth + 'px'}">
        <div class="home">
            <div class="header1" :style="{width:bWidth + 'px'}">
                <div class="title main"  :style="{width:width + 'px'}">
                    <img :src="logo" alt="" @click="toPage('./index.html')"/>
                    <p>专家项目议标评审系统</p>
                    <p @click="toPage('./index.html')"> <返回首页 </p>
                </div>
            </div>
            <div class="personInfo main" :style="{width:width + 'px'}">
                <p class="pos">首页 > <span>项目议标评定表</span></p>
                <h3>{{info.nm}}</h3>
                <div class="cont">
                    <p>1、标书投放时间：<span class="red">{{info.publishTm}}</span></p>
                    <p>2、招标截止时间：<span class="red">{{info.completeTm}}</span>  前（以我司招标办收到的投标书时前（以我司招标办收到的投标书时间为准），逾期按弃权处理。</p>
                    <p>3、联 系 人：{{info.publisher}}</p>
                    <p>4、联系电话：{{info.mob}}</p>
                    {{info.rmks}}
                </div>
                <div class="file">
                    <div class="title"><img :src="file"/><p>附件：</p><span @click="toDown"><img :src="down"/>全部下载</span></div>
                    <ul>
                        <li @click="toPage(item.url)" v-for="(item,index) in fileList" :key="index"><span>{{index+1}}、</span>《{{item.nm}}》</li>
                    </ul>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import myFooter from '@/components/footer'
    import file from '@/assets/img/附件2.png'
    import down from '@/assets/img/下载.png'
    export default {
        data(){
            return{
                id:'5031217130673152',
                bWidth:0,
                width:0,
                file,
                down,
                info:{},
                fileList:[],
                logo:'https://sinovat.oss-cn-shanghai.aliyuncs.com/9cc91287abfa4ab7a6c5b917123a4e12_96f8a1087df345a99de5708bc15ae537_logo.png',
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
            if(this.until.getQueryString('id')){
                this.id = this.until.getQueryString('id')
            }
            this.getInfo()
        },
        methods:{
            async getInfo(){
                this.info = await this.api.projectDetail(this.id)
                let arr = this.info.attachment.split(',')
                arr.forEach(item=>{
                    let index = item.indexOf('_')
                    let nm = item.slice(index+1)
                    this.fileList.push({
                        nm:nm,
                        url:item
                    })
                })
            },
            getWidth(){
                let {bWidth,width} = this.until.getWidth()
                this.bWidth = bWidth
                this.width = width
            },
            //页面跳转
            toPage(url){
                this.until.href(url)
            },
            toDown(){
                let url = '/general/oss/aliDownload?urls='+this.info.attachment+'&zipName='+this.info.nm
                window.open(url)
                // this.api.downLoad(param)
            }

        }
    }
</script>

<style lang="less" scoped>
    @import url("../../../assets/css/init.less");
    #home{
        background-color: #FFFFFF;
        .red{
            color: @redColor;
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
                    color: @themeColor;

                }
            }
        }
        .personInfo{
            .pos{
                color: #999999;
                span{
                    color: @themeColor;
                }
                padding-top: 30px;
                padding-bottom: 38px;
            }
            h3{
                color: #333333;
                font-size: 24px;
                text-align: center;
                padding-bottom: 60px;
            }
            .cont{
                color: #666666;
                line-height: 34px;
            }
        }
        .file{
            width: 100%;
            color: #666666;
            padding-bottom: 20px;
            .title{
                width: 100%;
                border-bottom: 1px solid rgba(0,0,0,0.1);
                display: flex;
                display: -webkit-flex;
                align-items: center;
                padding-bottom: 14px;
                padding-top: 60px;
                p{
                    flex: 1;
                }
                span{
                    cursor: pointer;
                }
                img{
                    width: 14px;
                    margin-right: 8px;
                }
            }
            ul{
                padding: 15px 0;
                li{
                    color: @themeColor;
                    padding: 10px 0;
                    cursor: pointer;
                    span{
                        color: #666666;
                    }
                }
            }
        }
    }


</style>
