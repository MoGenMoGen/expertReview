<template>
    <div id="home" :style="{width:bWidth + 'px'}" v-loading="loading">
		<my-header :width="width" :bWidth="bWidth"></my-header>
		<div class="container" :style="{width:bWidth + 'px'}">
			<leftMenu tabIndex='0'></leftMenu>
			<div class="right">
				<topNav :activeName='activeName' :list="thisNavList"></topNav>
				<div class="content">
					<div class="content-top" v-if="auth1">
						<div v-for="(item,index) in menuList" :key="index" class="content-top-item" @click="toPage(item.linkUrl)">
							<img :src="item.imgUrl">
							<div style="width: 70px;">
								<p :style="{color: item.color}">{{item.num}}</p>
								<p>{{item.name}}</p>
							</div>
						</div>
					</div>
					<div class="content-list" v-if="auth2">
						<div class="content-list-top">
							<div><img :src="ing">进行中项目</div>
							<p @click="toMore">更多 ></p>
						</div>
						<div class="bodyTable">
							<el-table :data="tableData" style="width: 100%" :cell-style="{
								    'text-align': 'center',
								    color: '#333',
								    'font-weight': '500',
								  }" :header-cell-style="{
								    color: '#606060',
								    background: '#f8f8f8',
								    'text-align': 'center',
								  }">
								<!-- <el-table-column prop="region" label="项目区划" min-width="100">
								</el-table-column> -->
								<el-table-column prop="cd" label="项目编号" min-width="150">
								</el-table-column>
								<el-table-column prop="nm" label="项目名称" min-width="150">
								</el-table-column>
								<el-table-column prop="publisher" label="发布人" min-width="100">
								</el-table-column>
								<el-table-column prop="procurementMethodNm" label="采购方式" min-width="100">
								</el-table-column>
								<el-table-column prop="budget" label="预算金额(元)" min-width="100">
									<template slot-scope="scope">
										{{scope.row.budget?fmoney(scope.row.budget):''}}
									</template>
								</el-table-column>
								<el-table-column prop="bidOpenTm" label="开标时间" min-width="150">
								</el-table-column>
								<el-table-column prop="zhuangtai" label="状态" min-width="100">
									<template slot-scope="scope">评标中</template>
								</el-table-column>
								<el-table-column label="操作" min-width="50">
									<template slot-scope="scope">
										<el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
				</div>
			</div>
		</div>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import myFooter from '@/components/footer';
	import myHeader from '@/components/myHeader';
	import leftMenu from '@/components/leftMenu';
	import topNav from '@/components/topNav';
	import img1 from '@/assets/img/项目立项.png';
	import img2 from '@/assets/img/招标文件.png';
	import img3 from '@/assets/img/发标.png';
	import img4 from '@/assets/img/报名企业.png';
	import img5 from '@/assets/img/开标.png';
	import img6 from '@/assets/img/定标.png';
	import img7 from '@/assets/img/缴费管理.png';
	import img8 from '@/assets/img/已归档.png';
	import ing from '@/assets/img/进行中.png';
    export default {
        data(){
            return{
				auth1:'',
				auth2:'',
				ing,
                loading:false,
                bWidth:0,
                width:0,
                list:[],
                pageNo:1,
                pageSize:10,
                total:0,
				activeName: '首页',
				thisNavList: [],
				menuList: [{
					imgUrl: img1,
					num: 0,
					name: '项目立项',
					color: '#1D8BEB',
					linkUrl: './zhaobiao.html'
				},{
					imgUrl: img3,
					num: 0,
					name: '在线开标',
					color: '#7944F6',
					linkUrl: './openOnlineBid.html'
				},{
					imgUrl: img4,
					num: 0,
					name: '报名企业',
					color: '#07D2D8',
					linkUrl: './baomingshenhe.html'
				},{
					imgUrl: img5,
					num: 0,
					name: '在线评标',
					color: '#C832DA',
					linkUrl: './onlineBidEvaluate.html'
				},{
					imgUrl: img6,
					num: 0,
					name: '定标',
					color: '#476EEC',
					linkUrl: './dingbiao.html'
				},{
					imgUrl: img7,
					num: 0,
					name: '保证金审核',
					color: '#FF434C'
				},{
					imgUrl: img2,
					num: 0,
					name: '保证金退还',
					color: '#FF8F35'
				}
				// {
				// 	imgUrl: img8,
				// 	num: 0,
				// 	name: '已归档',
				// 	color: '#29B382'
				// },
				],
				tableData: []
            }
        },
        computed: {

        },
        components: {
			myFooter,myHeader,leftMenu,topNav
        },
        mounted(){
			let obj = {
				name: '首页',
				url: './index.html',
				canClose: false
			}
			if(this.until.seGet('navList')) {
				let data = this.until.checkNav(obj,JSON.parse(this.until.seGet('navList')))
				this.activeName = obj.name
				this.thisNavList = data
			} else {
				let list = [{
					name: '首页',
					url: './index.html',
					canClose: false
				}]
				this.until.seSave('navList',JSON.stringify(list))
				this.activeName = obj.name
				this.thisNavList = list
			}
			this.auth1 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:homePageNum')>-1) 
			this.auth2 = JSON.parse(this.until.seGet('authZ').indexOf('ship:bid2:page')>-1)
            this.getWidth()
            window.onresize = () => {
                this.getWidth()
            }
			if(this.auth2) {
				this.getData()
			}
        },
        methods:{
			fmoney(s, n) {
			    n = n > 0 && n <= 20 ? n : 2;
			    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
			    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
			    var t = "";
			    for (let i = 0; i < l.length; i++) {
			        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
			    }
			    return t.split("").reverse().join("") + "." + r;
			},
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
				if(url) {
					this.until.href(url)
				}
            },
			toMore() {
				this.toPage('./onlineBidEvaluate.html')
			},
			getData(){
				this.api.getHomePage().then(res => {
					this.menuList[0].num = res.bidOpening
					this.menuList[1].num = res.biddingDocuments
					this.menuList[2].num = res.bidIssuance
					this.menuList[3].num = res.calibration
					this.menuList[4].num = res.bid
					this.menuList[5].num = res.ProjectInitiation
					this.menuList[6].num = res.paymentManagement
				})
				let nowTime = this.until.formatTime(new Date())
				let qry=this.query.new()
				this.query.toO(qry,'crtTm','desc')
				this.query.toP(qry,1,4)
				this.query.toW(qry,'bidOpenTm',nowTime,'LT')
				this.query.toWNull(qry,'bidColseTm')
				this.query.toW(qry,'audit','2','EQ')
				// this.query.toW(qry,'status','1','EQ')
				this.api.getBidPage(this.query.toEncode(qry)).then(res=>{
					this.tableData=res.data.list
				})
			},
			handleClick(id) {
				console.log(id)
				this.toPage(`./onlineBidEvaDetail.html?id=${id}`)
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
			margin-left: 10px;
			width: calc(~"100% - 210px");
			.content {
				margin-top: 10px;
				width: 100%;
				height: 740px;
				display: flex;
				flex-direction: column;
				.content-top {
					display: flex;
					flex-wrap: wrap;
					// padding: 0 10px;
					// box-sizing: border-box;
					.content-top-item {
						cursor: pointer;
						width: calc(~"(100% - 30px)/4");
						height: 130px;
						display: flex;
						padding: 30px;
						box-sizing: border-box;
						justify-content: center;
						align-items: center;
						margin-right: 10px;
						margin-bottom: 10px;
						background-color: #fff;
						img {
							width: 70px;
							height: 70px;
							margin-right: 42px;
						}
						div {
							font-size: 14px;
							color: #909090;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							p:first-child {
								font-size: 30px;
								margin-bottom: 15px;
							}
						}
					}
					.content-top-item:nth-child(4n) {
						margin-right: 0;
					}
				}
				.content-list {
					display: flex;
					flex-direction: column;
					height: 460px;
					background-color: #FFF;
					padding: 20px;
					box-sizing: border-box;
					.content-list-top {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 20px;
						div {
							font-size: 18px;
							color: #333333;
							display: flex;
							align-items: center;
							img {
								width: 21px;
								height: 21px;
								margin-right: 10px;
							}
						}
						p {
							font-size: 14px;
							color: #909090;
							cursor: pointer;
						}
					}
					.bodyTable {
						box-sizing: border-box;
						height: 379px;
						overflow-y: auto;
						.el-table {
							width: 100%;
							background-color: #F8F8F8;
							text-align: center;
						}
					}
				}
			}
		}
	}
    .gray{
        color: #999999;
    }
</style>
