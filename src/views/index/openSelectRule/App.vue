<template>
  <!--开标-专家选取规则 页面 -->
  <div id="home" :style="{ width: bWidth + 'px' }" v-loading="loading">
    <my-header :width="width" :bWidth="bWidth"></my-header>
    <div class="container" :style="{ width: bWidth + 'px' }">
      <leftMenu tabIndex="3-1"></leftMenu>
      <div class="rightMenu">
        <topNav :activeName="activeName" :list="thisNavList"></topNav>
        <div class="right_content" v-if="auth1">
          <!-- 新增选取规则 -->
          <new-select-rule
            :id="id"
            :type="type"
            @handleNewSelectRule="getList"
            v-if="showNewRule"
          ></new-select-rule>
          <!-- 选取规则详情 -->
          <selectRuleDetail
            :id="id"
            :bWidth="bWidth"
            v-if="showRuleDetail"
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
              style="border: 1px solid #e0e0e0; cursor: pointer"
            >
              查询
            </button>
            <button
              class="btn margin_right"
              style="
                background: #409eff;
                color: #fff;
                border: none;
                cursor: pointer;
              "
              @click="newSelectRule"
			  v-if="auth2"
            >
              新增
            </button>
            <el-button
              :disabled="!isDel"
              class="btn margin_right"
              :style="{
                background: isDel ? 'red' : '#fab6b6',
                color: '#fff',
                border: 'none',
              }"
              @click="DelSelectRule(ids)"
			  v-if="auth4"
            >
              删除
            </el-button>
            <!-- <button
              @click="exptExcel"
              class="btn margin_right"
              style="border: 1px solid #e0e0e0"
            >
              导出
            </button> -->
          </div>
          <div class="table_box">
            <el-table
              max-height="524"
              :data="tableData"
              @selection-change="handleSelectionChange"
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
              <el-table-column type="selection" min-width="48">
              </el-table-column>
              <el-table-column
                label="专家选取规则名称"
                prop="nm"
                sortable
                min-width="240"
              >
              </el-table-column>
              <el-table-column
                prop="rmks"
                label="备注"
                sortable
                min-width="240"
              >
              </el-table-column>
              <el-table-column label="管理规则项" sortable min-width="144">
                <template slot-scope="scope">
                  <div
                    @click="toDetail(scope.row.id)"
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
					v-if="auth3"
                  ></i>
                  <i
                    @click="DelSelectRule(scope.row.id)"
                    class="el-icon-delete"
                    style="color: #409eff; cursor: pointer"
					v-if="auth4"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </div>

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
		auth1:'',//查看权限
		auth2:'',//新增权限
		auth3:'',//修改权限
		auth4:'',//删除权限
      loading: false,
      isDel: false,
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
      ids: "",
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
	  this.auth1= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidRule:page')>-1)
	  this.auth2= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidRule:add')>-1)
	  this.auth3= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidRule:upd')>-1)
	  this.auth4= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidRule:del')>-1)
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
      // console.log(`当前页: ${val}`);
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
    // 进入详情
    toDetail(id) {
      this.showRuleDetail = true;
      this.id = id.toString();
    },
    // 删除
    DelSelectRule(ids) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return this.api.delSelectRule({ ids });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        })
        .then((res) => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          } else {
            this.$message({
              type: "error",
              message: "删除失败!",
            });
          }
        });
    },
    // 多选框选中项变化
    handleSelectionChange(val) {
      if (val.length != 0) {
        this.isDel = true;
      } else {
        this.isDel = false;
      }
      let ids = val.map((item) => item.id);
      this.ids = ids.join(",");
    },
    async exptExcel() {
      let data = await this.api.exportExcel();
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
            // cursor: pointer;
          }
          .margin_right {
            margin-right: 15px;
          }
        }
        .table_box::-webkit-scrollbar {
          display: none; /* Chrome Safari */
        }
        .table_box {
          width: 100%;
          // max-height: 524px;
          // overflow-y: auto;
          // overflow-x: hidden;
          scrollbar-width: none; /* firefox */
          -ms-overflow-style: none; /* IE 10+ */
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
