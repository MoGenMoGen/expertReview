<template>
  <!--开标-专家库 页面 -->
  <div id="home" :style="{ width: bWidth + 'px' }" v-loading="loading">
    <my-header :width="width" :bWidth="bWidth"></my-header>
    <div class="container" :style="{ width: bWidth + 'px' }">
      <leftMenu tabIndex="3-2"></leftMenu>
      <div class="rightMenu" :style="{ width: bWidth - 200 + 'px' }">
        <topNav :activeName="activeName" :list="thisNavList"></topNav>
        <div class="right_content" v-if="auth1">
          <new-expert-database
            @saveAndUpdate="getList"
            :type="type"
            :id="id"
            v-if="showNewExpertDatabase"
          ></new-expert-database>
          <div class="condition_box">
            <el-select
              v-model="info.groupCd"
              class="margin_right"
              clearable
              placeholder="专家分组"
            >
              <el-option
                v-for="item in expertGroups"
                :key="item.value"
                :label="item.nm"
                :value="item.cd"
              >
              </el-option>
            </el-select>
            <el-input
              placeholder="专家姓名"
              class="margin_right"
              v-model="info.realNm"
              clearable
            >
            </el-input>
            <el-input
              placeholder="用户名"
              class="margin_right"
              v-model="info.username"
              clearable
            >
            </el-input>
            <el-input
              placeholder="手机号"
              class="margin_right"
              v-model="info.mob"
              clearable
            >
            </el-input>
            <el-button
              class="btn margin_right"
              @click="Search"
              style="border: 1px solid #e0e0e0; cursor: pointer"
            >
              查询
            </el-button>
            <el-button
              class="btn margin_right"
              style="
                background: #409eff;
                color: #fff;
                border: none;
                cursor: pointer;
              "
              @click="newExpertBase" v-if="auth2"
            >
              新增
            </el-button>
            <el-button
              :disabled="!isDel"
              class="btn margin_right"
              :style="{
                background: isDel ? 'red' : '#fab6b6',
                color: '#fff',
                border: 'none',
              }"
              @click="DelSelectRule(ids)" v-if="auth4"
            >
              删除
            </el-button>
          </div>
          <!-- <div class="btn_box">
            <button
              class="btn margin_right"
              style="background: #409eff; color: #fff; border: none"
              @click="showNewExpertDatabase = true"
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
          </div> -->

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
              <el-table-column type="selection" min-width="60">
              </el-table-column>
              <el-table-column
                label="专家分组"
                prop="groupNm"
                sortable
                min-width="90"
              >
              </el-table-column>
              <el-table-column
                prop="realNm"
                label="专家姓名"
                sortable
                min-width="90"
              >
              </el-table-column>
              <el-table-column
                prop="mob"
                label="手机号码"
                sortable
                min-width="90"
              >
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                sortable
                min-width="144"
              >
              </el-table-column>
              <el-table-column
                prop="username"
                label="用户名"
                sortable
                min-width="90"
              >
              </el-table-column>
              <el-table-column label="头像" min-width="90">
                <template slot-scope="scope">
                  <div v-if="!scope.row.imgUrl"></div>
                  <img
                    v-else
                    v-viewer
                    :src="scope.row.imgUrl"
                    style="
                      cursor: pointer;
                      width: 63px;
                      height: 80px;
                      margin: 0 auto;
                    "
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="job"
                label="职位/称呼"
                sortable
                min-width="90"
              >
              </el-table-column>
              <el-table-column
                prop="company"
                label="公司"
                sortable
                min-width="90"
              >
              </el-table-column>
              <el-table-column
                prop="company"
                label="状态"
                sortable
                min-width="90"
              >
                <template slot-scope="scope">
                  <div
                    style="
                      margin: 0 auto;
                      background: #f0f9eb;
                      color: #91c35b;
                      border: none;
                      width: 50px;
                      height: 30px;
                      line-height: 30px;
                    "
                    v-show="scope.row.status == 1"
                  >
                    启用
                  </div>
                  <div
                    style="
                      margin: 0 auto;
                      background: pink;
                      color: red;
                      border: none;
                      width: 50px;
                      height: 30px;
                      line-height: 30px;
                    "
                    v-show="scope.row.status == 0"
                  >
                    禁用
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="90">
                <template slot-scope="scope">
                  <i
                    class="el-icon-edit"
                    style="color: #409eff; margin-right: 10px; cursor: pointer"
                    @click="EditExpertBase(scope.row.id)"
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
import NewExpertDatabase from "@/components/openBid/newExpertDatabase.vue";
import topNav from "@/components/topNav";

