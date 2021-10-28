<template>
  <!-- 在线评标详情页面 -->
  <div id="home" :style="{ width: bWidth + 'px' }" v-loading="loading">
    <my-header :width="width" :bWidth="bWidth"></my-header>
    <div class="container" :style="{ width: bWidth + 'px' }">
      <leftMenu tabIndex="4"></leftMenu>
      <div class="rightMenu" :style="{ width: bWidth - 200 + 'px' }">
        <topNav :activeName="activeName" :list="thisNavList"></topNav>
        <div class="right_content">
          <div
            style="
              color: #2778be;
              padding: 10px;
              padding-top: 0px;
              cursor: pointer;
            "
            @click="back"
          >
            < 返回
          </div>
          <!-- <signInQuery v-if="sonTabIndex == 0"></signInQuery> -->
          <reviewResultQuery v-if="sonTabIndex == 1"></reviewResultQuery>
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
            <!-- <div class="right">评标标准时间 ：2021-07-10 08:01:09</div> -->
          </div>
          <!-- 组件表 -->
          <div style="margin-top: 20px">
            <!-- <signin v-if="sonTabIndex == 0"></signin> -->
            <decrypt :id="id" v-if="sonTabIndex == 0"></decrypt>
            <reviewResults v-else-if="sonTabIndex == 1"></reviewResults>
            <uploadVideo :id="id" v-else-if="sonTabIndex == 2"></uploadVideo>
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
import signInQuery from "@/components/evaBidQuery/signInQuery";
import reviewResultQuery from "@/components/evaBidQuery/reviewResultQuery";

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
      sonTabList: ["解密", "评审结果", "评标视频上传"],
      sonTabIndex: 0,
      thisNavList: [],
      activeName: "",
      id: "",
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
    topNav,
    signInQuery,
    reviewResultQuery,
  },
  created() {
    this.id = this.until.getQueryString("id");
    this.id=Number(this.id)
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

    // this.getList();
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
    back() {
      this.until.back();
    },
    async getList() {
      let query = {
        r: [
          {
            n: "a1",
            t: "and",
            w: [
              { k: "cd", v: "", m: "LK" },
              { k: "nm", v: "", m: "LK" },
              { k: "purchasingUnit", v: "", m: "LK" },
              { k: "procurementMethodCd", v: "", m: "LK" },
              {},
            ],
          },
        ],
        o: [{ k: "crtTm", t: "desc" }],
        p: { n: 1, s: 10 },
      };
      query.p.n = this.pageNo;
      query.p.s = this.pageSize;
      query.r[0].w[0].v = this.SearchInfo.cd;
      query.r[0].w[1].v = this.SearchInfo.nm;
      query.r[0].w[2].v = this.SearchInfo.purchasingUnit;
      query.r[0].w[3].v = this.SearchInfo.procurementMethodCd;
      // 选取列表
      let data = await this.api.onlineBidList(
        encodeURIComponent(JSON.stringify(query)),
        this.SearchInfo.expertNm
      );
      this.rowList = data.data.list;
      this.rowList.forEach((item, index) => {
        this.$set(item, "isshow", true);
        this.$set(item, "countDownTime", "");
        this.countDown(index);
      });
      this.total = data.page.total;
      console.log(1111111, data);
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
      background: #fff;

    height: 800px;
    margin-left: 10px;
    width: calc(~"100% - 210px");
    // box-sizing: border-box;
    // height: 100%;
    // padding: 20px;
    box-sizing: border-box;
    .right_content {
      // margin-top: 10px;
      box-sizing: border-box;
      padding:0px 20px;
      height: 740px;
      background: #fff;

      .son_tablist {
        margin-top: 3px;
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
