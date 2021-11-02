<template>
  <!-- 在线开标页面 -->
  <div id="home" :style="{ width: bWidth + 'px' }" v-loading="loading">
    <my-header :width="width" :bWidth="bWidth"></my-header>
    <div class="container" :style="{ width: bWidth + 'px' }">
      <leftMenu tabIndex="3-4"></leftMenu>
      <div class="rightMenu" :style="{ width: bWidth - 200 + 'px' }">
        <topNav :activeName="activeName" :list="thisNavList"></topNav>
        <div class="right_content">
          <onlineBidDetail v-if="showDetail" :id="id"> </onlineBidDetail>
          <div class="search_box">
            <!-- <div> -->
            <!-- <div class="search_item"> -->
            <el-input placeholder="项目编号" v-model="SearchInfo.cd" clearable>
            </el-input>
            <el-input placeholder="项目名称" v-model="SearchInfo.nm" clearable>
            </el-input>
            <el-input
              placeholder="采购单位"
              v-model="SearchInfo.purchasingUnit"
              clearable
            >
            </el-input>
            <!-- </div> -->
            <!-- <div class="search_item"> -->
            <el-input
              placeholder="专家"
              v-model="SearchInfo.expertNm"
              clearable
            >
            </el-input>
            <el-select
              v-model="SearchInfo.procurementMethodCd"
              clearable
              placeholder="采购方式"
            >
              <el-option
                v-for="(item, index) in procurementMethodList"
                :key="index"
                :label="item.nm"
                :value="item.cd"
              >
              </el-option>
            </el-select>
            <!-- <el-select v-model="statusValue" clearable placeholder="项目状态">
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
            <!-- </div> -->
            <!-- </div> -->
            <button class="btn_query" @click="Search">查询</button>
            <button
              class="btn_evaluation"
              @click="toPage('./onlineBidEvaluate.html')"
            >
              在线评标
            </button>
          </div>
          <div class="son_tablist">
            <!-- <div class="left">
              <div
                class="son_tab_title projectNm"
                v-for="(item, index) in sonTabList"
                :key="index"
                @click="sonTabIndex = index"
                :style="{
                  background: sonTabIndex == index ? '#2778be' : '',
                  color: sonTabIndex == index ? '#fff' : '#666666',
                }"
              >
                {{ item }}
              </div>
            </div> -->
          </div>
		  <el-table
		  max-height="524"
		    :data="tableData"
		    style="width: 100%"
		    :cell-style="{
		      'text-align': 'center',
		      color: '#333',
		      'font-weight': '500',
		    }"
		    :header-cell-style="{
		      color: '#606060',
		      background: '#f8f8f8',
		      'text-align': 'center',
		    }"
		  >
		    <el-table-column type="index" label="序号" min-width="62">
		    </el-table-column>
		    <el-table-column prop="cd" label="项目编号" min-width="146">
		    </el-table-column>
		    <el-table-column prop="nm" label="项目名称" min-width="146">
		    </el-table-column>
		    <el-table-column label="开标时间" prop="bidOpenTm" min-width="146">
		    </el-table-column>
		    <el-table-column label="采购方式" prop="procurementMethodNm" min-width="146">
		    </el-table-column>
			<el-table-column label="预算金额" prop="budget" min-width="146">
			</el-table-column>
			
		    <el-table-column prop="status" label="状态" min-width="146">
				<template slot-scope="scope">
				    <p
		       style="
		         width: 100px;
		         height: 27px;
		         border: 1px solid #2778be;
		         line-height: 27px;
		         text-align: center;
		         color: #2778be;
		       "
		     >
		       {{ scope.row.countDownTime }}
		     </p>	
				</template>
		 
		      
		    </el-table-column>
		    <el-table-column fixed="right" label="操作" min-width="62">
		      <template slot-scope="scope">
		        <el-button
		          style="color: #2778be"
		          @click="toDetail(scope.row.id)"
		          type="text"
		          size="small"
		          >查看</el-button
		        >
		        <!-- <el-button type="text" size="small">编辑</el-button> -->
		      </template></el-table-column
		    ></el-table>
          <!-- <div class="tablist">
            <div class="th">
              <div
                class="td"
                v-for="(title, titleIndex) in titleList1"
                :key="titleIndex"
              >
                {{ title }}
              </div>
            </div>
            <div v-for="(item1, index1) in rowList" :key="index1">
              <div class="th tr">
                <div class="td">
                  <img
                    :class="{
                      arrowTransform: item1.isshow,
                      arrowTransformReturn: !item1.isshow,
                    }"
                    src="~assets/img/arrowDownG.png"
                    style="width: 18px; height: 10px"
                    alt=""
                    @click="fold(item1)"
                  />
                </div>
                <div class="td">
                  {{ index1 + 1 }}
                </div>
                <div class="td">
                  {{ item1.cd }}
                </div>
                <div class="td">
                  {{ item1.nm }}
                </div>
                <div class="td">
                  {{ item1.bidOpenTm }}
                </div>

                <div class="td" @click="toPage('./onlineBidEvaluate.html')">查看</div>
              </div>
              <div v-show="item1.isshow">
                <div class="th other_th">
                  <div
                    class="td"
                    v-for="(title, titleIndex) in titleList2"
                    :key="titleIndex"
                  >
                    {{ title }}
                  </div>
                </div>
                <div class="th other_tr">
                  <div class="td">{{ item1.purchasingUnit }}</div>
                  <div class="td">
                    {{ item1.procurementMethodNm }}
                  </div>
                  <div class="td">{{ item1.budget }}</div>
                  <div class="td">{{ item1.bidItem }}</div>
                  <div
                    class="td"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <p
                      v-show="bidStatus(item1.bidOpenTm, item1.bidColseTm) == 0"
                      style="
                        width: 100px;
                        height: 27px;
                        border: 1px solid #2778be;
                        line-height: 27px;
                        text-align: center;
                        color: #2778be;
                      "
                    >
                      {{ item1.countDownTime }}
                    </p>
                    <p
                      v-show="bidStatus(item1.bidOpenTm, item1.bidColseTm) == 1"
                      style="
                        width: 73px;
                        height: 27px;
                        line-height: 27px;
                        text-align: center;
                        color: #01ad48;
                      "
                    >
                      · 评标中
                    </p>
                    <p
                      v-show="bidStatus(item1.bidOpenTm, item1.bidColseTm) == 2"
                      style="
                        width: 73px;
                        height: 27px;
                        line-height: 27px;
                        text-align: center;
                        color: #ccc;
                      "
                    >
                      评标结束
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- 分页 -->
          <div class="Footer">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import moment from "moment";
