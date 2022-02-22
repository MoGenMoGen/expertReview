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
                <p class="pos"><span style="color: #999999;cursor: pointer;" @click="toPage('./index.html')">首页 > </span><span>项目议标评定表</span></p>
                <h3>{{nm}}</h3>
                <div class="intro">
                    <p>评分人1：{{name}}</p>
                    <p v-if="ifSubmit">招标采购商：{{reviewInfo.orgNm}}</p>
                    <p class="score">合计总分：<span class="red">{{score}}分</span></p>
                </div>
                <table>
                    <thead>
                    <tr>
                        <td>评定指标</td>
                        <td v-for="(item,index) in tableList" :key="'1'+index">{{item.nm || item.svsItemNm}}</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>评定权重</td>
                        <td v-for="(item,index) in tableList" :key="'2'+index">{{item.weight}}%</td>
                    </tr>
                    <tr>
                        <td>本项满分得分</td>
                        <td v-for="(item,index) in tableList" :key="index+'3'">{{item.fullScore}}</td>
                    </tr>
                    <tr>
                        <td valign="middle">小组成员评分</td>
                        <td v-for="(item,index) in tableList" :key="index+'4'" v-if="ifSubmit">
                            <el-input
                                    @change="checkScore(item,index)"
                                    suffix-icon="el-icon-edit"
                                    v-model="item.score">
                            </el-input></td>
                        <td v-for="(item,index) in tableList" :key="index+'5'"  v-if="!ifSubmit">{{item.score}}</td>
                    </tr>
                    <tr>
                        <td>加权得分</td>
                        <td v-for="(item,index) in tableList" :key="index+'6'" v-if="ifSubmit">
                            <el-input
                                :disabled="true"
                                suffix-icon="el-icon-edit"
                                v-model="item.weightedScore">
                        </el-input></td>
                        <td v-for="(item,index) in tableList" :key="index+'7'" v-if="!ifSubmit">{{item.weightedScore.toFixed(2)}}</td>
                    </tr>
                    <tr>
                        <td>评分说明</td>
                        <td v-for="(item,index) in tableList" :key="index+'8'">{{item.tips}}</td>
                    </tr>
                    <tr>
                        <td>评分标准</td>
                        <td v-for="(item,index) in tableList" :key="index+'9'">{{item.norm}}</td>
                    </tr>
                    </tbody>
                </table>
				<div class="pageChange">
					<div class="totalPage">
						总页数:{{(total/6+1).toFixed(0)}}
					</div>
					<div class="lastPage" @click="LastPage">
						上一页
					</div>
					<div class="nowpage">
						{{pageIndex>=6?pageIndex/6+1:pageIndex+1}}
					</div>
					<div class="nextPage" @click="nextPage">
						下一页
					</div>
					
				</div>
                <div class="submit">
                    <p>说明： 1、指标权重可调</p>
                    <span @click="toPage('./index.html')">< 返回首页</span>
                    <button  v-if="ifSubmit" @click="toPage('./index.html')">取消</button>
                    <button @click="submit"  v-if="ifSubmit">确认提交</button>
                </div>
                <div class="file">
                    <h3>招标采购商：{{reviewInfo.orgNm}}</h3>
                    <div class="title"><img :src="file"/><p>附件：</p><span  @click="toDown"><img :src="down"/>全部下载</span></div>
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
                loading:false,
                ifSubmit:true,//是否提交、查看结果
                id:'',
                score:0,
                nm:'',
                name:'',
                down,
                file,
                bWidth:0,
                width:0,
                userInfo:{},
                logo:'https://sinovat.oss-cn-shanghai.aliyuncs.com/9cc91287abfa4ab7a6c5b917123a4e12_96f8a1087df345a99de5708bc15ae537_logo.png',
                tableList:[],
                info:{},
                reviewInfo:{},
                fileList:[],
				pageIndex:0,
				total:'',
            }
        },
        computed: {

        },
        components: {
            myFooter
        },
        watch:{
          tableList:{
              deep:true,
              handler:function () {
                  this.score = 0
                  this.tableList.forEach(item=>{
                      if(item.weightedScore){
                          this.score+=parseFloat(item.weightedScore)
                      }
                  })
				  this.score = this.score.toFixed(2)
              }
          }
        },
        async  mounted(){
            this.getWidth()
            if(this.until.getQueryString('id')){
                this.id = this.until.getQueryString('id')
            }
            this.ifSubmit = this.until.getQueryString('ids') ? true : false
            this.getInfo()
            this.userInfo = JSON.parse(this.until.seGet('userInfo'))
            this.name = this.userInfo.nickname
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
            },
			nextPage(){
				
				if(this.pageIndex>=(this.total-6)){
					   this.$message({
					          message: '已经是最后一页了',
					          type: 'warning'
					        });
					return
				}
				this.pageIndex+=6
				console.log(11,this.pageIndex);
				this.getInfo()
			
			},
			LastPage(){
				
			
				if(this.pageIndex<=0){
					this.$message({
					       message: '已经是第一页了',
					       type: 'warning'
					     });
						return
				}
				this.pageIndex-=6
				console.log(11,this.pageIndex);
				this.getInfo()
			},
            //提交
            async submit(){
                let index = this.tableList.findIndex(item=>item.weightedScore==null)
                if(index>-1){
                    this.$message({
                        message: '请输入所有小组成员评分',
                        type: 'warning'
                    });
                    return
                }
                // console.log('提交')
                // return
                this.loading = true
                let list = []
                this.tableList.forEach((item)=>{
                    list.push({
                        bidId:this.until.getQueryString('projectId'),
                        bidNm:this.nm,
                        svsItemId:item.id,
                        svsItemNm:item.nm,
                        weight: item.weight,
                        fullScore: item.fullScore,
                        score: item.score,
                        weightedScore: item.weightedScore,
                        tips: item.tips,
                        norm: item.norm,
                        seq: item.seq
                    })
                })
                let param = {
                    bidId:this.until.getQueryString('projectId'),
                    bidNm:this.nm,
                    bidOfferId:this.until.getQueryString('ids'),
                    svsId:this.id,
                    resultItems:list
                }
                await this.api.submit(param)
                this.loading = false
                this.$message({
                    message: '操作成功！',
                    type: 'success'
                });
                this.until.back()
            },
            //输入验证
            checkScore(item){
                item.score = item.score.replace(/(^\s*)|(\s*$)/g, "")
                if(item.score==''||(item.score && isNaN(item.score))||item.score<0 || item.score>100){
                    this.$message({
                        message: '请输入大于0小于等于100',
                        type: 'warning'
                    });
                    item.score = ''
                    item.weightedScore = null
                }else{
                    item.score = parseInt(item.score)
                    item.weightedScore = (item.score*item.weight*0.01).toFixed(2)
                }

            },
            //下载
            toDown(){
                let url = '/general/oss/aliDownload?urls='+this.reviewInfo.attachDecode+"&zipName=''"
                window.open(url)
                // this.api.downLoad(param)
            },
            async getInfo(){
                if(this.ifSubmit){
                    this.info = await this.api.reviewInfo(this.id)
					this.total=this.info.items.length
                    this.tableList = this.info.items.splice(this.pageIndex,6)
                    this.reviewInfo = await this.api.projectDetail2(this.until.getQueryString('ids'))
                    this.nm = this.reviewInfo.bidNm
                }else {
					
                    this.info = await this.api.reviewResult(this.id)
                    this.tableList = this.info.resultItems
					this.total=this.info.items.length
					this.tableList = this.info.items.splice(this.pageIndex,6)
                    this.reviewInfo = await this.api.projectDetail2(this.id)
                    this.score = this.info.score.toFixed(2)
                    this.nm = this.reviewInfo.bidNm
                }
				if(this.reviewInfo.attachDecode){
					let arr = this.reviewInfo.attachDecode.split(',')
					arr.forEach(item=>{
					    let index = item.indexOf('_')
					    let nm = item.slice(index+1)
					    this.fileList.push({
					        nm:nm,
					        url:item
					    })
					})
				}
            
            },

        }
    }
