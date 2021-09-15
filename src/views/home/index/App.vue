<template>
    <!--修改密码-->
    <div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
        <div class="home">
            <div class="header1" :style="{width:bWidth + 'px'}">
                <div class="title main"  :style="{width:width + 'px'}">
                    <img :src="logo" alt="" @click="toPage('./index.html')"/>
                    <p>专家项目议标评审系统</p>
                    <p><span @click="toPage('./personInfo.html')">{{userInfo.nickname}}</span>|<span @click="toLogOut">退出</span></p>
                </div>
            </div>
            <div class="personInfo main" :style="{width:width + 'px'}">
                <div class="search">
                    <div>
                        <p>项目名称：</p>
                        <el-input v-model="search.nm" placeholder="请输入项目名称"></el-input>
                    </div>
                    <div>
                        <p>发布时间：</p>
                        <el-date-picker
                                v-model="search.time"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div>
                        <p>联系电话：</p>
                        <el-input v-model="search.tel" placeholder="请输入联系电话" type="tel"></el-input>
                    </div>
                    <button  @click="toSearch">查询</button>
                </div>
                <el-table
                        :data="list"
                        header-cell-class-name="tableHeader"
                        cell-class-name="rowList"
                        border
                        style="width: 100%">
                    <el-table-column
                            type="index"
                            label="序号"
                            align="center"
                            min-width="4%"
                    >
                    </el-table-column>
                    <el-table-column

                            prop="nm"
                            label="项目名称"
                            min-width="25%">
                        <template slot-scope="scope">
                            <p @click="toDetail(scope.row.id)" class="projectNm">{{scope.row.nm}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="publishTm"
                            label="发布时间"
                            align="center"
                            min-width="10%"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="publisher"
                            label="发布人"
                            align="center"
                            min-width="8%"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="mob"
                            label="联系电话"
                            align="center"
                            min-width="12%"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态"
                            align="center"
                            min-width="8%"
                    >
                        <template slot-scope="scope">
                            <p v-if="scope.row.status" class="blue">已评审</p>
                            <p v-else class="red">待评审</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="招标采购商"
                            min-width="20%"
                    >
                        <template slot-scope="scope">
                            <ul class="companyList">
                                <li v-for="(item,i) in scope.row.offers" :key="i">
                                    <p :title="item.orgNm">{{item.orgNm}}</p> <span><img :src="file"/>{{item.fileNums}}</span>
                                </li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            min-width="20%"
                    >
                        <template slot-scope="scope">
                            <div v-for="(item,i) in scope.row.offers" :key="i" class="operate">
                                <p v-if="item.status">
                                    <span v-if="!item.bidStatus"><img :src="noCheck"/>未中标</span>
                                    <span v-else-if="item.bidStatus==2"><img :src="checkIng"/>投标中</span>
                                    <span v-else><img :src="checked"/> 已中标</span>
                                    <span @click.stop="toView(item.id)"><img :src="view"/>查看</span>
                                </p>
                                <p v-else>
                                    <span @click.stop="toReview(scope.row,item.id,)"><img :src="review"/>评审</span>
                                    <span @click.stop="toIgnore(scope.row,item.id)" class="gray"><img :src="ignore"/>忽略</span>
                                </p>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <p class="red">*  施工相关图纸与文本在船检审图前应送招标人审查，招标人应在七日内组织专家审查。</p>
                <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        :page-size="pageSize"
                        :current-page.sync="pageNo"
                        :total="total"
                        layout="total,prev, pager, next"
                >
                </el-pagination>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import myFooter from '@/components/footer'
    import view from '@/assets/img/查看.png'
    import file from '@/assets/img/附件.png'
    import ignore from '@/assets/img/忽略.png'
    import review from '@/assets/img/评审.png'
    import noCheck from '@/assets/img/未选中.png'
    import checkIng from '@/assets/img/投标中.png'
    import checked from '@/assets/img/已选中.png'
    export default {
        data(){
            return{
                loading:false,
                view,
                file,
                ignore,
                review,
                noCheck,
                checked,
                checkIng,
                bWidth:0,
                width:0,
                userInfo:{},
                logo:'https://sinovat.oss-cn-shanghai.aliyuncs.com/9cc91287abfa4ab7a6c5b917123a4e12_96f8a1087df345a99de5708bc15ae537_logo.png',
                search:{
                    nm:'',
                    tel:'',
                    time:'',
                },
                list:[],
                pageNo:1,
                pageSize:10,
                total:0,
            }
        },
        computed: {

        },
        components: {
            myFooter
        },
        async  mounted(){
            if(!this.until.seGet('userInfo')){
                this.until.href('./login.html')
            }
            this.getWidth()
            this.getList()
            this.userInfo = JSON.parse(this.until.seGet('userInfo'))
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
            //查看报价单
            toView(id){
                let url = './evaluateDetail.html?id='+id
                this.until.href(url)
            },
            //评审
            toReview(v,id2){
                if(!v.svsOn){
                    this.$message({
                        message: '当前项目未开启评审',
                        type: 'warning'
                    });
                    return
                }
                // console.log('评审')
                // return
                let url = './evaluateDetail.html?id='+v.svsId+'&ids='+id2+'&projectId='+v.id
                this.until.href(url)
            },
            //忽略
            async toIgnore(v,id2){
                if(!v.svsOn){
                    this.$message({
                        message: '当前项目未开启评审',
                        type: 'warning'
                    });
                    return
                }
                console.log('评审')
                return
                this.loading = true
                let info = await this.api.reviewInfo(v.svsId)
                let list = []
                info.items.forEach((item)=>{
                    list.push({
                        bidId:v.id,
                        bidNm:v.nm,
                        svsItemId:item.id,
                        svsItemNm:item.nm,
                        weight: item.weight,
                        fullScore: item.fullScore,
                        score:0,
                        weightedScore: 0,
                        tips: item.tips,
                        norm: item.norm,
                        seq: item.seq
                    })
                })
                let param = {
                    bidId:v.id,
                    bidNm:v.nm,
                    bidOfferId:id2,
                    svsId:v.svsId,
                    resultItems:list,
                    ignore:1
                }

                await this.api.submit(param)
                this.loading = false
                this.$message({
                    message: '操作成功！',
                    type: 'success'
                });
                this.getList()
            },
            //项目详情
            toDetail(id){
                this.until.href('./projectDetail.html?id'+id)
            },
            //页面跳转
            toPage(url){
                this.until.href(url)
            },
            async getList(){
                let qry = this.query.new()
                this.query.toW(qry,'nm',this.search.nm,'LK')
                this.query.toW(qry,'mob',this.search.tel,'LK')
                if(this.search.time && this.search.time.length>0){
                    let timeS = this.until.formatDate(this.search.time[0])
                    let timeE = this.until.formatDate(this.search.time[1])
                    this.query.toW(qry,'publishTm',timeS.year+'-'+timeS.month+'-'+timeS.day+','+timeE.year+'-'+timeE.month+'-'+timeE.day,'BT')
                }
                this.query.toO(qry,'publishTm','desc')
                this.query.toP(qry,this.pageNo,this.pageSize)
                let data = await this.api.list(this.query.toEncode(qry))
                this.list = data.data.list
                this.list.forEach(item=>{
                    item.publishTm = item.publishTm ? item.publishTm.split(' ')[0] : ''
                })
                this.total = data.page.total
            },
            toSearch(){
                console.log(this.search.time)
                this.pageNo = 1
                this.getList()
            },
            handleCurrentChange(val){
                this.pageNo = val
                this.getList()
            }
        }
    }
</script>
<style lang="less">
    #home{
        .tableHeader{
            background: @themeColor;
            color: #ffffff;
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
        background-color: #FFFFFF;
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
                height: 105px;
                >div{
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
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