import myFooter from "@/components/footer";
import myHeader from "@/components/myHeader";
import leftMenu from "@/components/leftMenu";
import signin from "@/components/onlineBidEvaluate/signin";
import decrypt from "@/components/onlineBidEvaluate/decrypt";
import reviewResults from "@/components/onlineBidEvaluate/reviewResults";
import uploadVideo from "@/components/onlineBidEvaluate/uploadVideo";
import topNav from "@/components/topNav";
import onlineBidDetail from "components/openBid/onlineBidDetail";

export default {
  data() {
    return {
      loading: false,
      showDetail: false,
      id: "",
      bWidth: 0,
      width: 0,
      list: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      SearchInfo: {
        cd: "", //编号
        nm: "", //项目名称
        purchasingUnit: "", //采购单位
        expertIds: "", //专家id
        expertNm: "", //专家
        procurementMethodCd: "", //采购方式
        procurementMethodNm: "", //采购方式
      },
      // 采购方式列表
      procurementMethodList: [],
      rowList: [],
	  tableData:[]
    };
  },
  computed: {
    bidStatus() {
      return function (st, et) {
        let date = moment();
        // 未开标
        if (date < moment(st)) {
          console.log("未开标");
          return 0;
        }
        // 评标中
        else if (date >= moment(st) && date <= moment(et)) {
          console.log("评标中");
          return 1;
        }
        // 评标结束
        else {
          console.log("评标结束", typeof st);
          return 2;
        }
      };
    },
  },

  components: {
    myFooter,
    myHeader,
    leftMenu,
    signin,
    decrypt,
    reviewResults,
    uploadVideo,
    topNav,
    onlineBidDetail,
  },
  async mounted() {
    // if(!this.until.seGet('userInfo')){
    //     this.until.href('./login.html')
    // }
    this.getWidth();
    // this.userInfo = JSON.parse(this.until.seGet('userInfo'))
    window.onresize = () => {
      this.getWidth();
    };
    let obj = {
      name: "在线开标",
      url: "./openOnlineBid.html",
      canClose: true,
    };
    let data = this.until.checkNav(
      obj,
      JSON.parse(this.until.seGet("navList"))
    );
    this.activeName = obj.name;
    this.thisNavList = data;
    moment.locale("zh-cn");
    //采购方式列表
    this.api
      .getCatListByPcd({
        cd: "PROCUREMENT_METHOD",
      })
      .then((res) => {
        this.procurementMethodList = res.list;
      });
    this.getList();
  },
  methods: {
    getWidth() {
      let { bWidth, width } = this.until.getWidth();
      this.bWidth = bWidth;
      this.width = width;
    },
    toLogOut() {
      this.api.logout();
    },
    //页面跳转
    toPage(url) {
      this.until.href(url);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getList();
    },
    async getList() {
	  let qry=this.query.new()
	  this.query.toO(qry,'crtTm','desc')
	  this.query.toP(qry,this.pageNo,this.pageSize)
	  if(this.SearchInfo.cd) {
	  		  this.query.toW(qry,'cd',this.SearchInfo.cd,'LK')
	  }
	  if(this.SearchInfo.nm) {
	  	this.query.toW(qry,'nm',this.SearchInfo.nm,'LK')
	  }
	  if(this.SearchInfo.purchasingUnit) {
	  	this.query.toW(qry,'purchasingUnit',this.SearchInfo.purchasingUnit,'LK')
	  }
	  if(this.SearchInfo.procurementMethodCd) {
	  	this.query.toW(qry,'procurementMethodCd',this.SearchInfo.procurementMethodCd,'LK')
	  }
	  let date=new Date();
	  this.query.toW(qry,'bidEndTm',date,'lt')
	  this.query.toW(qry,'bidOpenTm',date,'gt')
	  
	  // if (this.statusValue == 1){
		 //  this.query.toW(qry,'bidOpenTm',date,'gt')
	  // } else if (this.statusValue == 2) {
		 //  this.query.toW(qry,'bidOpenTm',date,'lt')
	  // } else if (this.statusValue == 3){
		 //  this.query.toW(qry,'bidColseTm',date,'lt')
	  // }
      // 选取列表
      let data = await this.api.onlineBidList(
        this.query.toEncode(qry),
        this.SearchInfo.expertNm
      );
      this.tableData = data.data.list;
      this.tableData.forEach((item, index) => {
        // this.$set(item, "isshow", true);
        this.$set(item, "countDownTime", "");
        this.countDown(index);
      });
      this.total = data.page.total;
      console.log(1111111, data);
    },
    Search() {
      console.log("查询");
      this.getList();
    },
    toDetail(id) {
      // this.id=id.toString();
      this.id = "5192675191477248";
      this.showDetail = true;
    },
    fold(item) {
      item.isshow = !item.isshow;
    },
    //倒计时
    countDownFun(time) {
      // console.log(time)
      let startTime = new Date(); //当前时间
      let end = new Date(time); //结束时间
      // console.log(end)
      let result = parseInt((end - startTime) / 1000); //计算出豪秒
      let d = parseInt(result / (24 * 60 * 60)); //用总共的秒数除以1天的秒数
      let h = parseInt((result / (60 * 60)) % 24); //精确小时，用去余
      let m = parseInt((result / 60) % 60); //剩余分钟就是用1小时等于60分钟进行趣余
      let s = parseInt(result % 60);
      //当倒计时结束时，改变内容
      if (result <= 0) {
        return "评标中";
      }
      if (h < 10) {
        h = "0" + h;
      }
      if (s < 10) {
        s = "0" + s;
      }
      if (d == 0) {
        return `${h}:${m}:${s}`;
      } else {
        return `${d}天${h}:${m}:${s}`;
      }
      // if (h == 0 && m == 0) {
      //   return "剩余" + s + "秒";
      // } else if (h == 0) {
      //   return "剩余" + m + "分" + s + "秒";
      // } else if (d == 0) {
      //   return "剩余" + h + "时" + m + "分" + s + "秒";
      // } else {
      //   return "剩余" + d + "天" + h + "时" + m + "分" + s + "秒";
      // }
    },

    // 定时器
    // 页面多个倒计时 归零时清除
    countDown(i) {
      let that = this;
      let item = that.tableData[i];
      that.tableData[i].countDownFn = setInterval(() => {
        //  console.log(that.countDownFun(item.endTime))
        // if (that.countDownFun(item.countDownTime) == "评标中") {
        //   clearInterval(that.tableDatatableData[i].countDownFn); //清除定时器
        // } else {
          item.countDownTime = that.countDownFun(item.bidOpenTm);
          that.$set(
            that.tableData,
            item.countDownTime,
            that.countDownFun(item.bidOpenTm)
          );
        // }
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
#home {
  .tableHeader {
    background: @themeColor;
    color: #fff;
    border: 0;
    text-align: center;
  }
  .rowList {
    padding: 20px 0;
  }
}
</style>
<style lang="less" scoped>
@import url("../../../assets/css/init.less");
#home {
  background-color: #f3f3f3;
  .blue {
    color: @themeColor;
  }
  .red {
    color: @redColor;
  }
  .projectNm {
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
  // height: calc(~"100vh - 298px");
  display: flex;
  .rightMenu {
    height: 800px;
    margin-left: 10px;
    width: calc(~"100% - 210px");
    // box-sizing: border-box;
    // height: 100%;
    // padding: 20px;
    box-sizing: border-box;
    .right_content {
      margin-top: 10px;
      box-sizing: border-box;
      padding: 20px;
      height: 740px;
      background: #fff;
      .search_box {
        display: flex;
        align-items: center;
        height: 60px;
        // justify-content: center;
        // .search_item {
        //   display: flex;
        //   justify-content: space-around;
        .el-input {
          width: 202px;
          margin-right: 20px;
        }

        .el-select {
          width: 202px;

          margin-right: 20px;
          // margin-top: 20px;
        }
        // }
        .btn_query {
          margin-right: 20px;
          width: 80px;
          height: 40px;
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          font-size: 14px;
          font-weight: 400;
          color: #606060;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
        }
        .btn_evaluation {
          text-align: center;
          width: 80px;
          height: 40px;
          line-height: 40px;
          background: #2778be;
          border-radius: 5px;
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
          border: none;
          cursor: pointer;
        }
      }
      .son_tablist {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #2778be;
        .left {
          .son_tab_title {
            display: inline-block;
            width: 129px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            //   color: #fff;
          }
        }
      }
      .tablist {
        width: 100%;
        max-height: 524px;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */
        box-sizing: border-box;

        padding: 20px 0px;
        .th {
          background: #f8f8f8;
          height: 52px;
          line-height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .td {
            height: 52px;
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            color: #6f6f6f;
            width: 60px;
          }
          .td:not(:nth-child(1)):not(:nth-child(2)) {
            flex: 1;
          }
        }
        .other_th {
          .td {
            flex: 1;
          }
        }
        .other_tr {
          background: #fff;
          .td {
            flex: 1;
            border-bottom: 1px solid #e1e1e1;
            color: #000;
            // font-weight: 600;
          }
        }
        .tr {
          background: #fff;
          .td {
            border-bottom: 1px solid #e1e1e1;
            color: #000;
            // font-weight: 600;

            .arrowTransform {
              transition: 0.2s;
              transform-origin: center;
              transform: rotateZ(180deg);
            }
            .arrowTransformReturn {
              transition: 0.2s;
              transform-origin: center;
              transform: rotateZ(0deg);
            }
          }
          .td:first-child {
            cursor: pointer;
          }
          .td:last-child {
            color: #2778be;
            cursor: pointer;
          }
        }
      }
      .tablist::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      .Footer {
        display: flex;
        justify-content: center;
        margin: 44px 0 20px;
      }
    }
  }
}
.gray {
  color: #999999;
}
</style>
