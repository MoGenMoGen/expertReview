<template>
  <!-- 在线开标页面 -->
  <div id="home" :style="{ width: bWidth + 'px' }" v-loading="loading">
    <my-header :width="width" :bWidth="bWidth"></my-header>
    <div class="container" :style="{ width: bWidth + 'px' }">
      <leftMenu tabIndex="3-4"></leftMenu>
      <div class="rightMenu" :style="{ width: bWidth - 200 + 'px' }">
        <div class="search_box">
          <!-- <div> -->
          <!-- <div class="search_item"> -->
          <el-input placeholder="项目编号" v-model="input" clearable>
          </el-input>
          <el-input placeholder="项目名称" v-model="input" clearable>
          </el-input>
          <el-input placeholder="采购单位" v-model="input" clearable>
          </el-input>
          <!-- </div> -->
          <!-- <div class="search_item"> -->
          <el-input placeholder="专家" v-model="input" clearable> </el-input>
          <el-select v-model="value" clearable placeholder="采购方式">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select v-model="value" clearable placeholder="项目状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- </div> -->
          <!-- </div> -->
          <button class="btn_query">查询</button>
          <button class="btn_evaluation">在线评标</button>
        </div>
        <div class="son_tablist">
          <div class="left">
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
          </div>
        </div>
        <div class="tablist">
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
                  @click="item1.isshow = !item1.isshow"
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
                {{ item1.st }}
              </div>

              <div class="td">查看</div>
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
                <div class="td">{{ item1.unit }}</div>
                <div class="td">{{ item1.type }}</div>
                <div class="td">{{ item1.amount }}</div>
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
                    style="
                      width: 73px;
                      height: 27px;
                      border: 1px solid #2778be;
                      line-height: 27px;
                      text-align: center;
                      color: #2778be;
                    "
                  >
                    {{ item1.status }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myFooter from "@/components/footer";
import myHeader from "@/components/myHeader";
import leftMenu from "@/components/leftMenu";
import signin from "@/components/onlineBidEvaluate/signin";
import decrypt from "@/components/onlineBidEvaluate/decrypt";
import reviewResults from "@/components/onlineBidEvaluate/reviewResults";
import uploadVideo from "@/components/onlineBidEvaluate/uploadVideo";
export default {
  data() {
    return {
      loading: false,
      bWidth: 0,
      width: 0,
      list: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      input: "",
      value: "",
      options: [
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      sonTabList: ["全部", "待办理"],
      sonTabIndex: 0,
      titleList1: ["", "序号", "项目编号", "项目名称", "投标开始时间", "操作"],
      titleList2: [
        "采购单位",
        "采购方式",
        "预算金额（万元）",
        "投标标项",
        "状态",
      ],
      rowList: [
        {
          isshow: false,
          cd: "BHZC2021-G3-0001",
          nm: "12米玻璃钢新型渔船",
          st: "2021-07-22   14:00:00",
          unit: "捷胜海洋科技有限公司",
          type: "竞争性磋商",
          amount: "46",
          bidItem: "竞争性磋商",
          status: "00:01:12",
        },
        {
          isshow: false,
          cd: "BHZC2021-G3-0001",
          nm: "12米玻璃钢新型渔船",
          st: "2021-07-22   14:00:00",
          unit: "捷胜海洋科技有限公司",
          type: "竞争性磋商",
          amount: "46",
          bidItem: "竞争性磋商",
          status: "00:01:12",
        },
      ],
    };
  },
  computed: {},
  components: {
    myFooter,
    myHeader,
    leftMenu,
    signin,
    decrypt,
    reviewResults,
    uploadVideo,
  },
  async mounted() {
    // if(!this.until.seGet('userInfo')){
    //     this.until.href('./login.html')
    // }
    console.log(this.navList);
    this.getWidth();
    // this.getList()
    // this.userInfo = JSON.parse(this.until.seGet('userInfo'))
    window.onresize = () => {
      this.getWidth();
    };
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
  height: calc(~"100vh - 298px");
  display: flex;
  .rightMenu {
    box-sizing: border-box;
    background: #fff;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
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
  }
}
.gray {
  color: #999999;
}
</style>
