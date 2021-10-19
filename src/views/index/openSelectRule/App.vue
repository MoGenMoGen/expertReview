<template>
  <!--开标-专家选取规则 页面 -->
  <div id="home" :style="{ width: bWidth + 'px' }" v-loading="loading">
    <my-header :width="width" :bWidth="bWidth"></my-header>
    <div class="container" :style="{ width: bWidth + 'px' }">
      <leftMenu tabIndex="3-1"></leftMenu>
      <div class="rightMenu" :style="{ width: bWidth - 200 + 'px' }">
        <topNav :activeName="activeName" :list="thisNavList"></topNav>
        <div class="right_content">
          <!-- 新增选取规则 -->
          <new-select-rule
            :id="id"
            :type="type"
            @handleNewSelectRule="getList"
            v-if="showNewRule"
          ></new-select-rule>
          <!-- 选取规则详情 -->
          <selectRuleDetail
            :bWidth="bWidth"
            v-show="showRuleDetail"
          ></selectRuleDetail>

          <div class="condition_box">
            <el-input
              placeholder="专家选取规则名称"
              class="margin_right"
              v-model="input"
              clearable
            >
            </el-input>
            <button
              class="btn margin_right"
              @click="Search"
              style="border: 1px solid #e0e0e0"
            >
              查询
            </button>
            <button
              class="btn margin_right"
              style="background: #409eff; color: #fff; border: none"
              @click="newSelectRule"
            >
              新增
            </button>
            <button
              class="btn margin_right"
              style="background: #fab6b6; color: #fff; border: none"
            >
              删除
            </button>
            <button class="btn margin_right" style="border: 1px solid #e0e0e0">
              导出
            </button>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%"
            border
            :cell-style="{
              'text-align': 'center',
              color: '#333',
              'font-weight': '500',
            }"
            :header-cell-style="{
              color: '#606060',
              'text-align': 'center',
            }"
          >
            <el-table-column type="selection" min-width="48"> </el-table-column>
            <el-table-column
              label="专家选取规则名称"
              prop="nm"
              sortable
              min-width="240"
            >
            </el-table-column>
            <el-table-column prop="rmks" label="备注" sortable min-width="240">
            </el-table-column>
            <el-table-column label="管理规则项" sortable min-width="144">
              <template>
                <div
                  @click="showRuleDetail = true"
                  style="
                    margin: 0 auto;
                    background: #409eff;
                    color: #fff;
                    border: none;
                    width: 120px;
                    height: 36px;
                    line-height: 36px;
                    cursor: pointer;
                  "
                >
                  管理规则项
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="seq"
              label="排序权重"
              sortable
              min-width="144"
            >
            </el-table-column>
            <el-table-column label="操作" min-width="96">
              <template slot-scope="scope">
                <i
                  @click="EditSelectRule(scope.row.id)"
                  class="el-icon-edit"
                  style="color: #409eff; margin-right: 10px; cursor: pointer"
                ></i>
                <i
                  class="el-icon-delete"
                  style="color: #409eff; cursor: pointer"
                ></i>
              </template>
            </el-table-column>
          </el-table>
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
import myFooter from "@/components/footer";
import myHeader from "@/components/myHeader";
import leftMenu from "@/components/leftMenu";
import signin from "@/components/onlineBidEvaluate/signin";
import decrypt from "@/components/onlineBidEvaluate/decrypt";
import reviewResults from "@/components/onlineBidEvaluate/reviewResults";
import uploadVideo from "@/components/onlineBidEvaluate/uploadVideo";
import newSelectRule from "../../../components/openBid/newSelectRule.vue";
import selectRuleDetail from "../../../components/openBid/selectRuleDetail.vue";
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
      showNewRule: false,
      showRuleDetail: false,
      tableData: [],
      thisNavList: [],
      activeName: "",
      id: "",
      type: 0,
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
    newSelectRule,
    selectRuleDetail,
    topNav,
  },
  async mounted() {
    this.getWidth();
    // this.userInfo = JSON.parse(this.until.seGet('userInfo'))
    window.onresize = () => {
      this.getWidth();
    };

    let obj = {
      name: "专家选取规则",
      url: "./openSelectRule.html",
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
    //页面跳转
    toPage(url) {
      this.until.href(url);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getList();
    },
    async getList() {
      let query = {
        r: [{ n: "a1", t: "and", w: [{ k: "nm", v: "", m: "LK" }] }],
        o: [{ k: "crtTm", t: "desc" }],
        p: { n: 1, s: 20 },
      };
      query.p.n = this.pageNo;
      query.p.s = this.pageSize;
      query.r[0].w[0].v = this.input;

      // 选取列表
      let data = await this.api.selectRuleList(
        encodeURIComponent(JSON.stringify(query))
      );
      this.tableData = data.data.list;
      this.total = data.page.total;
    },
    Search() {
      this.getList();
    },
    // 新增
    newSelectRule() {
      this.showNewRule = true;
      this.type = 1;
    },
    // 修改
    EditSelectRule(id) {
      this.showNewRule = true;
      this.id = id.toString();
      this.type = 2;
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

  .container {
    padding-top: 20px;
    padding-bottom: 100px;
    background: url(../../../assets/img/footer.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom center;
    margin: 0 auto;
    // height: calc(~"100vh - 298px");
    // height: 740px;
    margin-top: 10px;
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
        .condition_box {
          background: #fff;

          height: 40px;
          display: flex;
          align-items: center;
          margin-bottom: 40px;
          .el-input {
            width: 202px;
          }
          .btn {
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            border-radius: 5px;
            cursor: pointer;
          }
          .margin_right {
            margin-right: 15px;
          }
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
}
</style>
