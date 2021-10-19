<template>
  <!-- 新增开标选取规则 -->
  <!-- :style="{ width: bWidth - 800 + 'px' }" -->

  <div id="mask" @click="closeMask">
    <div class="table_box" style="width: 1000px" @click.stop="">
      <div class="top">
        <p style="font-size: 20px; color: #636e72">详情</p>
        <img
          @click="closeMask"
          src="~assets/img/close.png"
          style="width: 25px; height: 25px"
          alt=""
        />
      </div>
      <div class="row1">专家选取规则：{{ title }}</div>
      <div class="row2">
        <!-- <button class="btn margin_right" style="border: 1px solid #e0e0e0">
          查询
        </button> -->
        <button
          class="btn margin_right"
          style="
            background: #409eff;
            color: #fff;
            border: none;
            cursor: pointer;
          "
          @click="newMagSelectRule"
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
          @click="DelMagSelectRule(ids)"
        >
          删除
        </el-button>
        <!-- <button class="btn margin_right" style="border: 1px solid #e0e0e0">
          导出
        </button> -->
      </div>
      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 10px"
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
        <el-table-column type="selection" min-width="48"> </el-table-column>
        <el-table-column label="选取范围" prop="nm" sortable min-width="220">
        </el-table-column>
        <el-table-column prop="num" label="选取数量" sortable min-width="220">
        </el-table-column>
        <el-table-column prop="rmks" label="备注" sortable min-width="220">
        </el-table-column>
        <el-table-column prop="seq" label="排序权重" sortable min-width="110">
        </el-table-column>
        <el-table-column label="操作" min-width="96">
          <template slot-scope="scope">
            <i
              class="el-icon-edit"
              style="color: #409eff; margin-right: 10px; cursor: pointer"
              @click="EditSelectRule(scope.row.id)"
            ></i>
            <i
              @click="DelMagSelectRule(scope.row.id)"
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
      <div class="btn2">
        <el-button
          style="
            background: #fff;
            color: #333;
            border: 1px solid #dddddd;
            padding: 10px 25px;
            border-radius: 4px;
          "
          @click="closeMask"
          type="text"
          size="small"
          >取消</el-button
        >
      </div>
    </div>
    <div>
      <!-- 新增同一选取规则->管理规则 -->
      <newManageRule
        v-if="newManageRule"
        :ruleId="id"
        :editId="editId"
        :type="type"
        @handleNewMagRule="getList"
      ></newManageRule>
    </div>
  </div>
</template>

<script>
import newManageRule from "components/openBid/newManageRule.vue";
export default {
  data() {
    return {
      // 默认为0，编辑为2
      type: 0,
      editId:"",
      title: "",
      num: 1,
      value: "",
      textarea: "",
      pageNo: 1,
      pageSize: 20,
      total: 0,
      ids: "",
      isDel: false,
      newManageRule: false,
      tableData: [
      ],
    };
  },
  props: {
    bWidth: {
      type: Number,
      default: 0,
    },
    id: { default: "", type: String },
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    closeMask() {
      this.$parent.showRuleDetail = false;
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
            w: [{ k: "ruleId", v: "", m: "LK" }],
          },
        ],
        o: [{ k: "crtTm", t: "desc" }],
        p: { n: 1, s: 20 },
      };
      query.p.n = this.pageNo;
      query.p.s = this.pageSize;
      query.r[0].w[0].v = this.id;
      // 选取列表
      let data = await this.api.selectRuleMagList(
        encodeURIComponent(JSON.stringify(query))
      );
      this.tableData = data.data.list;
      this.total = data.page.total;
    },
    // 删除管理规则项
    DelMagSelectRule(ids) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return this.api.delMagSelectRule({ ids });
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
    // 修改
    EditSelectRule(id) {
      console.log('修改id',id);
      this.newManageRule = true;
      this.editId = id.toString();
      this.type = 2;
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
    // 新增管理规则
    newMagSelectRule() {
      this.newManageRule = true;
      this.type = 1;
    },
   
  },
  components: {
    newManageRule,
  },
  async mounted() {
    let { bWidth, width } = this.until.getWidth();
    //   this.bWidth = bWidth;
    this.width = width;
    // console.log("详情id", this.id);
    let data = await this.api.SelectRuleDetail(this.id);
    this.title = data.nm;
    this.getList();
  },
};
</script>

<style lang="less" scoped>
#mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;

  .table_box {
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 80vh;
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
    .top {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .row1 {
      font-size: 15px;
      margin-left: 30px;
      margin-bottom: 30px;
      color: #7f8c8d;
    }
    .row2 {
      height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
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
    .btn2 {
      float: right;
    }
  }
  // #son_mask {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100vw;
  //   height: 100vh;
  //   background: rgba(0, 0, 0, 0.5);
  //   z-index: 60;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }
}
</style>