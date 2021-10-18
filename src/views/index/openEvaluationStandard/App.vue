<template>
  <!--开标-项目评定标准 页面 -->
  <div id="home" :style="{ width: bWidth + 'px' }" v-loading="loading">
    <my-header :width="width" :bWidth="bWidth"></my-header>
    <div class="container" :style="{ width: bWidth + 'px' }">
      <leftMenu tabIndex="3-3"></leftMenu>
      <div class="rightMenu" :style="{ width: bWidth - 200 + 'px' }">
        <!-- 新增评定标准 -->
        <newEvaluateStandard
          v-show="showNewEvaluateStandard"
        ></newEvaluateStandard>
        <!-- 评定标准项管理 -->
        <magEvaluateStandard
          v-show="showMagEvaluateStandard"
        ></magEvaluateStandard>
        <div class="condition_box">
          <el-input
            placeholder="评估标准名称"
            class="margin_right"
            v-model="input"
            clearable
          >
          </el-input>
          <button class="btn margin_right" style="border: 1px solid #e0e0e0">
            查询
          </button>
          <button
            class="btn margin_right"
            style="background: #409eff; color: #fff; border: none"
            @click="showNewEvaluateStandard = true"
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
            label="评定标准名称"
            prop="nm"
            sortable
            min-width="240"
          >
          </el-table-column>
          <el-table-column
            label="满分分数"
            prop="fullScore"
            sortable
            min-width="240"
          >
          </el-table-column>
          <el-table-column label="评定标准项" sortable min-width="144">
            <template>
              <div
                @click="showMagEvaluateStandard = true"
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
                评定标准项
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remarks" label="备注" sortable min-width="240">
          </el-table-column>

          <el-table-column label="操作" min-width="96">
            <template>
              <i
                class="el-icon-edit"
                style="color: #409eff; margin-right: 10px; cursor: pointer"
                @click="showRuleDetail = true"
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
import newEvaluateStandard from "../../../components/openBid/newEvaluateStandard.vue";
import magEvaluateStandard from "components/openBid/magEvaluatestandard.vue";
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
      showNewEvaluateStandard: false,
      showMagEvaluateStandard: false,
      tableData: [
        {
          nm: "项目议标评定标准",
          fullScore: 100,
          remarks: "这是一个备注",
        },
        {
          nm: "项目议标评定标准",
          fullScore: 100,
          remarks: "这是一个备注",
        },
        {
          nm: "项目议标评定标准",
          fullScore: 100,
          remarks: "这是一个备注",
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
    newSelectRule,
    newEvaluateStandard,
    magEvaluateStandard,
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
    //页面跳转
    toPage(url) {
      this.until.href(url);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
    height: calc(~"100vh - 298px");
    display: flex;
    .rightMenu {
      box-sizing: border-box;
      background: #fff;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      .condition_box {
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
  .gray {
    color: #999999;
  }
}
</style>