</script>
<style lang="less">
    #home {
        .el-input__inner{
            background-color: #E5F3FF;
            text-align: center;
        }
    }
</style>
<style lang="less" scoped>
    @import url("../../../assets/css/init.less");
    #home{
        background-color: #FFFFFF;
        height: 100%;

        .blue{
            color: @themeColor;
        }
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
            >h3{
                color: #333333;
                font-size: 24px;
                text-align: center;
                padding: 30px 0;
            }
            .intro{
                width: 100%;
                display: flex;
                display: -webkit-flex;
                padding-bottom: 15px;
                align-items: flex-end;
                p:first-of-type{
                    flex: 1;
                }
                .score{
                    padding-left: 20px;
                    span{
                        font-size: 22px;
                    }
                }
            }
            .pos{
                color: #999999;
                span{
                    color: @themeColor;
                }
                padding-top: 30px;
                padding-bottom: 38px;
            }
        }

    }
    table{
		width: 100%;
		overflow: scroll;
        margin-bottom: 20px;
        tr{
            max-width: 100%;
            display: flex;
            display: -webkit-flex;
			
            td{
				word-break: break-word;
                flex: 1;
                padding: 15px 8px;
                color: #666666;
            }
        }
        thead{
            td{
                background: @themeColor;
                color: #ffffff;
                text-align: center;
            }
        }

        tbody{
            td{
                border-bottom: 1px solid #E5E5E5;
                border-right: 1px solid #E5E5E5;
                &:first-of-type{
                    border-left: 1px solid #E5E5E5;
                    font-size: 16px;
                    font-weight: bold;
                }
            }
            tr:nth-of-type(-n+4){
                td:not(:first-of-type){
                    text-align: center;
                }
                td{
                    line-height: 40px;
                }
            }
            tr:nth-of-type(-n+3){
                td{
                    padding: 10px 8px;
                }
            }
        }
    }
	.pageChange{
		display: flex;
		justify-content: center;
		align-items: center;
		.lastPage{
			margin-left: 15px;
			padding: 6px 20px;
			border: 1px solid #cccccc;
			border-radius: 4px;
			cursor: pointer;
			color: #CCCCCC;
		}
		.lastPage:hover{
			border: 1px solid #2778BE;
			color: #2778BE;
		}
		.nowpage{
			margin: 0 15px;
		}
		.nextPage{
			padding: 6px 20px;
			border: 1px solid #cccccc;
			border-radius: 4px;
			cursor: pointer;
			color: #CCCCCC;
		}
		.nextPage:hover{
			border: 1px solid #2778BE;
			color: #2778BE;
		}
	}
    .submit{
        width: 100%;
        height: 60px;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        margin-bottom: 20px;
        p{
            flex: 1;
        }
        span{
            color: @themeColor;
            cursor: pointer;
        }
        button{
            width: 112px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            box-sizing: border-box;
            margin-left: 20px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            &:first-of-type{
                border: 1px solid #DFDFDF;
                color: #999999;
                background: none;
            }
            &:last-of-type{
                background: @themeColor;
                color: #fff;
            }
        }
    }
    .file{
        width: 100%;
        color: #666666;
        background: #F6F6F6;
        box-sizing: border-box;
        padding: 63px;
        h3{
            color: #333333;
            font-size: 18px;
            padding-bottom: 60px;
        }
        .title{
            width: 100%;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            display: flex;
            display: -webkit-flex;
            align-items: center;
            padding-bottom: 14px;
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

</style>
