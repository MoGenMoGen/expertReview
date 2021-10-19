<template>
  <!-- 在线评标页面 -->
  <div id="home" :style="{ width: bWidth + 'px' }" v-loading="loading">
    <my-header :width="width" :bWidth="bWidth"></my-header>
    <div class="container" :style="{ width: bWidth + 'px' }">
      <leftMenu tabIndex="4"></leftMenu>
      <div class="rightMenu" :style="{ width: bWidth - 200 + 'px' }">
        <topNav :activeName="activeName" :list="thisNavList"></topNav>
        <div class="right_content">
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
            <div class="right">评标标准时间 ：2021-07-10 08:01:09</div>
          </div>
          <!-- 组件表 -->
          <div style="margin-top: 20px">
            <signin v-if="sonTabIndex == 0"></signin>
            <decrypt v-if="sonTabIndex == 1"></decrypt>
            <reviewResults v-if="sonTabIndex == 2"></reviewResults>
            <uploadVideo v-if="sonTabIndex == 3"></uploadVideo>
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
import topNav from "@/components/topNav";

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
      sonTabList: ["签到", "解密", "评审结果", "评标视频上传"],
      sonTabIndex: 0,
      thisNavList: [],
      activeName: "",
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
    topNav
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
      name: "在线评标",
      url: "./onlineBidEvaluate.html",
      canClose: true,
    };
    let data = this.until.checkNav(
      obj,
      JSON.parse(this.until.seGet("navList"))
    );
    this.activeName = obj.name;
    this.thisNavList = data;
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
          width: 60px;
          height: 40px;
          background: #2778be;
          border-radius: 15px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          text-align: center;
          line-height: 40px;
          border: none;
          // margin-top: 20px;
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
    }
  }
}
.gray {
  color: #999999;
}
</style>