export default {
  data() {
    return {
		auth1:'',//查看权限
		auth2:'',//新增权限
		auth3:'',//修改权限
		auth4:'',//删除权限
      loading: false,
      bWidth: 0,
      width: 0,
      list: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      isDel: false,
      showNewExpertDatabase: false,
      expertGroups: [],
      type: 0,
      id: "",
      info: {
        groupCd: "",
        realNm: "",
        username: "",
        mob: "",
      },
      tableData: [],
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
    NewExpertDatabase,
    topNav,
  },
  async mounted() {
	  this.auth1= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidExpert:page')>-1)
	  this.auth2= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidExpert:add')>-1)
	  this.auth3= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidExpert:upd')>-1)
	  this.auth4= JSON.parse(this.until.seGet('authZ').indexOf('ship:bidExpert:del')>-1)
    this.getWidth();
    // this.userInfo = JSON.parse(this.until.seGet('userInfo'))
    window.onresize = () => {
      this.getWidth();
    };
    let obj = {
      name: "专家库",
      url: "./openExpertDatabase.html",
      canClose: true,
    };
    let data = this.until.checkNav(
      obj,
      JSON.parse(this.until.seGet("navList"))
    );
    this.activeName = obj.name;
    this.thisNavList = data;
    // 获取专家分组列表
    this.expertGroups = await this.api.getExpertGroup();
    this.expertGroups.unshift({ cd: "", nm: "全部专家" });

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
        r: [
          {
            n: "a1",
            t: "and",
            w: [
              { k: "groupCd", v: "", m: "LK" },
              { k: "realNm", v: "", m: "LK" },
              { k: "username", v: "", m: "LK" },
              { k: "mob", v: "", m: "LK" },
            ],
          },
        ],
        o: [{ k: "crtTm", t: "desc" }],
        p: { n: 1, s: 10 },
      };
      query.p.n = this.pageNo;
      query.p.s = this.pageSize;
      query.r[0].w[0].v = this.info.groupCd;
      query.r[0].w[1].v = this.info.realNm;
      query.r[0].w[2].v = this.info.username;
      query.r[0].w[3].v = this.info.mob;

      // 选取列表
      let data = await this.api.getExpertBaseList(
        encodeURIComponent(JSON.stringify(query))
      );
      this.tableData = data.data.list;
      this.total = data.page.total;
      console.log(1111111, this.tableData);
    },
    Search() {
      this.getList();
    },
    // 删除
    DelSelectRule(ids) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return this.api.delexpert({ ids });
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
    // 新增
    newExpertBase() {
      this.showNewExpertDatabase = true;
      this.type = 1;
    },
    // 修改
    EditExpertBase(id) {
      this.showNewExpertDatabase = true;
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
    display: flex;
    .rightMenu {
      min-height: 800px;
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
        .btn {
          height: 40px;
          line-height: 40px;
          padding: 0 20px;
          border-radius: 5px;
        }

        .margin_right {
          margin-right: 15px;
        }
        .condition_box {
          height: 40px;
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          .el-input {
            width: 202px;
          }
          .el-select {
            width: 202px;
          }
        }
        .btn_box {
          margin-bottom: 20px;
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
