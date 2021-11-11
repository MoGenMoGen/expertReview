<template>
  <!-- 在线评标页面 -->
  <div id="home" :style="{ width: bWidth + 'px' }" v-loading="loading">
    <my-header :width="width" :bWidth="bWidth"></my-header>
    <div class="container" :style="{ width: bWidth + 'px' }">
      <leftMenu tabIndex="4"></leftMenu>
      <div class="rightMenu" :style="{ width: bWidth - 200 + 'px' }">
        <topNav :activeName="activeName" :list="thisNavList"></topNav>
        <div class="right_content">
          <signInQuery  v-if="sonTabIndex == 0&&auth1"></signInQuery>
          <!-- <reviewResultQuery v-else-if="sonTabIndex==2"></reviewResultQuery> -->
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
            <signin  v-if="sonTabIndex == 0"></signin>
            <!-- <decrypt v-if="sonTabIndex == 1"></decrypt>
            <reviewResults v-if="sonTabIndex == 2"></reviewResults>
            <uploadVideo v-if="sonTabIndex == 3"></uploadVideo> -->
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
	  auth1:'',//查询权限
      loading: false,
      bWidth: 0,
      width: 0,
      list: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      sonTabList: ["签到"],
      // , "解密", "评审结果", "评标视频上传"],
      sonTabIndex: 0,
      thisNavList: [],
      activeName: "",
      SearchInfo: {
        cd: "", //编号
        nm: "", //项目名称
        purchasingUnit: "", //采购单位
        expertIds: "", //专家id
        expertNm: "", //专家
        procurementMethodCd: "", //采购方式
        procurementMethodNm: "", //采购方式
      },
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
  async mounted() {
    // if(!this.until.seGet('userInfo')){
    //     this.until.href('./login.html')
    // }
	this.auth1= JSON.parse(this.until.seGet('authZ').indexOf('ship:bid:evaluation')>-1)
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
    async getList(SearchInfo) {
      console.log('主页面',SearchInfo);
      this.SearchInfo = SearchInfo;
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
